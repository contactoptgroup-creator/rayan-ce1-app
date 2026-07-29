/* =========================================================================
   Champion - Application d'apprentissage CE1 / CE2
   v3 : sauvegarde cloud (code champion) + sauvegarde locale triple
        + reprise de session + ergonomie mobile/tablette/ordinateur
   ========================================================================= */

const SCHEMA_VERSION = 3;
const PROFILE_KEY = 'rayan_champion_profile';
const PROGRESS_KEY = 'rayan_champion_progress';
const BACKUP_KEY = 'rayan_champion_progress_backup';
const LEGACY_KEYS = ['rayan_champion_progress'];
const CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // sans O/0/I/1
const SYNC_DEBOUNCE_MS = 2500;

// Dans une coque native (App Store / Play Store), la page est servie en
// capacitor:// ou file:// : les appels relatifs n'atteindraient aucun serveur.
// On pointe alors explicitement vers la production.
const API_BASE = /^https?:$/.test(location.protocol) ? '' : 'https://app-pi-nine-34.vercel.app';

const state = {
    currentView: 'home',
    currentClass: 'ce1',
    currentSubject: null,
    currentFiche: null,
    currentExerciseIndex: 0,
    currentExercises: [],
    sessionResults: [],
    difficultyFilter: 'all',
    timer: null,
    timerSeconds: 0,
    comboStreak: 0,
    answered: false,
    autoNextTimer: null,
    progress: null,
    profile: null,
    syncTimer: null,
    syncing: false,
    pendingSync: false,
    lastCloudSave: null,
    speechSynthesis: window.speechSynthesis
};

/* =========================================================================
   1. STOCKAGE LOCAL RÉSISTANT
   localStorage peut être bloqué (navigation privée iOS) ou vidé (ITP).
   On écrit donc partout : localStorage + copie de secours + IndexedDB,
   et on garde une copie en mémoire pour ne jamais planter.
   ========================================================================= */

const memoryStore = {};

function lsGet(key) {
    try {
        const value = window.localStorage.getItem(key);
        if (value !== null) return value;
    } catch (err) { /* stockage bloqué */ }
    return memoryStore[key] ?? null;
}

function lsSet(key, value) {
    memoryStore[key] = value;
    try { window.localStorage.setItem(key, value); } catch (err) { /* quota / privé */ }
}

function lsRemove(key) {
    delete memoryStore[key];
    try { window.localStorage.removeItem(key); } catch (err) { /* ignore */ }
}

// --- IndexedDB : survit mieux que localStorage sur iOS ---
let idbPromise = null;
function idb() {
    if (idbPromise) return idbPromise;
    idbPromise = new Promise(resolve => {
        try {
            const request = indexedDB.open('champion-rayan', 1);
            request.onupgradeneeded = () => {
                const db = request.result;
                if (!db.objectStoreNames.contains('kv')) db.createObjectStore('kv');
            };
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => resolve(null);
        } catch (err) { resolve(null); }
    });
    return idbPromise;
}

async function idbSet(key, value) {
    const db = await idb();
    if (!db) return;
    try {
        await new Promise((resolve, reject) => {
            const tx = db.transaction('kv', 'readwrite');
            tx.objectStore('kv').put(value, key);
            tx.oncomplete = resolve;
            tx.onerror = reject;
        });
    } catch (err) { /* ignore */ }
}

// Ne jamais rester bloqué sur une promesse qui ne se résout pas
// (IndexedDB peut ne jamais répondre en navigation privée iOS).
function withTimeout(promise, ms, fallback = null) {
    return Promise.race([
        promise.catch(() => fallback),
        new Promise(resolve => setTimeout(() => resolve(fallback), ms))
    ]);
}

async function idbGet(key) {
    const db = await idb();
    if (!db) return null;
    try {
        return await new Promise(resolve => {
            const tx = db.transaction('kv', 'readonly');
            const req = tx.objectStore('kv').get(key);
            req.onsuccess = () => resolve(req.result ?? null);
            req.onerror = () => resolve(null);
        });
    } catch (err) { return null; }
}

/* =========================================================================
   2. MODÈLE DE PROGRESSION
   ========================================================================= */

function defaultProgress(name, code) {
    return {
        schema: SCHEMA_VERSION,
        name: name || 'Champion',
        code: code || null,
        subjects: {},
        totalCompleted: 0,
        totalStars: 0,
        correctAnswers: 0,
        totalAnswers: 0,
        streak: 0,
        lastActiveDate: null,
        exercisesToday: 0,
        xp: 0,
        level: 1,
        badges: [],
        challengesCompleted: [],
        session: null,
        reviewQueue: [],   // coffre à erreurs (répétition espacée)
        stats: {},         // { [matiere]: { answered, correct } }
        reviewsDone: 0,
        settings: { sound: true, autoNext: true },
        rev: 0,
        updatedAt: new Date().toISOString()
    };
}

// Répare / complète un objet venant d'une ancienne version ou corrompu.
function normalizeProgress(raw, fallbackName, fallbackCode) {
    const base = defaultProgress(fallbackName, fallbackCode);
    if (!raw || typeof raw !== 'object') return base;

    const out = { ...base, ...raw };
    out.schema = SCHEMA_VERSION;
    out.subjects = (raw.subjects && typeof raw.subjects === 'object') ? raw.subjects : {};
    out.badges = Array.isArray(raw.badges) ? raw.badges : [];
    out.challengesCompleted = Array.isArray(raw.challengesCompleted) ? raw.challengesCompleted : [];
    out.reviewQueue = Array.isArray(raw.reviewQueue) ? raw.reviewQueue.filter(i => i && i.id) : [];
    out.stats = (raw.stats && typeof raw.stats === 'object') ? raw.stats : {};
    out.settings = { ...base.settings, ...(raw.settings || {}) };
    out.name = raw.name || fallbackName || base.name;
    out.code = raw.code || fallbackCode || null;

    ['totalCompleted', 'totalStars', 'correctAnswers', 'totalAnswers', 'streak', 'exercisesToday', 'xp', 'rev']
        .forEach(k => { out[k] = Number.isFinite(Number(raw[k])) ? Number(raw[k]) : 0; });

    out.level = calculateLevel(out.xp);
    if (!out.updatedAt) out.updatedAt = new Date().toISOString();
    return out;
}

// Fusion sans perte : on garde toujours le meilleur des deux côtés.
function mergeProgress(a, b) {
    if (!a) return b;
    if (!b) return a;

    const aTime = Date.parse(a.updatedAt || 0) || 0;
    const bTime = Date.parse(b.updatedAt || 0) || 0;
    const newer = bTime > aTime ? b : a;
    const out = { ...newer };

    ['totalCompleted', 'totalStars', 'correctAnswers', 'totalAnswers', 'streak', 'xp', 'rev']
        .forEach(k => { out[k] = Math.max(Number(a[k]) || 0, Number(b[k]) || 0); });

    out.badges = [...new Set([...(a.badges || []), ...(b.badges || [])])];
    out.challengesCompleted = [...new Set([...(a.challengesCompleted || []), ...(b.challengesCompleted || [])])];

    // Compteur du jour : on ne mélange pas deux journées différentes.
    if (a.lastActiveDate === b.lastActiveDate) {
        out.exercisesToday = Math.max(a.exercisesToday || 0, b.exercisesToday || 0);
        out.lastActiveDate = a.lastActiveDate;
    } else {
        out.exercisesToday = newer.exercisesToday || 0;
        out.lastActiveDate = newer.lastActiveDate || null;
    }

    // Fiches : meilleur score / meilleures étoiles des deux côtés.
    const subjects = {};
    const keys = new Set([...Object.keys(a.subjects || {}), ...Object.keys(b.subjects || {})]);
    keys.forEach(subjectKey => {
        const sa = (a.subjects || {})[subjectKey] || {};
        const sb = (b.subjects || {})[subjectKey] || {};
        const merged = {};
        new Set([...Object.keys(sa), ...Object.keys(sb)]).forEach(ficheId => {
            const fa = sa[ficheId] || {};
            const fb = sb[ficheId] || {};
            merged[ficheId] = {
                completed: Boolean(fa.completed || fb.completed),
                score: Math.max(Number(fa.score) || 0, Number(fb.score) || 0),
                stars: Math.max(Number(fa.stars) || 0, Number(fb.stars) || 0),
                lastAttempt: (Date.parse(fb.lastAttempt || 0) || 0) > (Date.parse(fa.lastAttempt || 0) || 0)
                    ? fb.lastAttempt : fa.lastAttempt
            };
        });
        subjects[subjectKey] = merged;
    });
    out.subjects = subjects;

    // Coffre à erreurs : union par identifiant, en gardant l'avancement le plus fort.
    const queue = new Map();
    [...(a.reviewQueue || []), ...(b.reviewQueue || [])].forEach(item => {
        if (!item || !item.id) return;
        const existing = queue.get(item.id);
        if (!existing || (item.box || 0) > (existing.box || 0)) queue.set(item.id, item);
    });
    out.reviewQueue = [...queue.values()];
    out.reviewsDone = Math.max(a.reviewsDone || 0, b.reviewsDone || 0);

    // Statistiques par matière : on garde les compteurs les plus élevés.
    const stats = {};
    new Set([...Object.keys(a.stats || {}), ...Object.keys(b.stats || {})]).forEach(key => {
        const sa = (a.stats || {})[key] || {};
        const sb = (b.stats || {})[key] || {};
        stats[key] = {
            answered: Math.max(sa.answered || 0, sb.answered || 0),
            correct: Math.max(sa.correct || 0, sb.correct || 0)
        };
    });
    out.stats = stats;

    out.session = newer.session || null;
    out.settings = { ...(a.settings || {}), ...(newer.settings || {}) };
    out.level = calculateLevel(out.xp);
    out.updatedAt = newer.updatedAt;
    return out;
}

function getProgress() {
    if (!state.progress) state.progress = defaultProgress(state.profile?.name, state.profile?.code);
    return state.progress;
}

// Écrit partout, tout de suite, puis programme la synchro cloud.
function commitProgress(options = {}) {
    const progress = getProgress();
    progress.rev = (Number(progress.rev) || 0) + 1;
    progress.updatedAt = new Date().toISOString();
    progress.level = calculateLevel(progress.xp);

    const serialized = JSON.stringify(progress);
    lsSet(PROGRESS_KEY, serialized);
    lsSet(BACKUP_KEY, serialized);
    idbSet(PROGRESS_KEY, serialized);

    if (options.immediate) flushCloudSave();
    else queueCloudSave();
}

/* =========================================================================
   3. PROFIL & CODE CHAMPION
   ========================================================================= */

function generateCode() {
    let code = '';
    const random = new Uint32Array(6);
    (window.crypto || window.msCrypto).getRandomValues(random);
    for (let i = 0; i < 6; i++) code += CODE_ALPHABET[random[i] % CODE_ALPHABET.length];
    return code;
}

function cleanCode(value) {
    return String(value || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
}

function formatCode(code) {
    const c = cleanCode(code);
    return c.length === 6 ? `${c.slice(0, 3)}-${c.slice(3)}` : c;
}

function loadProfile() {
    try {
        const raw = lsGet(PROFILE_KEY);
        if (raw) {
            const profile = JSON.parse(raw);
            if (profile && profile.code) return profile;
        }
    } catch (err) { /* ignore */ }
    return null;
}

function saveProfile(profile) {
    state.profile = profile;
    lsSet(PROFILE_KEY, JSON.stringify(profile));
    idbSet(PROFILE_KEY, JSON.stringify(profile));
}

/* =========================================================================
   4. SYNCHRONISATION CLOUD
   ========================================================================= */

function setSyncStatus(status, text) {
    const dot = document.getElementById('sync-dot');
    const label = document.getElementById('sync-text');
    if (!dot || !label) return;
    dot.className = `sync-dot ${status}`;
    label.textContent = text;
}

async function cloudLoad(code) {
    const response = await fetch(`${API_BASE}/api/progress?code=${encodeURIComponent(cleanCode(code))}`, {
        method: 'GET',
        cache: 'no-store'
    });
    if (!response.ok) throw new Error(`GET ${response.status}`);
    const data = await response.json();
    if (!data.ok) throw new Error(data.error || 'erreur');
    return data.found ? data.progress : null;
}

function queueCloudSave() {
    clearTimeout(state.syncTimer);
    setSyncStatus('pending', 'Sauvegarde…');
    state.syncTimer = setTimeout(flushCloudSave, SYNC_DEBOUNCE_MS);
}

async function flushCloudSave() {
    clearTimeout(state.syncTimer);
    if (!state.profile?.code) return;
    if (state.syncing) { state.pendingSync = true; return; }

    state.syncing = true;
    setSyncStatus('pending', 'Sauvegarde…');

    try {
        const response = await fetch(`${API_BASE}/api/progress?code=${encodeURIComponent(state.profile.code)}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(getProgress())
        });
        if (!response.ok) throw new Error(`POST ${response.status}`);
        state.lastCloudSave = new Date();
        setSyncStatus('ok', 'Sauvegardé');
        updateSyncDetail();
    } catch (err) {
        console.warn('Synchronisation impossible', err);
        setSyncStatus('offline', 'Hors ligne');
    } finally {
        state.syncing = false;
        if (state.pendingSync) {
            state.pendingSync = false;
            queueCloudSave();
        }
    }
}

// Dernière chance quand l'onglet se ferme : sendBeacon part même en fermeture.
function beaconSave() {
    if (!state.profile?.code) return;
    try {
        const blob = new Blob([JSON.stringify(getProgress())], { type: 'application/json' });
        navigator.sendBeacon(`${API_BASE}/api/progress?code=${encodeURIComponent(state.profile.code)}`, blob);
    } catch (err) { /* ignore */ }
}

function updateSyncDetail() {
    const el = document.getElementById('sync-detail');
    if (!el) return;
    el.textContent = state.lastCloudSave
        ? `Dernière sauvegarde en ligne : aujourd'hui à ${state.lastCloudSave.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`
        : 'Dernière sauvegarde en ligne : en attente…';
}

/* =========================================================================
   5. DÉMARRAGE
   ========================================================================= */

document.addEventListener('DOMContentLoaded', boot);

// Filet de sécurité : quoi qu'il arrive, un écran doit s'afficher.
// Sans cela, la moindre erreur de démarrage laissait une page blanche.
function failsafeScreen(reason) {
    console.warn('Démarrage de secours :', reason);
    const ob = document.getElementById('onboarding');
    const app = document.getElementById('app');
    if (ob && app && ob.hidden && app.hidden) {
        ob.hidden = false;
        showOnboardingStep('ob-welcome');
    }
}

// Fonctionnement hors connexion (inutile dans la coque native : les fichiers
// y sont déjà embarqués).
if ('serviceWorker' in navigator && !document.documentElement.dataset.native && API_BASE === '') {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(err => console.warn('SW non enregistré', err));
    });
}

window.addEventListener('error', e => failsafeScreen(e.message));
window.addEventListener('unhandledrejection', e => failsafeScreen(e.reason));
setTimeout(() => failsafeScreen('délai dépassé'), 4000);

function boot() {
    try {
        initOnboarding();
    } catch (err) {
        failsafeScreen(err);
        return;
    }

    state.profile = loadProfile();

    // Décision synchrone : on affiche tout de suite le bon écran, avant
    // le moindre await, pour ne jamais laisser l'utilisateur devant du vide.
    if (state.profile) {
        document.getElementById('onboarding').hidden = true;
    } else {
        document.getElementById('onboarding').hidden = false;
        showOnboardingStep('ob-welcome');
    }

    bootAsync().catch(err => failsafeScreen(err));
}

async function bootAsync() {
    // Rend le stockage plus durable quand le navigateur le permet.
    try { if (navigator.storage?.persist) navigator.storage.persist(); } catch (err) { /* ignore */ }

    if (!state.profile) {
        const legacy = await readLocalProgress();
        if (legacy && (legacy.xp > 0 || legacy.totalCompleted > 0)) {
            // Des progrès existent déjà sur cet appareil : on les adopte
            // en créant un code, sans rien perdre.
            const code = generateCode();
            saveProfile({ code, name: legacy.name || 'Rayan', createdAt: new Date().toISOString() });
            state.progress = normalizeProgress(legacy, legacy.name || 'Rayan', code);
            commitProgress({ immediate: true });
            startApp();
            showOnboardingCode(code);
            return;
        }
        showOnboarding();
        return;
    }

    await startWithProfile();
}

async function readLocalProgress() {
    let raw = lsGet(PROGRESS_KEY) || lsGet(BACKUP_KEY);
    if (!raw) { for (const key of LEGACY_KEYS) { raw = lsGet(key); if (raw) break; } }
    // IndexedDB seulement en dernier recours, et jamais plus de 1,5 s.
    if (!raw) raw = await withTimeout(idbGet(PROGRESS_KEY), 1500, null);
    if (!raw) return null;
    try { return JSON.parse(raw); } catch (err) { return null; }
}

async function startWithProfile() {
    let local;
    try {
        local = normalizeProgress(await readLocalProgress(), state.profile.name, state.profile.code);
    } catch (err) {
        local = defaultProgress(state.profile.name, state.profile.code);
    }
    state.progress = local;
    startApp();

    // On récupère ensuite la version en ligne et on fusionne : le total est
    // toujours le meilleur des deux, jamais une remise à zéro.
    setSyncStatus('pending', 'Synchro…');
    try {
        const remote = await cloudLoad(state.profile.code);
        if (remote) {
            state.progress = normalizeProgress(mergeProgress(local, normalizeProgress(remote)), state.profile.name, state.profile.code);
            commitProgress({ immediate: true });
            refreshEverything();
        } else {
            flushCloudSave();
        }
        setSyncStatus('ok', 'Sauvegardé');
    } catch (err) {
        console.warn('Chargement cloud impossible', err);
        setSyncStatus('offline', 'Hors ligne');
    }
    updateSyncDetail();
}

let appStarted = false;

function startApp() {
    // On montre l'interface AVANT d'initialiser : même si une brique
    // échoue, l'écran n'est jamais vide.
    document.getElementById('onboarding').hidden = true;
    document.getElementById('app').hidden = false;
    if (appStarted) return;
    appStarted = true;

    [checkStreak, initNavigation, initClassSelector, initDifficultyFilter,
     initSettings, initDailyChallengeBanner, buildSubjectCards, initInstall, refreshEverything]
        .forEach(step => {
            try { step(); } catch (err) { console.error(`Init ${step.name} a échoué`, err); }
        });

    window.addEventListener('online', flushCloudSave);
    window.addEventListener('pagehide', beaconSave);
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') { flushCloudSave(); beaconSave(); }
    });
}

function refreshEverything() {
    updateHomeStats();
    updateSubjectCards();
    updateLevelDisplay();
    updateProgressView();
    updateBadgesView();
    updateChallengesView();
    updateResumeCard();
    updateReviewCard();
    updateWeakPointsView();
    updateParentReport();
    updateDailyChallengeProgress();
    const name = getProgress().name || 'Champion';
    document.getElementById('header-name').textContent = name;
    document.getElementById('welcome-title').innerHTML = `Bonjour ${escapeHtml(name)}&nbsp;! 👋`;
    const codeBox = document.getElementById('settings-code');
    if (codeBox && state.profile) codeBox.textContent = formatCode(state.profile.code);
}

/* =========================================================================
   6. ÉCRAN DE DÉMARRAGE (ONBOARDING)
   ========================================================================= */

function showOnboarding() {
    document.getElementById('app').hidden = true;
    const ob = document.getElementById('onboarding');
    ob.hidden = false;
    showOnboardingStep('ob-welcome');
}

function showOnboardingStep(id) {
    document.querySelectorAll('.onboarding-step').forEach(step => {
        step.classList.toggle('active', step.id === id);
    });
}

function showOnboardingCode(code) {
    // L'écran se superpose à l'application : on ne la masque pas, sinon
    // `startApp()` serait rejoué et les écouteurs seraient doublés.
    document.getElementById('onboarding').hidden = false;
    document.getElementById('ob-code-display').textContent = formatCode(code);
    showOnboardingStep('ob-created');
}

function initOnboarding() {
    const nameInput = document.getElementById('ob-name');
    const codeInput = document.getElementById('ob-code');
    const errorEl = document.getElementById('ob-error');

    document.getElementById('ob-start').addEventListener('click', async () => {
        const name = (nameInput.value || '').trim() || 'Champion';
        const code = generateCode();
        saveProfile({ code, name, createdAt: new Date().toISOString() });
        state.progress = defaultProgress(name, code);
        commitProgress({ immediate: true });
        showOnboardingCode(code);
    });

    document.getElementById('ob-have-code').addEventListener('click', () => {
        errorEl.textContent = '';
        showOnboardingStep('ob-restore');
        setTimeout(() => codeInput.focus(), 150);
    });

    document.getElementById('ob-back').addEventListener('click', () => showOnboardingStep('ob-welcome'));

    codeInput.addEventListener('input', () => {
        const clean = cleanCode(codeInput.value).slice(0, 6);
        codeInput.value = clean.length > 3 ? `${clean.slice(0, 3)}-${clean.slice(3)}` : clean;
    });

    document.getElementById('ob-restore-go').addEventListener('click', async () => {
        const code = cleanCode(codeInput.value);
        if (code.length !== 6) {
            errorEl.textContent = 'Le code contient 6 caractères, par exemple ABC-DEF.';
            return;
        }
        errorEl.textContent = 'Recherche de tes progrès…';
        try {
            const remote = await cloudLoad(code);
            if (!remote) {
                errorEl.textContent = "Aucun progrès trouvé avec ce code. Vérifie qu'il est bien recopié.";
                return;
            }
            const progress = normalizeProgress(remote, remote.name, code);
            saveProfile({ code, name: progress.name, createdAt: new Date().toISOString() });
            state.progress = progress;
            commitProgress({ immediate: true });
            document.getElementById('onboarding').hidden = true;
            startApp();
            showToast(`Bon retour ${progress.name} ! ${progress.xp} XP retrouvés 🎉`, 'success');
        } catch (err) {
            errorEl.textContent = 'Connexion impossible. Vérifie internet et réessaie.';
        }
    });

    document.getElementById('ob-copy').addEventListener('click', () => {
        copyToClipboard(formatCode(state.profile?.code || ''));
    });

    document.getElementById('ob-done').addEventListener('click', () => {
        document.getElementById('onboarding').hidden = true;
        if (document.getElementById('app').hidden) startApp();
        else refreshEverything();
    });
}

/* =========================================================================
   7. NAVIGATION
   ========================================================================= */

function initNavigation() {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => navigateTo(btn.dataset.view));
    });
    document.getElementById('back-to-home').addEventListener('click', () => navigateTo('home'));
    document.getElementById('back-to-subject').addEventListener('click', quitExercise);
    document.getElementById('check-answer').addEventListener('click', checkAnswer);
    document.getElementById('next-question').addEventListener('click', nextQuestion);
    document.getElementById('modal-close').addEventListener('click', closeModal);
    document.getElementById('modal-retry').addEventListener('click', () => {
        document.getElementById('result-modal').classList.remove('active');
        if (state.currentFiche) startFiche(state.currentSubject, state.currentFiche);
    });
    document.getElementById('levelup-close').addEventListener('click', () => {
        document.getElementById('levelup-modal').classList.remove('active');
    });
    document.getElementById('badge-close').addEventListener('click', () => {
        document.getElementById('badge-modal').classList.remove('active');
    });
    document.getElementById('resume-card').addEventListener('click', resumeSession);
    document.getElementById('review-card').addEventListener('click', startReviewSession);
    document.getElementById('sync-chip').addEventListener('click', () => {
        flushCloudSave();
        showToast('Sauvegarde en cours…', 'info');
    });
}

function navigateTo(viewName) {
    if (state.currentView === 'exercise' && viewName !== 'exercise') stopTimer();

    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.view === viewName));
    document.querySelectorAll('.view').forEach(view => view.classList.remove('active'));
    document.body.classList.toggle('in-exercise', viewName === 'exercise');

    const target = document.getElementById(`${viewName}-view`);
    if (target) target.classList.add('active');

    if (viewName === 'home') {
        updateHomeStats();
        updateResumeCard();
        updateReviewCard();
        updateDailyChallengeProgress();
        updateLevelDisplay();
    }
    if (viewName === 'progress') { updateProgressView(); updateWeakPointsView(); }
    if (viewName === 'settings') updateParentReport();
    if (viewName === 'badges') updateBadgesView();
    if (viewName === 'challenges') updateChallengesView();

    state.currentView = viewName;
    window.scrollTo(0, 0);
}

/* =========================================================================
   8. MATIÈRES
   ========================================================================= */

function getSubjectsData() {
    return state.currentClass === 'ce2' ? SUBJECTS_DATA_CE2 : SUBJECTS_DATA;
}

function allSubjects() {
    return { ...SUBJECTS_DATA, ...(typeof SUBJECTS_DATA_CE2 !== 'undefined' ? SUBJECTS_DATA_CE2 : {}) };
}

function initClassSelector() {
    document.querySelectorAll('.class-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.class-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.currentClass = btn.dataset.class;
            buildSubjectCards();
            updateSubjectCards();
        });
    });
}

// Les cartes sont générées depuis les données : plus de compteur faux et
// aucune matière oubliée (conjugaison et vocabulaire manquaient).
function buildSubjectCards() {
    const grid = document.getElementById('subjects-grid');
    const subjects = getSubjectsData();
    grid.innerHTML = '';

    Object.keys(subjects).forEach(key => {
        const subject = subjects[key];
        const avgDifficulty = Math.round(
            subject.fiches.reduce((sum, f) => sum + (f.difficulty || 1), 0) / Math.max(1, subject.fiches.length)
        );
        const card = document.createElement('button');
        card.type = 'button';
        card.className = 'subject-card';
        card.dataset.subject = key;
        card.innerHTML = `
            <div class="card-icon">${subject.icon}</div>
            <h3>${escapeHtml(subject.name)}</h3>
            <p>${subject.fiches.length} fiches</p>
            <div class="progress-bar"><div class="progress-fill"></div></div>
            <div class="card-foot">
                <span class="progress-text">0%</span>
                <span class="difficulty-stars">${'⭐'.repeat(Math.max(1, avgDifficulty))}</span>
            </div>
        `;
        card.addEventListener('click', () => showSubjectView(key));
        grid.appendChild(card);
    });
}

function showSubjectView(subjectKey) {
    state.currentSubject = subjectKey;
    const subject = allSubjects()[subjectKey];
    if (!subject) { showToast('Matière introuvable', 'error'); return; }

    document.getElementById('subject-title').textContent = `${subject.icon} ${subject.name}`;

    const progress = getProgress();
    const subjectProgress = progress.subjects[subjectKey] || {};
    const done = subject.fiches.filter(f => subjectProgress[f.id]?.completed).length;
    const stars = subject.fiches.reduce((sum, f) => sum + (subjectProgress[f.id]?.stars || 0), 0);
    document.getElementById('subject-summary').innerHTML = `
        <span class="pill">${done}/${subject.fiches.length} fiches</span>
        <span class="pill">⭐ ${stars}/${subject.fiches.length * 3}</span>
    `;

    const container = document.getElementById('fiches-container');
    container.innerHTML = '';

    let shown = 0;
    subject.fiches.forEach(fiche => {
        if (state.difficultyFilter !== 'all' && String(fiche.difficulty || 1) !== String(state.difficultyFilter)) return;
        shown++;

        const ficheProgress = subjectProgress[fiche.id] || { completed: false, score: 0, stars: 0 };
        const earned = ficheProgress.stars || 0;

        const card = document.createElement('button');
        card.type = 'button';
        card.className = `fiche-card ${ficheProgress.completed ? 'completed' : ''}`;
        card.innerHTML = `
            <div class="fiche-number">${fiche.id}</div>
            <div class="fiche-info">
                <h4>${escapeHtml(fiche.title)}</h4>
                <p>${escapeHtml(fiche.description || '')}</p>
                <span class="fiche-diff">${'⭐'.repeat(fiche.difficulty || 1)}</span>
            </div>
            <div class="fiche-status">
                ${ficheProgress.completed
                    ? `<span class="fiche-stars">${'★'.repeat(earned)}${'☆'.repeat(3 - earned)}</span><span class="fiche-score">${ficheProgress.score}%</span>`
                    : '<span class="fiche-todo">Commencer</span>'}
            </div>
        `;
        card.addEventListener('click', () => startFiche(subjectKey, fiche));
        container.appendChild(card);
    });

    if (!shown) {
        container.innerHTML = '<p class="empty-state">Aucune fiche pour ce niveau de difficulté.</p>';
    }

    stopTimer();
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById('subject-view').classList.add('active');
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.body.classList.remove('in-exercise');
    state.currentView = 'subject';
    window.scrollTo(0, 0);
}

function initDifficultyFilter() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.difficultyFilter = btn.dataset.diff;
            if (state.currentSubject) showSubjectView(state.currentSubject);
        });
    });
}

/* =========================================================================
   9. EXERCICES
   ========================================================================= */

function flattenExercises(fiche) {
    const list = [];
    (fiche.exercises || []).forEach(ex => {
        if (ex.type === 'lecture' && ex.questions) {
            ex.questions.forEach((q, i) => {
                list.push({ ...q, readingText: ex.text, isReading: true, questionIndex: i });
            });
        } else {
            list.push(ex);
        }
    });
    return list;
}

function startFiche(subjectKey, fiche, resumeFrom) {
    state.currentSubject = subjectKey;
    state.currentFiche = fiche;
    state.currentExercises = flattenExercises(fiche);

    if (resumeFrom) {
        state.currentExerciseIndex = Math.min(resumeFrom.index || 0, state.currentExercises.length - 1);
        state.sessionResults = Array.isArray(resumeFrom.results) ? resumeFrom.results : [];
        state.timerSeconds = resumeFrom.timerSeconds || 0;
        state.comboStreak = resumeFrom.comboStreak || 0;
    } else {
        state.currentExerciseIndex = 0;
        state.sessionResults = [];
        state.timerSeconds = 0;
        state.comboStreak = 0;
    }

    if (!state.currentExercises.length) {
        showToast('Cette fiche est vide', 'error');
        return;
    }

    document.getElementById('exercise-title').textContent = fiche.title;
    document.getElementById('total-questions').textContent = state.currentExercises.length;

    startTimer();
    showExercise();
    persistSession();

    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById('exercise-view').classList.add('active');
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.body.classList.add('in-exercise');
    state.currentView = 'exercise';
    window.scrollTo({ top: 0 });
}

// La session en cours est sauvegardée : quitter en plein milieu ne fait
// plus perdre le travail déjà fait.
function persistSession() {
    const progress = getProgress();
    progress.session = state.currentFiche ? {
        classKey: state.currentClass,
        subjectKey: state.currentSubject,
        ficheId: state.currentFiche.id,
        ficheTitle: state.currentFiche.title,
        index: state.currentExerciseIndex,
        total: state.currentExercises.length,
        results: state.sessionResults,
        timerSeconds: state.timerSeconds,
        comboStreak: state.comboStreak,
        savedAt: new Date().toISOString()
    } : null;
    commitProgress();
}

function clearSession() {
    const progress = getProgress();
    progress.session = null;
    commitProgress();
    updateResumeCard();
}

function updateResumeCard() {
    const card = document.getElementById('resume-card');
    if (!card) return;
    const session = getProgress().session;
    if (!session || !session.ficheId) { card.hidden = true; return; }
    const subject = allSubjects()[session.subjectKey];
    document.getElementById('resume-detail').textContent =
        `${subject ? subject.name : ''} · ${session.ficheTitle} — question ${Math.min(session.index + 1, session.total)}/${session.total}`;
    card.hidden = false;
}

function resumeSession() {
    const session = getProgress().session;
    if (!session) return;
    const subject = allSubjects()[session.subjectKey];
    if (!subject) { showToast('Fiche introuvable', 'error'); clearSession(); return; }
    const fiche = subject.fiches.find(f => String(f.id) === String(session.ficheId));
    if (!fiche) { showToast('Fiche introuvable', 'error'); clearSession(); return; }
    state.currentClass = session.classKey || state.currentClass;
    startFiche(session.subjectKey, fiche, session);
}

function quitExercise() {
    stopTimer();
    if (state.isReview) {
        // Les révisions déjà faites sont enregistrées au fil de l'eau.
        state.isReview = false;
        commitProgress({ immediate: true });
        navigateTo('home');
        return;
    }
    persistSession();
    if (state.sessionResults.length) {
        showToast('Progression gardée : tu pourras reprendre 👍', 'success');
    }
    showSubjectView(state.currentSubject);
}

function startTimer() {
    stopTimer();
    updateTimerDisplay();
    state.timer = setInterval(() => {
        state.timerSeconds++;
        updateTimerDisplay();
    }, 1000);
}

function updateTimerDisplay() {
    const mins = Math.floor(state.timerSeconds / 60);
    const secs = state.timerSeconds % 60;
    const el = document.getElementById('timer-value');
    if (el) el.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
}

function stopTimer() {
    if (state.timer) { clearInterval(state.timer); state.timer = null; }
    clearTimeout(state.autoNextTimer);
}

function renderQuestionDots() {
    const dots = document.getElementById('question-dots');
    dots.innerHTML = '';
    state.currentExercises.forEach((_, i) => {
        const dot = document.createElement('span');
        const result = state.sessionResults[i];
        dot.className = 'dot' +
            (i === state.currentExerciseIndex ? ' current' : '') +
            (result ? (result.isCorrect ? ' ok' : ' ko') : '');
        dots.appendChild(dot);
    });
}

function showExercise() {
    const exercise = state.currentExercises[state.currentExerciseIndex];
    const container = document.getElementById('exercise-container');
    const feedback = document.getElementById('feedback-container');

    state.answered = false;
    clearTimeout(state.autoNextTimer);

    document.getElementById('current-question').textContent = state.currentExerciseIndex + 1;
    feedback.innerHTML = '';
    feedback.className = 'exercise-feedback';
    document.getElementById('check-answer').hidden = false;
    document.getElementById('next-question').hidden = true;
    renderQuestionDots();

    const combo = state.comboStreak >= 3
        ? `<div class="combo-chip">🔥 ${state.comboStreak} bonnes réponses d'affilée&nbsp;!</div>` : '';

    if (exercise.isReading) {
        container.innerHTML = `
            ${combo}
            <div class="reading-layout">
                <div class="reading-text">${exercise.readingText}</div>
                <div class="reading-questions">
                    <p class="question-text">${exercise.question}</p>
                    ${exercise.type === 'qcm' ? optionsHtml(exercise) : inputHtml(exercise)}
                </div>
            </div>
        `;
    } else if (exercise.type === 'dictee') {
        container.innerHTML = `
            ${combo}
            <button class="dictee-audio-btn" id="dictee-play" type="button">🔊 Écouter la dictée</button>
            <p class="dictee-hint">💡 ${escapeHtml(exercise.hint || 'Écoute bien puis écris la phrase.')}</p>
            <textarea class="dictee-textarea" id="answer-input" placeholder="Écris ce que tu entends..." autocomplete="off" autocorrect="off" spellcheck="false"></textarea>
        `;
        const play = document.getElementById('dictee-play');
        play.addEventListener('click', () => speakText(exercise.text));
        setTimeout(() => speakText(exercise.text), 400);
    } else if (exercise.type === 'qcm') {
        container.innerHTML = `${combo}<p class="question-text">${exercise.question}</p>${optionsHtml(exercise)}`;
    } else {
        container.innerHTML = `${combo}<p class="question-text">${exercise.question}</p>${inputHtml(exercise)}`;
    }

    container.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            container.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
        });
    });

    const input = document.getElementById('answer-input');
    if (input) {
        input.addEventListener('keydown', e => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                state.answered ? nextQuestion() : checkAnswer();
            }
        });
        if (window.matchMedia('(pointer: fine)').matches) setTimeout(() => input.focus(), 120);
    }
}

function optionsHtml(exercise) {
    // Les options sont mélangées à chaque affichage : sans cela, la bonne
    // réponse se trouvant souvent en tête, l'enfant apprendrait à cliquer
    // sur le premier bouton au lieu de réfléchir.
    return `<div class="answer-options">${shuffle(exercise.options)
        .map(opt => `<button type="button" class="option-btn" data-value="${escapeAttr(opt)}">${escapeHtml(String(opt))}</button>`)
        .join('')}</div>`;
}

function shuffle(list) {
    const out = [...list];
    for (let i = out.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
}

function inputHtml(exercise) {
    const numeric = /^-?[\d\s.,/]+$/.test(String(exercise.answer ?? ''));
    return `<input type="text" class="answer-input" id="answer-input" autocomplete="off"
        autocapitalize="off" autocorrect="off" spellcheck="false"
        inputmode="${numeric ? 'decimal' : 'text'}" placeholder="Ta réponse...">`;
}

function normalizeAnswer(value) {
    return String(value ?? '')
        .trim()
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .replace(/[.!?;]+$/, '');
}

function checkAnswer() {
    if (state.answered) return;
    const exercise = state.currentExercises[state.currentExerciseIndex];
    const feedback = document.getElementById('feedback-container');
    let userAnswer = '';
    let isCorrect = false;

    if (exercise.type === 'qcm') {
        const selected = document.querySelector('.option-btn.selected');
        if (!selected) { showToast('Choisis une réponse d\'abord !', 'error'); return; }
        userAnswer = selected.dataset.value;
        isCorrect = normalizeAnswer(userAnswer) === normalizeAnswer(exercise.answer);
        document.querySelectorAll('.option-btn').forEach(btn => {
            if (normalizeAnswer(btn.dataset.value) === normalizeAnswer(exercise.answer)) btn.classList.add('correct');
            else if (btn.classList.contains('selected')) btn.classList.add('incorrect');
            btn.disabled = true;
        });
    } else if (exercise.type === 'dictee') {
        userAnswer = document.getElementById('answer-input').value;
        const clean = normalizeAnswer(userAnswer);
        const expected = normalizeAnswer(exercise.text);
        if (!clean) { showToast('Écris ta réponse d\'abord !', 'error'); return; }
        isCorrect = clean === expected || levenshteinDistance(clean, expected) <= 2;
    } else {
        userAnswer = document.getElementById('answer-input').value;
        if (!userAnswer.trim()) { showToast('Écris ta réponse d\'abord !', 'error'); return; }
        isCorrect = answersMatch(userAnswer, exercise);
    }

    state.answered = true;
    state.sessionResults[state.currentExerciseIndex] = {
        question: exercise.question || exercise.text,
        userAnswer,
        correctAnswer: exercise.answer ?? exercise.text,
        isCorrect
    };

    if (isCorrect) {
        state.comboStreak++;
        feedback.innerHTML = `<span class="fb-ico">✅</span> Bravo, c'est correct&nbsp;!`;
        feedback.className = 'exercise-feedback correct';
        playSound('correct');
    } else {
        state.comboStreak = 0;
        feedback.innerHTML = `<span class="fb-ico">❌</span> Presque&nbsp;! La bonne réponse était&nbsp;: <strong>${escapeHtml(String(exercise.answer ?? exercise.text))}</strong>`;
        feedback.className = 'exercise-feedback incorrect';
        playSound('incorrect');
    }

    recordAnswerOutcome(exercise, isCorrect);

    renderQuestionDots();
    document.getElementById('check-answer').hidden = true;
    document.getElementById('next-question').hidden = false;
    if (state.isReview) commitProgress();
    else persistSession();

    if (isCorrect && getProgress().settings?.autoNext) {
        state.autoNextTimer = setTimeout(() => { if (state.answered) nextQuestion(); }, 1300);
    }
}

function nextQuestion() {
    clearTimeout(state.autoNextTimer);
    if (!state.answered) return;
    state.currentExerciseIndex++;
    if (state.currentExerciseIndex >= state.currentExercises.length) {
        state.isReview ? finishReviewSession() : finishFiche();
    } else {
        showExercise();
        if (!state.isReview) persistSession();
    }
}

function finishFiche() {
    stopTimer();
    const results = state.sessionResults.filter(Boolean);
    const correctCount = results.filter(r => r.isCorrect).length;
    const totalCount = results.length || 1;
    const percentage = Math.round((correctCount / totalCount) * 100);
    const difficulty = state.currentFiche.difficulty || 1;

    let stars = 0;
    if (percentage >= 90) stars = 3;
    else if (percentage >= 70) stars = 2;
    else if (percentage >= 50) stars = 1;

    let xpGained = Math.round(10 * difficulty * (percentage / 100));
    if (percentage === 100) xpGained += 20;
    if (state.timerSeconds < 60 && percentage >= 70) xpGained += 10;

    const leveledUp = recordFicheResult(state.currentSubject, state.currentFiche.id, percentage, correctCount, totalCount, stars, xpGained);

    document.getElementById('modal-title').textContent = percentage >= 50 ? 'Bravo ! 🎉' : 'Continue ! 💪';
    document.getElementById('result-stars').innerHTML = '★'.repeat(stars) + '☆'.repeat(3 - stars);
    document.getElementById('result-message').textContent = `${correctCount} bonnes réponses sur ${totalCount}`;
    document.getElementById('result-score').textContent = `Score : ${percentage}%`;
    document.getElementById('xp-gained').textContent = `+${xpGained} XP`;
    document.getElementById('result-modal').classList.add('active');

    if (percentage >= 70) { playSound('celebration'); fireConfetti(percentage === 100 ? 1.6 : 1); }
    if (leveledUp) setTimeout(() => showLevelUpModal(leveledUp), 1400);
    checkAndAwardBadges();
}

function closeModal() {
    document.getElementById('result-modal').classList.remove('active');
    if (state.isReview) { state.isReview = false; navigateTo('home'); }
    else showSubjectView(state.currentSubject);
}

/* =========================================================================
   9 bis. COFFRE À ERREURS ET RÉVISION ESPACÉE
   Une notion n'est acquise que si elle revient plusieurs fois, à intervalles
   qui s'allongent. Chaque erreur de Rayan est mise de côté et lui revient à
   J+1, J+3, J+7 puis J+15. S'il se retrompe, elle repart au début.
   ========================================================================= */

const REVIEW_INTERVALS_DAYS = [1, 3, 7, 15];
const REVIEW_SESSION_MAX = 12;

function answersMatch(userAnswer, exercise) {
    const candidates = [exercise.answer, ...(Array.isArray(exercise.accept) ? exercise.accept : [])]
        .filter(v => v !== undefined && v !== null)
        .map(v => normalizeAnswer(v));
    const user = normalizeAnswer(userAnswer);
    if (candidates.includes(user)) return true;

    // Tolérance aux accents : un enfant de 8 ans sur une tablette ne doit pas
    // être puni pour « carre » au lieu de « carré ». Sauf en orthographe et en
    // dictée, où l'accent EST la compétence évaluée.
    if (exercise.strict) return false;
    const stripped = stripAccents(user);
    return candidates.some(c => stripAccents(c) === stripped);
}

function stripAccents(value) {
    return String(value ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '');
}

function reviewItemId(subjectKey, ficheId, exIndex) {
    return `${subjectKey}#${ficheId}#${exIndex}`;
}

function addDays(days) {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + days);
    return d.toISOString();
}

// Appelé à chaque réponse : met à jour les statistiques et le coffre à erreurs.
function recordAnswerOutcome(exercise, isCorrect) {
    const progress = getProgress();
    const subjectKey = state.isReview ? (exercise.__subjectKey || state.currentSubject) : state.currentSubject;
    if (!subjectKey) return;

    if (!progress.stats[subjectKey]) progress.stats[subjectKey] = { answered: 0, correct: 0 };
    progress.stats[subjectKey].answered++;
    if (isCorrect) progress.stats[subjectKey].correct++;

    const ficheId = state.isReview ? exercise.__ficheId : state.currentFiche?.id;
    const exIndex = state.isReview ? exercise.__exIndex : state.currentExerciseIndex;
    if (ficheId === undefined || exIndex === undefined) return;

    const id = reviewItemId(subjectKey, ficheId, exIndex);
    const queue = progress.reviewQueue;
    const existing = queue.find(item => item.id === id);

    if (!isCorrect) {
        if (existing) {
            existing.box = 0;
            existing.dueAt = addDays(REVIEW_INTERVALS_DAYS[0]);
            existing.misses = (existing.misses || 0) + 1;
        } else {
            queue.push({
                id, subjectKey, ficheId, exIndex,
                box: 0, misses: 1,
                dueAt: addDays(REVIEW_INTERVALS_DAYS[0]),
                addedAt: new Date().toISOString()
            });
        }
    } else if (existing) {
        // Réussie : elle passe à l'intervalle suivant, et sort du coffre au bout du dernier.
        existing.box = (existing.box || 0) + 1;
        if (existing.box >= REVIEW_INTERVALS_DAYS.length) {
            progress.reviewQueue = queue.filter(item => item.id !== id);
        } else {
            existing.dueAt = addDays(REVIEW_INTERVALS_DAYS[existing.box]);
        }
    }
}

function dueReviewItems() {
    const now = Date.now();
    return getProgress().reviewQueue
        .filter(item => Date.parse(item.dueAt || 0) <= now)
        .sort((a, b) => (b.misses || 0) - (a.misses || 0));
}

// Reconstruit l'exercice réel à partir de sa référence.
function resolveReviewItem(item) {
    const subject = allSubjects()[item.subjectKey];
    if (!subject) return null;
    const fiche = subject.fiches.find(f => String(f.id) === String(item.ficheId));
    if (!fiche) return null;
    const exercise = flattenExercises(fiche)[item.exIndex];
    if (!exercise) return null;
    return { ...exercise, __subjectKey: item.subjectKey, __ficheId: item.ficheId, __exIndex: item.exIndex };
}

function updateReviewCard() {
    const card = document.getElementById('review-card');
    if (!card) return;
    const due = dueReviewItems();
    const total = getProgress().reviewQueue.length;

    if (!due.length) {
        card.hidden = true;
        const empty = document.getElementById('review-empty');
        if (empty) {
            empty.hidden = total > 0 ? false : true;
            if (total > 0) empty.textContent = `Rien à revoir aujourd'hui. ${total} notion${total > 1 ? 's' : ''} en cours de consolidation. 👌`;
        }
        return;
    }
    const empty = document.getElementById('review-empty');
    if (empty) empty.hidden = true;
    document.getElementById('review-count').textContent =
        `${Math.min(due.length, REVIEW_SESSION_MAX)} question${due.length > 1 ? 's' : ''} à revoir`;
    card.hidden = false;
}

function startReviewSession() {
    const items = dueReviewItems().slice(0, REVIEW_SESSION_MAX);
    const exercises = items.map(resolveReviewItem).filter(Boolean);

    if (!exercises.length) {
        showToast('Rien à réviser pour le moment 👍', 'info');
        // Les références devenues invalides sont nettoyées.
        getProgress().reviewQueue = getProgress().reviewQueue.filter(i => resolveReviewItem(i));
        commitProgress();
        updateReviewCard();
        return;
    }

    state.isReview = true;
    state.currentSubject = null;
    state.currentFiche = { id: '__revision__', title: 'Révision du jour', difficulty: 2 };
    state.currentExercises = exercises;
    state.currentExerciseIndex = 0;
    state.sessionResults = [];
    state.timerSeconds = 0;
    state.comboStreak = 0;

    document.getElementById('exercise-title').textContent = '🔁 Révision du jour';
    document.getElementById('total-questions').textContent = exercises.length;

    startTimer();
    showExercise();

    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById('exercise-view').classList.add('active');
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.body.classList.add('in-exercise');
    state.currentView = 'exercise';
    window.scrollTo(0, 0);
}

function finishReviewSession() {
    stopTimer();
    const results = state.sessionResults.filter(Boolean);
    const correctCount = results.filter(r => r.isCorrect).length;
    const totalCount = results.length || 1;
    const percentage = Math.round((correctCount / totalCount) * 100);
    const xpGained = correctCount * 5 + (percentage === 100 ? 15 : 0);

    const progress = getProgress();
    const oldLevel = progress.level;
    progress.xp += xpGained;
    progress.level = calculateLevel(progress.xp);
    progress.reviewsDone = (progress.reviewsDone || 0) + 1;
    bumpDailyCounter(progress);
    commitProgress({ immediate: true });

    document.getElementById('modal-title').textContent = percentage >= 70 ? 'Mémoire de champion ! 🧠' : 'On y retravaille ! 💪';
    document.getElementById('result-stars').innerHTML = '🧠';
    document.getElementById('result-message').textContent =
        `${correctCount} révisions réussies sur ${totalCount}`;
    document.getElementById('result-score').textContent =
        percentage === 100 ? 'Tout est retenu !' : 'Ce qui reste te sera reproposé';
    document.getElementById('xp-gained').textContent = `+${xpGained} XP`;
    document.getElementById('result-modal').classList.add('active');

    if (percentage >= 70) playSound('celebration');
    if (progress.level > oldLevel) setTimeout(() => showLevelUpModal(progress.level), 1400);

    refreshEverything();
}

/* ---- Points faibles ---- */

function weakSubjects(limit = 3) {
    const progress = getProgress();
    const subjects = allSubjects();
    return Object.keys(progress.stats || {})
        .filter(key => subjects[key] && (progress.stats[key].answered || 0) >= 5)
        .map(key => {
            const s = progress.stats[key];
            return { key, name: subjects[key].name, icon: subjects[key].icon,
                     rate: Math.round((s.correct / s.answered) * 100), answered: s.answered };
        })
        .filter(s => s.rate < 85)
        .sort((a, b) => a.rate - b.rate)
        .slice(0, limit);
}

function updateWeakPointsView() {
    const container = document.getElementById('weak-points');
    if (!container) return;
    const weak = weakSubjects();
    container.innerHTML = '';

    if (!weak.length) {
        container.innerHTML = '<p class="empty-state">Pas encore assez d\'exercices pour repérer tes points faibles. Continue !</p>';
        return;
    }

    weak.forEach(s => {
        const row = document.createElement('button');
        row.type = 'button';
        row.className = 'weak-row';
        row.innerHTML = `
            <span class="icon">${s.icon}</span>
            <div class="info">
                <h4>${escapeHtml(s.name)}</h4>
                <span class="muted">${s.rate}% de réussite sur ${s.answered} questions</span>
            </div>
            <span class="weak-go">S'entraîner →</span>
        `;
        row.addEventListener('click', () => {
            state.currentClass = SUBJECTS_DATA[s.key] ? 'ce1' : 'ce2';
            syncClassButtons();
            buildSubjectCards();
            showSubjectView(s.key);
        });
        container.appendChild(row);
    });
}

/* =========================================================================
   10. PROGRESSION, XP, NIVEAUX
   ========================================================================= */

function recordFicheResult(subjectKey, ficheId, percentage, correctCount, answeredCount, stars, xpGained) {
    const progress = getProgress();
    if (!progress.subjects[subjectKey]) progress.subjects[subjectKey] = {};

    const previous = progress.subjects[subjectKey][ficheId] || {};
    const previouslyCompleted = Boolean(previous.completed);
    const previousStars = previous.stars || 0;

    progress.subjects[subjectKey][ficheId] = {
        completed: previouslyCompleted || percentage >= 50,
        score: Math.max(previous.score || 0, percentage),
        stars: Math.max(stars, previousStars),
        lastAttempt: new Date().toISOString()
    };

    if (!previouslyCompleted && percentage >= 50) progress.totalCompleted++;
    if (stars > previousStars) progress.totalStars += (stars - previousStars);

    progress.correctAnswers += correctCount;
    progress.totalAnswers += answeredCount;

    const oldLevel = progress.level;
    progress.xp += xpGained;
    progress.level = calculateLevel(progress.xp);

    bumpDailyCounter(progress);
    progress.session = null;
    commitProgress({ immediate: true });

    updateHomeStats();
    updateSubjectCards();
    updateLevelDisplay();
    updateResumeCard();
    updateDailyChallengeProgress();

    return progress.level > oldLevel ? progress.level : null;
}

// Série de jours consécutifs et compteur du jour, partagés par les fiches
// et les séances de révision.
function bumpDailyCounter(progress) {
    const today = new Date().toDateString();
    if (progress.lastActiveDate !== today) {
        const gap = progress.lastActiveDate
            ? Math.round((new Date(today) - new Date(progress.lastActiveDate)) / 86400000)
            : null;
        progress.streak = gap === 1 ? (progress.streak || 0) + 1 : 1;
        progress.exercisesToday = 1;
    } else {
        progress.exercisesToday = (progress.exercisesToday || 0) + 1;
    }
    progress.lastActiveDate = today;
}

function calculateLevel(xp) {
    for (let i = LEVELS_DATA.length - 1; i >= 0; i--) {
        if (xp >= LEVELS_DATA[i].xpRequired) return LEVELS_DATA[i].level;
    }
    return 1;
}

function showLevelUpModal(newLevel) {
    const levelData = LEVELS_DATA.find(l => l.level === newLevel);
    if (!levelData) return;
    document.getElementById('levelup-icon').textContent = levelData.icon;
    document.getElementById('levelup-name').textContent = levelData.name;
    document.getElementById('levelup-modal').classList.add('active');
    playSound('celebration');
    fireConfetti(1.8);
}

function updateLevelDisplay() {
    const progress = getProgress();
    const currentLevel = LEVELS_DATA.find(l => l.level === progress.level) || LEVELS_DATA[0];
    const nextLevel = LEVELS_DATA.find(l => l.level === progress.level + 1);

    document.querySelector('.level-icon').textContent = currentLevel.icon;
    document.querySelector('.level-name').textContent = `Niv. ${progress.level} · ${currentLevel.name}`;
    document.getElementById('level-xp').textContent = nextLevel
        ? `${progress.xp} / ${nextLevel.xpRequired} XP`
        : `${progress.xp} XP · Max`;

    let percentage = 100;
    if (nextLevel) {
        const xpInLevel = progress.xp - currentLevel.xpRequired;
        const xpNeeded = nextLevel.xpRequired - currentLevel.xpRequired;
        percentage = Math.max(0, Math.min(100, (xpInLevel / xpNeeded) * 100));
    }
    document.getElementById('xp-fill').style.width = `${percentage}%`;

    // Bloc héros : avatar qui évolue avec le niveau + anneau de progression
    const avatar = document.getElementById('hero-avatar');
    const ring = document.getElementById('rank-ring');
    const heroLevel = document.getElementById('hero-level');
    const heroFill = document.getElementById('hero-xp-fill');
    const heroLabel = document.getElementById('hero-xp-label');
    const heroSub = document.getElementById('hero-subtitle');
    if (avatar) avatar.textContent = currentLevel.icon;
    if (ring) ring.style.setProperty('--p', percentage.toFixed(1));
    if (heroLevel) heroLevel.textContent = `Niv. ${progress.level}`;
    if (heroFill) heroFill.style.width = `${percentage}%`;
    if (heroLabel) {
        heroLabel.textContent = nextLevel
            ? `Plus que ${Math.max(0, nextLevel.xpRequired - progress.xp)} XP pour devenir ${nextLevel.name}`
            : 'Niveau maximum atteint !';
    }
    if (heroSub) heroSub.textContent = `${currentLevel.name} · objectif major de la classe 🏆`;
}

/* ---- Effets de célébration ---- */

function fireConfetti(intensity = 1) {
    const canvas = document.getElementById('confetti');
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.classList.add('active');
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    const colors = ['#f6c454', '#f79433', '#a06bff', '#35e08a', '#3ad6e8', '#ff6fb1'];
    const count = Math.round(90 * intensity);
    const pieces = Array.from({ length: count }, () => ({
        x: window.innerWidth / 2 + (Math.random() - 0.5) * 220,
        y: window.innerHeight * 0.42 + (Math.random() - 0.5) * 80,
        vx: (Math.random() - 0.5) * 11,
        vy: Math.random() * -13 - 4,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI,
        spin: (Math.random() - 0.5) * 0.28
    }));

    let frame = 0;
    const draw = () => {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        let alive = false;
        pieces.forEach(p => {
            p.vy += 0.34;              // gravité
            p.vx *= 0.995;
            p.x += p.vx;
            p.y += p.vy;
            p.rotation += p.spin;
            if (p.y < window.innerHeight + 40) alive = true;
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = Math.max(0, 1 - frame / 150);
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
            ctx.restore();
        });
        frame++;
        if (alive && frame < 160) requestAnimationFrame(draw);
        else { ctx.clearRect(0, 0, window.innerWidth, window.innerHeight); canvas.classList.remove('active'); }
    };
    requestAnimationFrame(draw);
}

/* ---- Installation sur l'appareil ---- */

let deferredInstall = null;

function initInstall() {
    const section = document.getElementById('install-section');
    const button = document.getElementById('install-btn');
    const help = document.getElementById('install-help');
    if (!section || !button) return;

    const standalone = window.matchMedia('(display-mode: standalone)').matches
        || window.navigator.standalone === true;
    if (standalone) return; // déjà installée

    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    section.hidden = false;

    if (isIOS) {
        // iOS n'expose pas d'invite d'installation : on explique le geste.
        button.hidden = true;
        help.innerHTML = 'Sur iPhone et iPad&nbsp;: appuie sur le bouton <strong>Partager</strong> '
            + '(le carré avec une flèche, en bas de Safari), puis choisis '
            + '<strong>« Sur l\'écran d\'accueil »</strong>. Champion s\'ouvrira en plein écran, '
            + 'comme une vraie application, et fonctionnera même sans internet.';
        return;
    }

    button.hidden = !deferredInstall;
    button.addEventListener('click', async () => {
        if (!deferredInstall) { showToast('Utilise le menu du navigateur → « Installer »', 'info'); return; }
        deferredInstall.prompt();
        const { outcome } = await deferredInstall.userChoice;
        if (outcome === 'accepted') { showToast('Application installée 🎉', 'success'); section.hidden = true; }
        deferredInstall = null;
    });
}

window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    deferredInstall = e;
    const button = document.getElementById('install-btn');
    const section = document.getElementById('install-section');
    if (button && section) { section.hidden = false; button.hidden = false; }
});

function checkStreak() {
    const progress = getProgress();
    const today = new Date().toDateString();
    const lastActive = progress.lastActiveDate;

    if (lastActive && lastActive !== today) {
        const diffDays = Math.round((new Date(today) - new Date(lastActive)) / 86400000);
        if (diffDays > 1) progress.streak = 0;
        progress.exercisesToday = 0;
    }
    if (!lastActive) progress.streak = progress.streak || 0;
    commitProgress();
}

function updateHomeStats() {
    const progress = getProgress();
    document.getElementById('today-exercises').textContent = progress.exercisesToday || 0;
    document.getElementById('streak-days').textContent = progress.streak || 0;
    document.getElementById('total-xp').textContent = progress.xp || 0;
}

function updateSubjectCards() {
    const progress = getProgress();
    const subjects = getSubjectsData();

    document.querySelectorAll('.subject-card').forEach(card => {
        const subjectKey = card.dataset.subject;
        const subject = subjects[subjectKey];
        if (!subject) return;
        const subjectProgress = progress.subjects[subjectKey] || {};
        const total = subject.fiches.length;
        const completed = subject.fiches.filter(f => subjectProgress[f.id]?.completed).length;
        const percentage = total ? Math.round((completed / total) * 100) : 0;

        card.querySelector('.progress-fill').style.width = `${percentage}%`;
        card.querySelector('.progress-text').textContent = `${percentage}%`;
        card.classList.toggle('done', percentage === 100);
    });
}

function updateProgressView() {
    const progress = getProgress();
    let totalFiches = 0;
    let completedFiches = 0;
    const subjects = allSubjects();

    Object.keys(subjects).forEach(key => {
        totalFiches += subjects[key].fiches.length;
        const subjectProgress = progress.subjects[key] || {};
        completedFiches += subjects[key].fiches.filter(f => subjectProgress[f.id]?.completed).length;
    });

    const globalPercentage = totalFiches ? Math.round((completedFiches / totalFiches) * 100) : 0;
    const circle = document.getElementById('global-progress-circle');
    const circumference = 2 * Math.PI * 45;
    circle.style.strokeDasharray = `${circumference}`;
    circle.style.strokeDashoffset = circumference - (globalPercentage / 100) * circumference;

    document.getElementById('global-percentage').textContent = `${globalPercentage}%`;
    document.getElementById('total-completed').textContent = progress.totalCompleted || 0;
    document.getElementById('total-stars').textContent = progress.totalStars || 0;
    document.getElementById('total-xp-stat').textContent = progress.xp || 0;

    const accuracy = progress.totalAnswers > 0 ? Math.round((progress.correctAnswers / progress.totalAnswers) * 100) : 0;
    document.getElementById('accuracy-rate').textContent = `${accuracy}%`;

    const list = document.getElementById('subject-progress-list');
    list.innerHTML = '';
    Object.keys(subjects).forEach(key => {
        const subject = subjects[key];
        const subjectProgress = progress.subjects[key] || {};
        const total = subject.fiches.length;
        const completed = subject.fiches.filter(f => subjectProgress[f.id]?.completed).length;
        const percentage = total ? Math.round((completed / total) * 100) : 0;

        const item = document.createElement('button');
        item.type = 'button';
        item.className = 'subject-progress-item';
        item.innerHTML = `
            <span class="icon">${subject.icon}</span>
            <div class="info">
                <h4>${escapeHtml(subject.name)}</h4>
                <div class="progress-bar"><div class="progress-fill" style="width:${percentage}%"></div></div>
                <span class="muted">${completed}/${total} fiches</span>
            </div>
            <span class="percentage">${percentage}%</span>
        `;
        item.addEventListener('click', () => {
            state.currentClass = SUBJECTS_DATA[key] ? 'ce1' : 'ce2';
            syncClassButtons();
            buildSubjectCards();
            showSubjectView(key);
        });
        list.appendChild(item);
    });
}

function syncClassButtons() {
    document.querySelectorAll('.class-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.class === state.currentClass);
    });
}

/* ---- Bilan pour les parents ---- */

function updateParentReport() {
    const el = document.getElementById('parent-report');
    if (!el) return;
    const progress = getProgress();
    const subjects = allSubjects();

    const ranked = Object.keys(progress.stats || {})
        .filter(key => subjects[key] && (progress.stats[key].answered || 0) >= 5)
        .map(key => ({
            name: subjects[key].name,
            icon: subjects[key].icon,
            rate: Math.round((progress.stats[key].correct / progress.stats[key].answered) * 100),
            answered: progress.stats[key].answered
        }))
        .sort((a, b) => b.rate - a.rate);

    const accuracy = progress.totalAnswers > 0
        ? Math.round((progress.correctAnswers / progress.totalAnswers) * 100) : 0;
    // Une matière ne peut pas figurer à la fois dans les forces et les faiblesses.
    const strong = ranked.filter(s => s.rate >= 85).slice(0, 3);
    const weak = ranked.filter(s => s.rate < 85).reverse().slice(0, 3);

    const line = s => `<li><span>${s.icon} ${escapeHtml(s.name)}</span><strong>${s.rate}%</strong> <span class="muted">(${s.answered} q.)</span></li>`;

    el.innerHTML = `
        <div class="report-grid">
            <div><span class="report-value">${progress.totalAnswers || 0}</span><span class="report-label">questions faites</span></div>
            <div><span class="report-value">${accuracy}%</span><span class="report-label">de réussite</span></div>
            <div><span class="report-value">${progress.streak || 0}</span><span class="report-label">jours d'affilée</span></div>
            <div><span class="report-value">${progress.reviewQueue?.length || 0}</span><span class="report-label">notions à consolider</span></div>
        </div>
        ${strong.length ? `<h4 class="report-head">Ce qu'il maîtrise</h4><ul class="report-list">${strong.map(line).join('')}</ul>` : ''}
        ${weak.length ? `<h4 class="report-head">Ce qu'il faut retravailler</h4><ul class="report-list weak">${weak.map(line).join('')}</ul>` : ''}
        ${!ranked.length ? '<p class="settings-help">Le bilan apparaîtra après quelques fiches.</p>' : ''}
        <p class="settings-help">${progress.reviewsDone || 0} séance(s) de révision effectuée(s).</p>
    `;
}

/* =========================================================================
   11. BADGES
   ========================================================================= */

function updateBadgesView() {
    const progress = getProgress();
    const container = document.getElementById('badges-container');
    container.innerHTML = '';

    BADGES_DATA.forEach(badge => {
        const unlocked = progress.badges?.includes(badge.id);
        const card = document.createElement('div');
        card.className = `badge-card ${unlocked ? 'unlocked' : 'locked'}`;
        card.innerHTML = `
            <span class="badge-icon">${unlocked ? badge.icon : '🔒'}</span>
            <div class="badge-name">${escapeHtml(badge.name)}</div>
            <div class="badge-desc">${escapeHtml(badge.description)}</div>
        `;
        container.appendChild(card);
    });

    document.getElementById('badges-count').textContent =
        `${progress.badges?.length || 0} badge${(progress.badges?.length || 0) > 1 ? 's' : ''} débloqué${(progress.badges?.length || 0) > 1 ? 's' : ''} sur ${BADGES_DATA.length}`;
}

function checkAndAwardBadges() {
    const progress = getProgress();
    if (!progress.badges) progress.badges = [];
    const subjects = allSubjects();
    let awarded = false;

    BADGES_DATA.forEach(badge => {
        if (progress.badges.includes(badge.id)) return;
        const c = badge.condition;
        let earned = false;

        if (c.type === 'fiches_completed' && progress.totalCompleted >= c.count) earned = true;
        if (c.type === 'stars' && progress.totalStars >= c.count) earned = true;
        if (c.type === 'streak' && progress.streak >= c.count) earned = true;
        if (c.type === 'perfect_scores') {
            let perfect = 0;
            Object.values(progress.subjects).forEach(subj => {
                Object.values(subj).forEach(f => { if (f.score === 100) perfect++; });
            });
            if (perfect >= c.count) earned = true;
        }
        if (c.type === 'subject_complete' && subjects[c.subject]) {
            const sp = progress.subjects[c.subject] || {};
            earned = subjects[c.subject].fiches.every(f => sp[f.id]?.completed);
        }
        if (c.type === 'average' && progress.totalAnswers > 0) {
            const avg = Math.round((progress.correctAnswers / progress.totalAnswers) * 100);
            if (avg >= (c.count || 90) && progress.totalCompleted >= 5) earned = true;
        }

        if (earned) {
            progress.badges.push(badge.id);
            awarded = true;
            setTimeout(() => showBadgeModal(badge), 2200);
        }
    });

    if (awarded) { commitProgress({ immediate: true }); updateBadgesView(); }
}

function showBadgeModal(badge) {
    document.getElementById('badge-unlock-icon').textContent = badge.icon;
    document.getElementById('badge-unlock-name').textContent = badge.name;
    document.getElementById('badge-unlock-desc').textContent = badge.description;
    document.getElementById('badge-modal').classList.add('active');
    playSound('celebration');
    fireConfetti(1.4);
}

/* =========================================================================
   12. DÉFIS
   ========================================================================= */

function todaysChallenge() {
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    const list = CHALLENGES_DATA.daily;
    return list[dayOfYear % list.length];
}

function initDailyChallengeBanner() {
    const banner = document.getElementById('daily-challenge');
    if (!banner) return;
    const challenge = todaysChallenge();

    banner.querySelector('.challenge-icon').textContent = challenge.icon;
    document.getElementById('daily-challenge-text').textContent = challenge.description;
    banner.querySelector('.challenge-reward').textContent = `+${challenge.reward} XP`;
    banner.addEventListener('click', () => startChallengeExercises(challenge));
    updateDailyChallengeProgress();
}

function updateDailyChallengeProgress() {
    const challenge = todaysChallenge();
    const done = getProgress().exercisesToday || 0;
    const target = challenge.count || 5;
    const percentage = Math.min(100, (done / target) * 100);
    const fill = document.getElementById('daily-challenge-fill');
    const status = document.getElementById('daily-challenge-status');
    if (fill) fill.style.width = `${percentage}%`;
    if (status) status.textContent = `${Math.min(done, target)}/${target}`;
}

function updateChallengesView() {
    const progress = getProgress();
    ['daily', 'weekly', 'special'].forEach(type => {
        const container = document.getElementById(`${type}-challenges`);
        if (!container) return;
        container.innerHTML = '';

        CHALLENGES_DATA[type].forEach(challenge => {
            const completed = progress.challengesCompleted?.includes(challenge.id);
            const clickable = challenge.subject || challenge.multiSubject;
            const card = document.createElement(clickable ? 'button' : 'div');
            if (clickable) card.type = 'button';
            card.className = `challenge-card ${completed ? 'completed' : ''} ${clickable ? 'clickable' : ''}`;
            card.innerHTML = `
                <div class="challenge-card-icon">${challenge.icon}</div>
                <div class="challenge-card-info">
                    <h4>${escapeHtml(challenge.name)}</h4>
                    <p>${escapeHtml(challenge.description)}</p>
                </div>
                <div class="challenge-card-side">
                    <span class="challenge-card-reward">+${challenge.reward} XP</span>
                    ${clickable ? '<span class="challenge-go-btn">Commencer →</span>' : ''}
                </div>
            `;
            if (clickable) card.addEventListener('click', () => startChallengeExercises(challenge));
            container.appendChild(card);
        });
    });
}

function startChallengeExercises(challenge) {
    if (challenge.multiSubject && challenge.subjects) {
        showSubjectSelectionModal(challenge);
        return;
    }
    launchChallengeForSubject(challenge.subject, challenge);
}

function showSubjectSelectionModal(challenge) {
    const subjects = allSubjects();
    const progress = getProgress();
    const existing = document.getElementById('subject-selection-modal');
    if (existing) existing.remove();

    const html = `
        <div class="modal active" id="subject-selection-modal">
            <div class="modal-content subject-selection" role="dialog" aria-modal="true">
                <div class="modal-header">
                    <span class="challenge-modal-icon">${challenge.icon}</span>
                    <h2>${escapeHtml(challenge.name)}</h2>
                    <p class="challenge-modal-desc">${escapeHtml(challenge.description)}</p>
                </div>
                <div class="modal-body">
                    <h3>Choisis une matière</h3>
                    <div class="subject-selection-grid">
                        ${challenge.subjects.map(key => {
                            const subject = subjects[key];
                            if (!subject) return '';
                            const sp = progress.subjects[key] || {};
                            const total = subject.fiches.length;
                            const done = subject.fiches.filter(f => sp[f.id]?.completed).length;
                            const pct = total ? Math.round((done / total) * 100) : 0;
                            return `
                                <button type="button" class="subject-select-btn" data-subject="${escapeAttr(key)}">
                                    <span class="subject-select-icon">${subject.icon}</span>
                                    <span class="subject-select-name">${escapeHtml(subject.name)}</span>
                                    <span class="subject-select-progress">${pct}%</span>
                                </button>`;
                        }).join('')}
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" id="close-subject-selection">Annuler</button>
                </div>
            </div>
        </div>`;

    document.body.insertAdjacentHTML('beforeend', html);
    document.getElementById('close-subject-selection').addEventListener('click', closeSubjectSelectionModal);
    document.querySelectorAll('.subject-select-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.dataset.subject;
            closeSubjectSelectionModal();
            launchChallengeForSubject(key, challenge);
        });
    });
    document.getElementById('subject-selection-modal').addEventListener('click', e => {
        if (e.target.id === 'subject-selection-modal') closeSubjectSelectionModal();
    });
}

function closeSubjectSelectionModal() {
    document.getElementById('subject-selection-modal')?.remove();
}

function launchChallengeForSubject(subjectKey, challenge) {
    let subject = SUBJECTS_DATA[subjectKey];
    let isCE2 = false;
    if (!subject && typeof SUBJECTS_DATA_CE2 !== 'undefined' && SUBJECTS_DATA_CE2[subjectKey]) {
        subject = SUBJECTS_DATA_CE2[subjectKey];
        isCE2 = true;
    }
    if (!subject || !subject.fiches?.length) {
        showToast('Matière non disponible pour ce défi', 'error');
        return;
    }

    state.currentClass = isCE2 ? 'ce2' : 'ce1';
    syncClassButtons();
    buildSubjectCards();

    const subjectProgress = getProgress().subjects[subjectKey] || {};
    const fiche = subject.fiches.find(f => !subjectProgress[f.id]?.completed) || subject.fiches[0];

    showToast(`Défi « ${challenge.name} » lancé !`, 'success');
    startFiche(subjectKey, fiche);
}

/* =========================================================================
   13. RÉGLAGES
   ========================================================================= */

function initSettings() {
    const progress = getProgress();

    document.getElementById('copy-code').addEventListener('click', () => {
        copyToClipboard(formatCode(state.profile?.code || ''));
    });

    document.getElementById('switch-code').addEventListener('click', async () => {
        await flushCloudSave();
        if (!confirm('Utiliser un autre code champion sur cet appareil ?\n\nTes progrès actuels restent sauvegardés en ligne sous le code ' + formatCode(state.profile?.code || '') + '.')) return;
        // On vide aussi la copie locale, sinon elle serait ré-adoptée au
        // redémarrage avant même la saisie du nouveau code.
        lsRemove(PROFILE_KEY);
        lsRemove(PROGRESS_KEY);
        lsRemove(BACKUP_KEY);
        await idbSet(PROGRESS_KEY, null);
        await idbSet(PROFILE_KEY, null);
        location.reload();
    });

    // Sons / passage automatique
    const soundToggle = document.getElementById('toggle-sound');
    const autoToggle = document.getElementById('toggle-autonext');
    soundToggle.checked = progress.settings?.sound !== false;
    autoToggle.checked = progress.settings?.autoNext !== false;
    soundToggle.addEventListener('change', () => {
        getProgress().settings.sound = soundToggle.checked;
        commitProgress();
    });
    autoToggle.addEventListener('change', () => {
        getProgress().settings.autoNext = autoToggle.checked;
        commitProgress();
    });

    // Export / import
    document.getElementById('export-data').addEventListener('click', () => {
        const data = { progress: getProgress(), code: state.profile?.code, exportDate: new Date().toISOString() };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `champion_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        showToast('Sauvegarde exportée !', 'success');
    });

    const importInput = document.getElementById('import-file');
    document.getElementById('import-data').addEventListener('click', () => importInput.click());
    importInput.addEventListener('change', async () => {
        const file = importInput.files?.[0];
        if (!file) return;
        try {
            const parsed = JSON.parse(await file.text());
            const incoming = normalizeProgress(parsed.progress || parsed, state.profile?.name, state.profile?.code);
            state.progress = normalizeProgress(mergeProgress(getProgress(), incoming), state.profile?.name, state.profile?.code);
            commitProgress({ immediate: true });
            refreshEverything();
            showToast('Sauvegarde importée et fusionnée 🎉', 'success');
        } catch (err) {
            showToast('Fichier illisible', 'error');
        }
        importInput.value = '';
    });

    document.getElementById('reset-progress').addEventListener('click', () => {
        if (!confirm('Effacer TOUS les progrès de ce code ? Cette action est définitive.')) return;
        const name = getProgress().name;
        state.progress = defaultProgress(name, state.profile?.code);
        commitProgress({ immediate: true });
        refreshEverything();
        showToast('Progrès réinitialisés', 'success');
    });

    // Générateur IA (optionnel)
    const apiKeyInput = document.getElementById('openai-api-key');
    const savedKey = lsGet('openai_api_key');
    if (savedKey) {
        apiKeyInput.value = savedKey;
        document.getElementById('ai-generator').hidden = false;
    }
    document.getElementById('save-api-key').addEventListener('click', () => {
        const key = apiKeyInput.value.trim();
        if (!key) return;
        lsSet('openai_api_key', key);
        document.getElementById('ai-generator').hidden = false;
        showToast('Clé API enregistrée', 'success');
    });

    const select = document.getElementById('ai-subject');
    const subjects = allSubjects();
    Object.keys(subjects).forEach(key => {
        const opt = document.createElement('option');
        opt.value = key;
        opt.textContent = subjects[key].name;
        select.appendChild(opt);
    });
    document.getElementById('generate-content').addEventListener('click', generateContent);
    updateSyncDetail();
}

async function generateContent() {
    const apiKey = lsGet('openai_api_key');
    const prompt = document.getElementById('ai-prompt').value.trim();
    const resultDiv = document.getElementById('ai-result');
    if (!apiKey) { showToast('Entre ta clé API', 'error'); return; }
    if (!prompt) { showToast('Décris le type d\'exercice', 'error'); return; }

    resultDiv.textContent = 'Génération…';
    const systemPrompt = `Tu es un expert en création d'exercices pour élèves CE1-CE2 (6-8 ans).
Génère des exercices au format JSON uniquement. Format:
[{"type":"input","question":"5 + 3 = ?","answer":"8"}]
ou
[{"type":"qcm","question":"Combien font 6 + 4 ?","options":["8","9","10","11"],"answer":"10"}]
Génère exactement 5 exercices adaptés au niveau demandé.`;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: `Génère des exercices pour: ${prompt}` }
                ],
                temperature: 0.7
            })
        });
        if (!response.ok) throw new Error('Erreur API');
        const data = await response.json();
        const content = data.choices[0].message.content;
        const match = content.match(/\[[\s\S]*\]/);
        resultDiv.textContent = match ? JSON.stringify(JSON.parse(match[0]), null, 2) : content;
        showToast('Contenu généré !', 'success');
    } catch (err) {
        resultDiv.textContent = 'Erreur. Vérifie ta clé API.';
        showToast('Erreur de génération', 'error');
    }
}

/* =========================================================================
   14. UTILITAIRES
   ========================================================================= */

function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, c => (
        { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
    ));
}

function escapeAttr(value) {
    return escapeHtml(value);
}

function copyToClipboard(text) {
    const done = () => showToast('Code copié 📋', 'success');
    if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
    } else {
        fallbackCopy(text, done);
    }
}

function fallbackCopy(text, done) {
    const area = document.createElement('textarea');
    area.value = text;
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    try { document.execCommand('copy'); done(); } catch (err) { showToast(text, 'info'); }
    area.remove();
}

function speakText(text) {
    if (!state.speechSynthesis) return;
    try {
        state.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(String(text));
        utterance.lang = 'fr-FR';
        utterance.rate = 0.75;
        state.speechSynthesis.speak(utterance);
    } catch (err) { /* ignore */ }
}

function playSound(type) {
    if (getProgress().settings?.sound === false) return;
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = ctx.createOscillator();
        const gain = ctx.createGain();
        oscillator.connect(gain);
        gain.connect(ctx.destination);

        const notes = {
            correct: [523.25, 659.25, 783.99],
            incorrect: [349.23, 311.13],
            celebration: [523.25, 659.25, 783.99, 1046.5]
        }[type] || [523.25];

        notes.forEach((freq, i) => oscillator.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.1));
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.45);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.45);
        oscillator.onended = () => ctx.close();
    } catch (err) { /* ignore */ }
}

function showToast(message, type = 'info') {
    const stack = document.getElementById('toast-stack');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    stack.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('leaving');
        setTimeout(() => toast.remove(), 300);
    }, 2600);
}

function levenshteinDistance(a, b) {
    const m = a.length;
    const n = b.length;
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            dp[i][j] = a[i - 1] === b[j - 1]
                ? dp[i - 1][j - 1]
                : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
        }
    }
    return dp[m][n];
}
