// Rayan Champion Learning Application - Main Logic
// With XP, Levels, Badges, Challenges, CE1 & CE2

const state = {
    currentView: 'home',
    currentClass: 'ce1',
    currentSubject: null,
    currentFiche: null,
    currentExerciseIndex: 0,
    currentExercises: [],
    currentReadingQuestion: 0,
    sessionResults: [],
    difficultyFilter: 'all',
    timer: null,
    timerSeconds: 0,
    speechSynthesis: window.speechSynthesis
};

const STORAGE_KEY = 'rayan_champion_progress';

// Get subjects data based on current class
function getSubjectsData() {
    return state.currentClass === 'ce2' ? SUBJECTS_DATA_CE2 : SUBJECTS_DATA;
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    loadProgress();
    initNavigation();
    initClassSelector();
    initSubjectCards();
    initDifficultyFilter();
    updateHomeStats();
    updateProgressView();
    updateBadgesView();
    updateChallengesView();
    initSettings();
    checkStreak();
    updateLevelDisplay();
});

// ==================== NAVIGATION ====================
function initNavigation() {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => navigateTo(btn.dataset.view));
    });
    document.getElementById('back-to-home').addEventListener('click', () => navigateTo('home'));
    document.getElementById('back-to-subject').addEventListener('click', () => showSubjectView(state.currentSubject));
    document.getElementById('check-answer').addEventListener('click', checkAnswer);
    document.getElementById('next-question').addEventListener('click', nextQuestion);
    document.getElementById('modal-close').addEventListener('click', closeModal);
    document.getElementById('levelup-close').addEventListener('click', () => document.getElementById('levelup-modal').classList.remove('active'));
    document.getElementById('badge-close').addEventListener('click', () => document.getElementById('badge-modal').classList.remove('active'));
}

function navigateTo(viewName) {
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.view === viewName));
    document.querySelectorAll('.view').forEach(view => view.classList.remove('active'));

    if (viewName === 'home') {
        document.getElementById('home-view').classList.add('active');
        updateHomeStats();
    } else if (viewName === 'progress') {
        document.getElementById('progress-view').classList.add('active');
        updateProgressView();
    } else if (viewName === 'badges') {
        document.getElementById('badges-view').classList.add('active');
        updateBadgesView();
    } else if (viewName === 'challenges') {
        document.getElementById('challenges-view').classList.add('active');
        updateChallengesView();
    } else if (viewName === 'settings') {
        document.getElementById('settings-view').classList.add('active');
    }
    state.currentView = viewName;
}

// ==================== CLASS SELECTOR ====================
function initClassSelector() {
    document.querySelectorAll('.class-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.class-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.currentClass = btn.dataset.class;

            document.getElementById('subjects-ce1').style.display = state.currentClass === 'ce1' ? 'grid' : 'none';
            document.getElementById('subjects-ce2').style.display = state.currentClass === 'ce2' ? 'grid' : 'none';

            updateSubjectCards();
        });
    });
}

// ==================== SUBJECTS ====================
function initSubjectCards() {
    document.querySelectorAll('.subject-card').forEach(card => {
        card.addEventListener('click', () => showSubjectView(card.dataset.subject));
    });
}

function showSubjectView(subjectKey) {
    state.currentSubject = subjectKey;
    const subjects = getSubjectsData();
    const subject = subjects[subjectKey];
    if (!subject) return;

    document.getElementById('subject-title').textContent = subject.name;
    const container = document.getElementById('fiches-container');
    container.innerHTML = '';

    const progress = getProgress();
    const subjectProgress = progress.subjects[subjectKey] || {};

    subject.fiches.forEach(fiche => {
        if (state.difficultyFilter !== 'all' && fiche.difficulty != state.difficultyFilter) return;

        const ficheProgress = subjectProgress[fiche.id] || { completed: false, score: 0 };
        const stars = ficheProgress.stars || 0;
        const diffStars = '⭐'.repeat(fiche.difficulty || 1);

        const card = document.createElement('div');
        card.className = `fiche-card ${ficheProgress.completed ? 'completed' : ''}`;
        card.innerHTML = `
            <div class="fiche-number">${fiche.id}</div>
            <div class="fiche-info">
                <h4>${fiche.title}</h4>
                <p>${fiche.description} ${diffStars}</p>
            </div>
            <div class="fiche-status">
                ${ficheProgress.completed ? '⭐'.repeat(stars) + '☆'.repeat(3-stars) : '📝'}
            </div>
        `;
        card.addEventListener('click', () => startFiche(subjectKey, fiche));
        container.appendChild(card);
    });

    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById('subject-view').classList.add('active');
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
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

// ==================== EXERCISES ====================
function startFiche(subjectKey, fiche) {
    state.currentSubject = subjectKey;
    state.currentFiche = fiche;
    state.currentExerciseIndex = 0;
    state.currentReadingQuestion = 0;
    state.sessionResults = [];
    state.timerSeconds = 0;

    // Flatten exercises (handle lecture type with multiple questions)
    state.currentExercises = [];
    fiche.exercises.forEach(ex => {
        if (ex.type === 'lecture' && ex.questions) {
            ex.questions.forEach((q, i) => {
                state.currentExercises.push({ ...q, readingText: ex.text, isReading: true, questionIndex: i });
            });
        } else {
            state.currentExercises.push(ex);
        }
    });

    document.getElementById('exercise-title').textContent = fiche.title;
    document.getElementById('total-questions').textContent = state.currentExercises.length;

    // Start timer
    startTimer();
    showExercise();

    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById('exercise-view').classList.add('active');
}

function startTimer() {
    document.getElementById('exercise-timer').style.display = 'flex';
    state.timer = setInterval(() => {
        state.timerSeconds++;
        const mins = Math.floor(state.timerSeconds / 60);
        const secs = state.timerSeconds % 60;
        document.getElementById('timer-value').textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
    }, 1000);
}

function stopTimer() {
    if (state.timer) {
        clearInterval(state.timer);
        state.timer = null;
    }
}

function showExercise() {
    const exercise = state.currentExercises[state.currentExerciseIndex];
    const container = document.getElementById('exercise-container');
    const feedbackContainer = document.getElementById('feedback-container');

    document.getElementById('current-question').textContent = state.currentExerciseIndex + 1;
    feedbackContainer.innerHTML = '';
    feedbackContainer.className = 'exercise-feedback';
    document.getElementById('check-answer').style.display = 'block';
    document.getElementById('next-question').style.display = 'none';

    if (exercise.isReading) {
        // Reading comprehension
        container.innerHTML = `
            <div class="reading-text">${exercise.readingText}</div>
            <div class="reading-questions">
                <p class="question-text">${exercise.question}</p>
                ${exercise.type === 'qcm' ? `
                    <div class="answer-options">
                        ${exercise.options.map(opt => `<button class="option-btn" data-value="${opt}">${opt}</button>`).join('')}
                    </div>
                ` : `<input type="text" class="answer-input" id="answer-input" autocomplete="off" placeholder="Ta réponse...">`}
            </div>
        `;
    } else if (exercise.type === 'dictee') {
        container.innerHTML = `
            <button class="dictee-audio-btn" onclick="speakText('${exercise.text.replace(/'/g, "\\'")}')">🔊 Écouter la dictée</button>
            <p style="color: var(--text-secondary); margin-bottom: 1rem;">Indice: ${exercise.hint}</p>
            <textarea class="dictee-textarea" id="answer-input" placeholder="Écris ce que tu entends..."></textarea>
        `;
    } else if (exercise.type === 'qcm') {
        container.innerHTML = `
            <p class="question-text">${exercise.question}</p>
            <div class="answer-options">
                ${exercise.options.map(opt => `<button class="option-btn" data-value="${opt}">${opt}</button>`).join('')}
            </div>
        `;
    } else {
        container.innerHTML = `
            <p class="question-text">${exercise.question}</p>
            <input type="text" class="answer-input" id="answer-input" autocomplete="off" placeholder="Ta réponse...">
        `;
    }

    // Event listeners for QCM
    container.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            container.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
        });
    });

    // Focus input and Enter key
    setTimeout(() => {
        const input = document.getElementById('answer-input');
        if (input) {
            input.focus();
            input.addEventListener('keypress', e => { if (e.key === 'Enter') checkAnswer(); });
        }
    }, 100);
}

function checkAnswer() {
    const exercise = state.currentExercises[state.currentExerciseIndex];
    const feedbackContainer = document.getElementById('feedback-container');
    let userAnswer = '';
    let isCorrect = false;

    if (exercise.type === 'qcm') {
        const selected = document.querySelector('.option-btn.selected');
        if (!selected) { showToast('Sélectionne une réponse !', 'error'); return; }
        userAnswer = selected.dataset.value;
        isCorrect = userAnswer === exercise.answer;
        document.querySelectorAll('.option-btn').forEach(btn => {
            if (btn.dataset.value === exercise.answer) btn.classList.add('correct');
            else if (btn.classList.contains('selected')) btn.classList.add('incorrect');
            btn.style.pointerEvents = 'none';
        });
    } else if (exercise.type === 'dictee') {
        userAnswer = document.getElementById('answer-input').value.trim().toLowerCase();
        const correctAnswer = exercise.text.toLowerCase();
        isCorrect = userAnswer === correctAnswer || levenshteinDistance(userAnswer, correctAnswer) <= 2;
    } else {
        userAnswer = document.getElementById('answer-input').value.trim();
        isCorrect = userAnswer.toLowerCase() === exercise.answer.toString().toLowerCase();
    }

    state.sessionResults.push({
        question: exercise.question || exercise.text,
        userAnswer,
        correctAnswer: exercise.answer || exercise.text,
        isCorrect
    });

    if (isCorrect) {
        feedbackContainer.innerHTML = '✅ Bravo ! C\'est correct !';
        feedbackContainer.className = 'exercise-feedback correct';
        playSound('correct');
    } else {
        feedbackContainer.innerHTML = `❌ Pas tout à fait. La réponse était : <strong>${exercise.answer || exercise.text}</strong>`;
        feedbackContainer.className = 'exercise-feedback incorrect';
        playSound('incorrect');
    }

    document.getElementById('check-answer').style.display = 'none';
    document.getElementById('next-question').style.display = 'block';
}

function nextQuestion() {
    state.currentExerciseIndex++;
    if (state.currentExerciseIndex >= state.currentExercises.length) {
        finishFiche();
    } else {
        showExercise();
    }
}

function finishFiche() {
    stopTimer();
    const correctCount = state.sessionResults.filter(r => r.isCorrect).length;
    const totalCount = state.sessionResults.length;
    const percentage = Math.round((correctCount / totalCount) * 100);
    const difficulty = state.currentFiche.difficulty || 1;

    // Calculate stars
    let stars = 0;
    if (percentage >= 90) stars = 3;
    else if (percentage >= 70) stars = 2;
    else if (percentage >= 50) stars = 1;

    // Calculate XP based on difficulty and performance
    let xpGained = Math.round(10 * difficulty * (percentage / 100));
    if (percentage === 100) xpGained += 20; // Perfect bonus
    if (state.timerSeconds < 60 && percentage >= 70) xpGained += 10; // Speed bonus

    // Save progress
    const leveledUp = saveProgress(state.currentSubject, state.currentFiche.id, percentage, correctCount, stars, xpGained);

    // Show modal
    const modal = document.getElementById('result-modal');
    document.getElementById('modal-title').textContent = percentage >= 50 ? 'Bravo ! 🎉' : 'Continue ! 💪';
    document.getElementById('result-stars').innerHTML = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);
    document.getElementById('result-message').textContent = `${correctCount} bonnes réponses sur ${totalCount}`;
    document.getElementById('result-score').textContent = `Score : ${percentage}%`;
    document.getElementById('xp-gained').textContent = `+${xpGained} XP`;

    modal.classList.add('active');
    if (percentage >= 70) playSound('celebration');

    // Check for level up
    if (leveledUp) {
        setTimeout(() => showLevelUpModal(leveledUp), 1500);
    }

    // Check for badges
    checkAndAwardBadges();
}

function closeModal() {
    document.getElementById('result-modal').classList.remove('active');
    showSubjectView(state.currentSubject);
}

// ==================== PROGRESS & XP ====================
function loadProgress() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
        const defaultProgress = {
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
            challengesCompleted: []
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProgress));
    }
}

function getProgress() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
}

function saveProgress(subjectKey, ficheId, percentage, correctCount, stars, xpGained) {
    const progress = getProgress();
    if (!progress.subjects[subjectKey]) progress.subjects[subjectKey] = {};

    const previouslyCompleted = progress.subjects[subjectKey][ficheId]?.completed || false;
    const previousStars = progress.subjects[subjectKey][ficheId]?.stars || 0;

    progress.subjects[subjectKey][ficheId] = {
        completed: percentage >= 50,
        score: percentage,
        stars: Math.max(stars, previousStars),
        lastAttempt: new Date().toISOString()
    };

    if (!previouslyCompleted && percentage >= 50) progress.totalCompleted++;
    if (stars > previousStars) progress.totalStars += (stars - previousStars);

    progress.correctAnswers += correctCount;
    progress.totalAnswers += state.currentExercises.length;

    // XP and Level
    const oldLevel = progress.level;
    progress.xp += xpGained;
    progress.level = calculateLevel(progress.xp);

    // Daily stats
    const today = new Date().toDateString();
    if (progress.lastActiveDate !== today) {
        progress.exercisesToday = 1;
    } else {
        progress.exercisesToday++;
    }
    progress.lastActiveDate = today;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    updateHomeStats();
    updateSubjectCards();
    updateLevelDisplay();

    return progress.level > oldLevel ? progress.level : null;
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
}

function updateLevelDisplay() {
    const progress = getProgress();
    const currentLevel = LEVELS_DATA.find(l => l.level === progress.level) || LEVELS_DATA[0];
    const nextLevel = LEVELS_DATA.find(l => l.level === progress.level + 1);

    document.querySelector('.level-icon').textContent = currentLevel.icon;
    document.querySelector('.level-name').textContent = `Niv. ${progress.level}`;

    if (nextLevel) {
        const xpInLevel = progress.xp - currentLevel.xpRequired;
        const xpNeeded = nextLevel.xpRequired - currentLevel.xpRequired;
        const percentage = Math.min(100, (xpInLevel / xpNeeded) * 100);
        document.getElementById('xp-fill').style.width = `${percentage}%`;
    } else {
        document.getElementById('xp-fill').style.width = '100%';
    }
}

function checkStreak() {
    const progress = getProgress();
    const today = new Date().toDateString();
    const lastActive = progress.lastActiveDate;

    if (!lastActive) {
        progress.streak = 0;
    } else if (lastActive !== today) {
        const lastDate = new Date(lastActive);
        const todayDate = new Date(today);
        const diffDays = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24));
        if (diffDays === 1) progress.streak++;
        else if (diffDays > 1) progress.streak = 0;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function updateHomeStats() {
    const progress = getProgress();
    document.getElementById('today-exercises').textContent = progress.exercisesToday || 0;
    document.getElementById('streak-days').textContent = progress.streak || 0;
    document.getElementById('total-xp').textContent = progress.xp || 0;
    updateSubjectCards();
}

function updateSubjectCards() {
    const progress = getProgress();
    const subjects = getSubjectsData();

    document.querySelectorAll('.subject-card').forEach(card => {
        const subjectKey = card.dataset.subject;
        const subject = subjects[subjectKey];
        const subjectProgress = progress.subjects[subjectKey] || {};

        if (subject) {
            const totalFiches = subject.fiches.length;
            const completedFiches = Object.values(subjectProgress).filter(f => f.completed).length;
            const percentage = Math.round((completedFiches / totalFiches) * 100);

            card.querySelector('.progress-fill').style.width = `${percentage}%`;
            card.querySelector('.progress-text').textContent = `${percentage}%`;
        }
    });
}

function updateProgressView() {
    const progress = getProgress();
    let totalFiches = 0, completedFiches = 0;

    // Count from both CE1 and CE2
    [SUBJECTS_DATA, SUBJECTS_DATA_CE2].forEach(subjects => {
        Object.keys(subjects).forEach(key => {
            const subject = subjects[key];
            totalFiches += subject.fiches.length;
            const subjectProgress = progress.subjects[key] || {};
            completedFiches += Object.values(subjectProgress).filter(f => f.completed).length;
        });
    });

    const globalPercentage = totalFiches > 0 ? Math.round((completedFiches / totalFiches) * 100) : 0;

    const circle = document.getElementById('global-progress-circle');
    const circumference = 2 * Math.PI * 45;
    circle.style.strokeDashoffset = circumference - (globalPercentage / 100) * circumference;

    const svg = circle.closest('svg');
    if (!svg.querySelector('defs')) {
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        defs.innerHTML = `<linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:#d4a853"/><stop offset="100%" style="stop-color:#e67e22"/></linearGradient>`;
        svg.insertBefore(defs, svg.firstChild);
    }

    document.getElementById('global-percentage').textContent = `${globalPercentage}%`;
    document.getElementById('total-completed').textContent = progress.totalCompleted || 0;
    document.getElementById('total-stars').textContent = progress.totalStars || 0;
    document.getElementById('total-xp-stat').textContent = progress.xp || 0;

    const accuracy = progress.totalAnswers > 0 ? Math.round((progress.correctAnswers / progress.totalAnswers) * 100) : 0;
    document.getElementById('accuracy-rate').textContent = `${accuracy}%`;

    // Subject progress list
    const list = document.getElementById('subject-progress-list');
    list.innerHTML = '';

    [SUBJECTS_DATA, SUBJECTS_DATA_CE2].forEach(subjects => {
        Object.keys(subjects).forEach(key => {
            const subject = subjects[key];
            const subjectProgress = progress.subjects[key] || {};
            const total = subject.fiches.length;
            const completed = Object.values(subjectProgress).filter(f => f.completed).length;
            const percentage = Math.round((completed / total) * 100);

            const item = document.createElement('div');
            item.className = 'subject-progress-item';
            item.innerHTML = `
                <span class="icon">${subject.icon}</span>
                <div class="info">
                    <h4>${subject.name}</h4>
                    <div class="progress-bar"><div class="progress-fill" style="width: ${percentage}%"></div></div>
                </div>
                <span class="percentage">${percentage}%</span>
            `;
            list.appendChild(item);
        });
    });
}

// ==================== BADGES ====================
function updateBadgesView() {
    const progress = getProgress();
    const container = document.getElementById('badges-container');
    container.innerHTML = '';

    BADGES_DATA.forEach(badge => {
        const unlocked = progress.badges?.includes(badge.id);
        const card = document.createElement('div');
        card.className = `badge-card ${unlocked ? 'unlocked' : 'locked'}`;
        card.innerHTML = `
            <span class="badge-icon">${badge.icon}</span>
            <div class="badge-name">${badge.name}</div>
            <div class="badge-desc">${badge.description}</div>
        `;
        container.appendChild(card);
    });
}

function checkAndAwardBadges() {
    const progress = getProgress();
    if (!progress.badges) progress.badges = [];

    BADGES_DATA.forEach(badge => {
        if (progress.badges.includes(badge.id)) return;

        let earned = false;
        const c = badge.condition;

        if (c.type === 'fiches_completed' && progress.totalCompleted >= c.count) earned = true;
        if (c.type === 'stars' && progress.totalStars >= c.count) earned = true;
        if (c.type === 'streak' && progress.streak >= c.count) earned = true;
        if (c.type === 'perfect_scores') {
            let perfectCount = 0;
            Object.values(progress.subjects).forEach(subj => {
                Object.values(subj).forEach(f => { if (f.score === 100) perfectCount++; });
            });
            if (perfectCount >= c.count) earned = true;
        }

        if (earned) {
            progress.badges.push(badge.id);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
            showBadgeModal(badge);
        }
    });
}

function showBadgeModal(badge) {
    document.getElementById('badge-unlock-icon').textContent = badge.icon;
    document.getElementById('badge-unlock-name').textContent = badge.name;
    document.getElementById('badge-unlock-desc').textContent = badge.description;
    document.getElementById('badge-modal').classList.add('active');
    playSound('celebration');
}

// ==================== CHALLENGES ====================
function updateChallengesView() {
    const progress = getProgress();

    ['daily', 'weekly', 'special'].forEach(type => {
        const container = document.getElementById(`${type}-challenges`);
        container.innerHTML = '';

        CHALLENGES_DATA[type].forEach(challenge => {
            const completed = progress.challengesCompleted?.includes(challenge.id);
            const hasSubject = challenge.subject ? true : false;
            const card = document.createElement('div');
            card.className = `challenge-card ${completed ? 'completed' : ''} ${hasSubject ? 'clickable' : ''}`;
            card.innerHTML = `
                <div class="challenge-card-icon">${challenge.icon}</div>
                <div class="challenge-card-info">
                    <h4>${challenge.name}</h4>
                    <p>${challenge.description}</p>
                </div>
                <div class="challenge-card-reward">+${challenge.reward} XP</div>
                ${hasSubject ? '<div class="challenge-go-btn">Commencer →</div>' : ''}
            `;

            // Add click handler to redirect to subject exercises
            if (hasSubject) {
                card.addEventListener('click', () => startChallengeExercises(challenge));
            }

            container.appendChild(card);
        });
    });
}

// Start exercises directly from a challenge
function startChallengeExercises(challenge) {
    const subjectKey = challenge.subject;
    const subjects = getSubjectsData();
    const subject = subjects[subjectKey];

    if (!subject || !subject.fiches || subject.fiches.length === 0) {
        showToast('Matière non disponible', 'error');
        return;
    }

    // Find the first incomplete fiche, or the first one if all completed
    const progress = getProgress();
    const subjectProgress = progress.subjects[subjectKey] || {};

    let ficheToStart = subject.fiches.find(f => !subjectProgress[f.id]?.completed);
    if (!ficheToStart) {
        ficheToStart = subject.fiches[0]; // Start from beginning if all completed
    }

    // Show toast and start the fiche
    showToast(`Défi "${challenge.name}" lancé !`, 'success');
    startFiche(subjectKey, ficheToStart);
}

// ==================== SETTINGS ====================
function initSettings() {
    const apiKeyInput = document.getElementById('openai-api-key');
    const savedKey = localStorage.getItem('openai_api_key');
    if (savedKey) {
        apiKeyInput.value = savedKey;
        document.getElementById('ai-generator').style.display = 'block';
    }

    document.getElementById('save-api-key').addEventListener('click', () => {
        const key = apiKeyInput.value.trim();
        if (key) {
            localStorage.setItem('openai_api_key', key);
            document.getElementById('ai-generator').style.display = 'block';
            showToast('Clé API enregistrée !', 'success');
        }
    });

    // Populate AI subject select
    const select = document.getElementById('ai-subject');
    [SUBJECTS_DATA, SUBJECTS_DATA_CE2].forEach(subjects => {
        Object.keys(subjects).forEach(key => {
            const opt = document.createElement('option');
            opt.value = key;
            opt.textContent = subjects[key].name;
            select.appendChild(opt);
        });
    });

    document.getElementById('generate-content').addEventListener('click', generateContent);

    document.getElementById('reset-progress').addEventListener('click', () => {
        if (confirm('Es-tu sûr de vouloir effacer tous tes progrès ?')) {
            localStorage.removeItem(STORAGE_KEY);
            loadProgress();
            updateHomeStats();
            updateProgressView();
            updateBadgesView();
            updateLevelDisplay();
            showToast('Progrès réinitialisés', 'success');
        }
    });

    document.getElementById('export-data').addEventListener('click', () => {
        const data = { progress: getProgress(), exportDate: new Date().toISOString() };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `rayan_champion_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        showToast('Données exportées !', 'success');
    });
}

async function generateContent() {
    const apiKey = localStorage.getItem('openai_api_key');
    if (!apiKey) { showToast('Entrez votre clé API', 'error'); return; }

    const subject = document.getElementById('ai-subject').value;
    const prompt = document.getElementById('ai-prompt').value.trim();
    const resultDiv = document.getElementById('ai-result');

    if (!prompt) { showToast('Décris le type d\'exercice', 'error'); return; }

    resultDiv.innerHTML = '<div class="loading"></div> Génération...';

    const systemPrompt = `Tu es un expert en création d'exercices pour élèves CE1-CE2 (6-8 ans).
Génère des exercices au format JSON uniquement. Format:
[{"type":"input","question":"5 + 3 = ?","answer":"8"}]
ou
[{"type":"qcm","question":"Combien font 6 + 4 ?","options":["8","9","10","11"],"answer":"10"}]
Génère exactement 5 exercices adaptés au niveau demandé.`;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
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
        const jsonMatch = content.match(/\[[\s\S]*\]/);

        if (jsonMatch) {
            const exercises = JSON.parse(jsonMatch[0]);
            resultDiv.innerHTML = `<strong>Exercices générés :</strong>\n${JSON.stringify(exercises, null, 2)}`;
            showToast('Contenu généré !', 'success');
        } else {
            resultDiv.innerHTML = content;
        }
    } catch (error) {
        console.error(error);
        resultDiv.innerHTML = 'Erreur. Vérifiez votre clé API.';
        showToast('Erreur de génération', 'error');
    }
}

// ==================== UTILITIES ====================
function speakText(text) {
    if (!state.speechSynthesis) return;
    state.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR';
    utterance.rate = 0.8;
    state.speechSynthesis.speak(utterance);
}

function playSound(type) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    if (type === 'correct') {
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2);
    } else if (type === 'incorrect') {
        oscillator.frequency.setValueAtTime(349.23, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(311.13, audioContext.currentTime + 0.15);
    } else if (type === 'celebration') {
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2);
        oscillator.frequency.setValueAtTime(1046.50, audioContext.currentTime + 0.3);
    }

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.4);
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

function levenshteinDistance(str1, str2) {
    const m = str1.length, n = str2.length;
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            dp[i][j] = str1[i - 1] === str2[j - 1] ? dp[i - 1][j - 1] : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
        }
    }
    return dp[m][n];
}

