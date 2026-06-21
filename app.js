// Rayan CE1 Learning Application - Main Logic

// State management
const state = {
    currentView: 'home',
    currentSubject: null,
    currentFiche: null,
    currentExerciseIndex: 0,
    currentExercises: [],
    sessionResults: [],
    speechSynthesis: window.speechSynthesis
};

// Progress data stored in localStorage
const STORAGE_KEY = 'rayan_ce1_progress';

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    loadProgress();
    initNavigation();
    initSubjectCards();
    updateHomeStats();
    updateProgressView();
    initSettings();
    checkStreak();
});

// ==================== NAVIGATION ====================

function initNavigation() {
    // Main nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.dataset.view;
            navigateTo(view);
        });
    });

    // Back buttons
    document.getElementById('back-to-home').addEventListener('click', () => {
        navigateTo('home');
    });

    document.getElementById('back-to-subject').addEventListener('click', () => {
        showSubjectView(state.currentSubject);
    });

    // Exercise buttons
    document.getElementById('check-answer').addEventListener('click', checkAnswer);
    document.getElementById('next-question').addEventListener('click', nextQuestion);

    // Modal
    document.getElementById('modal-close').addEventListener('click', closeModal);
}

function navigateTo(viewName) {
    // Update nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.view === viewName);
    });

    // Update views
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });

    if (viewName === 'home') {
        document.getElementById('home-view').classList.add('active');
        updateHomeStats();
    } else if (viewName === 'progress') {
        document.getElementById('progress-view').classList.add('active');
        updateProgressView();
    } else if (viewName === 'settings') {
        document.getElementById('settings-view').classList.add('active');
    }

    state.currentView = viewName;
}

// ==================== SUBJECTS ====================

function initSubjectCards() {
    document.querySelectorAll('.subject-card').forEach(card => {
        card.addEventListener('click', () => {
            const subject = card.dataset.subject;
            showSubjectView(subject);
        });
    });
}

function showSubjectView(subjectKey) {
    state.currentSubject = subjectKey;
    const subject = SUBJECTS_DATA[subjectKey];

    if (!subject) return;

    document.getElementById('subject-title').textContent = subject.name;

    const container = document.getElementById('fiches-container');
    container.innerHTML = '';

    const progress = getProgress();
    const subjectProgress = progress.subjects[subjectKey] || {};

    subject.fiches.forEach(fiche => {
        const ficheProgress = subjectProgress[fiche.id] || { completed: false, score: 0 };
        const card = document.createElement('div');
        card.className = `fiche-card ${ficheProgress.completed ? 'completed' : ''}`;
        card.innerHTML = `
            <div class="fiche-number">${fiche.id}</div>
            <div class="fiche-info">
                <h4>${fiche.title}</h4>
                <p>${fiche.description}</p>
            </div>
            <div class="fiche-status">
                ${ficheProgress.completed ? '✅' : '📝'}
            </div>
        `;
        card.addEventListener('click', () => startFiche(subjectKey, fiche));
        container.appendChild(card);
    });

    // Show subject view
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById('subject-view').classList.add('active');

    // Update nav
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
}

// ==================== EXERCISES ====================

function startFiche(subjectKey, fiche) {
    state.currentSubject = subjectKey;
    state.currentFiche = fiche;
    state.currentExerciseIndex = 0;
    state.currentExercises = [...fiche.exercises];
    state.sessionResults = [];

    // Shuffle exercises for variety (optional)
    // shuffleArray(state.currentExercises);

    document.getElementById('exercise-title').textContent = fiche.title;
    document.getElementById('total-questions').textContent = state.currentExercises.length;

    showExercise();

    // Show exercise view
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById('exercise-view').classList.add('active');
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

    if (exercise.type === 'dictee') {
        container.innerHTML = `
            <button class="dictee-audio-btn" onclick="speakText('${exercise.text.replace(/'/g, "\\'")}')">
                🔊 Écouter la dictée
            </button>
            <p style="color: var(--text-secondary); margin-bottom: 1rem;">Indice: ${exercise.hint}</p>
            <textarea class="dictee-textarea" id="answer-input" placeholder="Écris ce que tu entends..."></textarea>
        `;
    } else if (exercise.type === 'qcm') {
        container.innerHTML = `
            <p class="question-text">${exercise.question}</p>
            <div class="answer-options">
                ${exercise.options.map((opt, i) => `
                    <button class="option-btn" data-value="${opt}">${opt}</button>
                `).join('')}
            </div>
        `;

        container.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                container.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
            });
        });
    } else {
        // Input type
        container.innerHTML = `
            <p class="question-text">${exercise.question}</p>
            <input type="text" class="answer-input" id="answer-input" autocomplete="off" placeholder="Ta réponse...">
        `;

        // Focus on input
        setTimeout(() => {
            const input = document.getElementById('answer-input');
            if (input) input.focus();
        }, 100);

        // Allow Enter key to check answer
        const input = document.getElementById('answer-input');
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    checkAnswer();
                }
            });
        }
    }
}

function checkAnswer() {
    const exercise = state.currentExercises[state.currentExerciseIndex];
    const feedbackContainer = document.getElementById('feedback-container');
    let userAnswer = '';
    let isCorrect = false;

    if (exercise.type === 'qcm') {
        const selected = document.querySelector('.option-btn.selected');
        if (!selected) {
            showToast('Sélectionne une réponse !', 'error');
            return;
        }
        userAnswer = selected.dataset.value;
        isCorrect = userAnswer === exercise.answer;

        // Mark correct/incorrect
        document.querySelectorAll('.option-btn').forEach(btn => {
            if (btn.dataset.value === exercise.answer) {
                btn.classList.add('correct');
            } else if (btn.classList.contains('selected')) {
                btn.classList.add('incorrect');
            }
            btn.style.pointerEvents = 'none';
        });
    } else if (exercise.type === 'dictee') {
        userAnswer = document.getElementById('answer-input').value.trim().toLowerCase();
        const correctAnswer = exercise.text.toLowerCase();
        // For dictée, check similarity
        isCorrect = userAnswer === correctAnswer ||
                   levenshteinDistance(userAnswer, correctAnswer) <= 2;
    } else {
        userAnswer = document.getElementById('answer-input').value.trim();
        isCorrect = userAnswer.toLowerCase() === exercise.answer.toLowerCase();
    }

    // Store result
    state.sessionResults.push({
        question: exercise.question || exercise.text,
        userAnswer,
        correctAnswer: exercise.answer || exercise.text,
        isCorrect
    });

    // Show feedback
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
    const correctCount = state.sessionResults.filter(r => r.isCorrect).length;
    const totalCount = state.sessionResults.length;
    const percentage = Math.round((correctCount / totalCount) * 100);

    // Calculate stars
    let stars = 0;
    if (percentage >= 90) stars = 3;
    else if (percentage >= 70) stars = 2;
    else if (percentage >= 50) stars = 1;

    // Save progress
    saveProgress(state.currentSubject, state.currentFiche.id, percentage, correctCount);

    // Show modal
    const modal = document.getElementById('result-modal');
    document.getElementById('modal-title').textContent = percentage >= 50 ? 'Bravo ! 🎉' : 'Continue à t\'entraîner ! 💪';
    document.getElementById('result-stars').innerHTML = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);
    document.getElementById('result-message').textContent = `Tu as obtenu ${correctCount} bonnes réponses sur ${totalCount}`;
    document.getElementById('result-score').textContent = `Score : ${percentage}%`;

    modal.classList.add('active');

    // Play celebration sound if good score
    if (percentage >= 70) {
        playSound('celebration');
    }
}

function closeModal() {
    document.getElementById('result-modal').classList.remove('active');
    showSubjectView(state.currentSubject);
}

// ==================== PROGRESS ====================

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
            exercisesToday: 0
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProgress));
    }
}

function getProgress() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
}

function saveProgress(subjectKey, ficheId, percentage, correctCount) {
    const progress = getProgress();

    if (!progress.subjects[subjectKey]) {
        progress.subjects[subjectKey] = {};
    }

    const previouslyCompleted = progress.subjects[subjectKey][ficheId]?.completed || false;

    progress.subjects[subjectKey][ficheId] = {
        completed: percentage >= 50,
        score: percentage,
        lastAttempt: new Date().toISOString()
    };

    // Update stats
    if (!previouslyCompleted && percentage >= 50) {
        progress.totalCompleted++;
    }

    // Calculate stars
    let newStars = 0;
    if (percentage >= 90) newStars = 3;
    else if (percentage >= 70) newStars = 2;
    else if (percentage >= 50) newStars = 1;

    const previousStars = progress.subjects[subjectKey][ficheId]?.stars || 0;
    if (newStars > previousStars) {
        progress.totalStars += (newStars - previousStars);
        progress.subjects[subjectKey][ficheId].stars = newStars;
    }

    progress.correctAnswers += correctCount;
    progress.totalAnswers += state.currentExercises.length;

    // Update daily stats
    const today = new Date().toDateString();
    if (progress.lastActiveDate !== today) {
        progress.exercisesToday = 1;
    } else {
        progress.exercisesToday++;
    }
    progress.lastActiveDate = today;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));

    // Update UI
    updateHomeStats();
    updateSubjectCards();
}

function checkStreak() {
    const progress = getProgress();
    const today = new Date().toDateString();
    const lastActive = progress.lastActiveDate;

    if (!lastActive) {
        progress.streak = 0;
    } else if (lastActive === today) {
        // Same day, streak continues
    } else {
        const lastDate = new Date(lastActive);
        const todayDate = new Date(today);
        const diffDays = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
            progress.streak++;
        } else if (diffDays > 1) {
            progress.streak = 0;
        }
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function updateHomeStats() {
    const progress = getProgress();
    document.getElementById('today-exercises').textContent = progress.exercisesToday || 0;
    document.getElementById('streak-days').textContent = progress.streak || 0;

    updateSubjectCards();
}

function updateSubjectCards() {
    const progress = getProgress();

    document.querySelectorAll('.subject-card').forEach(card => {
        const subjectKey = card.dataset.subject;
        const subject = SUBJECTS_DATA[subjectKey];
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

    // Calculate global percentage
    let totalFiches = 0;
    let completedFiches = 0;

    Object.keys(SUBJECTS_DATA).forEach(key => {
        const subject = SUBJECTS_DATA[key];
        totalFiches += subject.fiches.length;

        const subjectProgress = progress.subjects[key] || {};
        completedFiches += Object.values(subjectProgress).filter(f => f.completed).length;
    });

    const globalPercentage = totalFiches > 0 ? Math.round((completedFiches / totalFiches) * 100) : 0;

    // Update circle
    const circle = document.getElementById('global-progress-circle');
    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (globalPercentage / 100) * circumference;
    circle.style.strokeDashoffset = offset;
    circle.style.stroke = 'url(#gradient)';

    // Add gradient definition if not exists
    const svg = circle.closest('svg');
    if (!svg.querySelector('defs')) {
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        defs.innerHTML = `
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#d4a853"/>
                <stop offset="100%" style="stop-color:#e67e22"/>
            </linearGradient>
        `;
        svg.insertBefore(defs, svg.firstChild);
    }

    document.getElementById('global-percentage').textContent = `${globalPercentage}%`;

    // Update stats
    document.getElementById('total-completed').textContent = progress.totalCompleted || 0;
    document.getElementById('total-stars').textContent = progress.totalStars || 0;

    const accuracy = progress.totalAnswers > 0
        ? Math.round((progress.correctAnswers / progress.totalAnswers) * 100)
        : 0;
    document.getElementById('accuracy-rate').textContent = `${accuracy}%`;

    // Update subject progress list
    const list = document.getElementById('subject-progress-list');
    list.innerHTML = '';

    Object.keys(SUBJECTS_DATA).forEach(key => {
        const subject = SUBJECTS_DATA[key];
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
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${percentage}%"></div>
                </div>
            </div>
            <span class="percentage">${percentage}%</span>
        `;
        list.appendChild(item);
    });
}

// ==================== SETTINGS ====================

function initSettings() {
    // API Key
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

    // Generate content
    document.getElementById('generate-content').addEventListener('click', generateContent);

    // Reset progress
    document.getElementById('reset-progress').addEventListener('click', () => {
        if (confirm('Es-tu sûr de vouloir effacer tous tes progrès ?')) {
            localStorage.removeItem(STORAGE_KEY);
            loadProgress();
            updateHomeStats();
            updateProgressView();
            showToast('Progrès réinitialisés', 'success');
        }
    });

    // Export data
    document.getElementById('export-data').addEventListener('click', () => {
        const data = {
            progress: getProgress(),
            exportDate: new Date().toISOString()
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `rayan_ce1_progress_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        showToast('Données exportées !', 'success');
    });
}

async function generateContent() {
    const apiKey = localStorage.getItem('openai_api_key');
    if (!apiKey) {
        showToast('Veuillez d\'abord entrer votre clé API', 'error');
        return;
    }

    const subject = document.getElementById('ai-subject').value;
    const prompt = document.getElementById('ai-prompt').value.trim();
    const resultDiv = document.getElementById('ai-result');

    if (!prompt) {
        showToast('Décris le type d\'exercice à générer', 'error');
        return;
    }

    resultDiv.innerHTML = '<div class="loading"></div> Génération en cours...';

    const systemPrompt = `Tu es un expert en création d'exercices pédagogiques pour les élèves de CE1 (6-7 ans) en France.
Génère des exercices au format JSON valide uniquement.
Le format doit être un tableau d'objets avec les propriétés suivantes:
- type: "input" pour réponse libre ou "qcm" pour choix multiples
- question: la question ou l'énoncé
- answer: la réponse correcte (pour input) ou la bonne option (pour qcm)
- options: tableau des options (uniquement pour qcm)

Exemples:
[{"type":"input","question":"5 + 3 = ?","answer":"8"}]
[{"type":"qcm","question":"Combien font 6 + 4 ?","options":["8","9","10","11"],"answer":"10"}]

Génère exactement 5 exercices adaptés au niveau CE1.`;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: `Génère des exercices de ${SUBJECTS_DATA[subject]?.name || subject} pour CE1 sur le thème: ${prompt}` }
                ],
                temperature: 0.7
            })
        });

        if (!response.ok) {
            throw new Error('Erreur API');
        }

        const data = await response.json();
        const content = data.choices[0].message.content;

        // Try to parse JSON from response
        const jsonMatch = content.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
            const exercises = JSON.parse(jsonMatch[0]);
            resultDiv.innerHTML = `<strong>Exercices générés :</strong>\n${JSON.stringify(exercises, null, 2)}`;

            // Option to add to subject
            const addBtn = document.createElement('button');
            addBtn.className = 'btn btn-primary';
            addBtn.style.marginTop = '1rem';
            addBtn.textContent = 'Ajouter à la matière';
            addBtn.onclick = () => addGeneratedExercises(subject, exercises, prompt);
            resultDiv.appendChild(addBtn);
        } else {
            resultDiv.innerHTML = `<strong>Réponse :</strong>\n${content}`;
        }

        showToast('Contenu généré avec succès !', 'success');
    } catch (error) {
        console.error(error);
        resultDiv.innerHTML = 'Erreur lors de la génération. Vérifiez votre clé API.';
        showToast('Erreur de génération', 'error');
    }
}

function addGeneratedExercises(subjectKey, exercises, title) {
    const subject = SUBJECTS_DATA[subjectKey];
    if (!subject) return;

    const newFiche = {
        id: subject.fiches.length + 1,
        title: title.substring(0, 30),
        description: 'Généré par IA',
        exercises: exercises
    };

    subject.fiches.push(newFiche);

    // Save to localStorage for persistence
    const customFiches = JSON.parse(localStorage.getItem('custom_fiches') || '{}');
    if (!customFiches[subjectKey]) customFiches[subjectKey] = [];
    customFiches[subjectKey].push(newFiche);
    localStorage.setItem('custom_fiches', JSON.stringify(customFiches));

    showToast('Exercices ajoutés !', 'success');
    document.getElementById('ai-result').innerHTML = '';
    document.getElementById('ai-prompt').value = '';
}

// Load custom fiches on startup
function loadCustomFiches() {
    const customFiches = JSON.parse(localStorage.getItem('custom_fiches') || '{}');
    Object.keys(customFiches).forEach(subjectKey => {
        if (SUBJECTS_DATA[subjectKey]) {
            customFiches[subjectKey].forEach(fiche => {
                // Ensure unique IDs
                fiche.id = SUBJECTS_DATA[subjectKey].fiches.length + 1;
                SUBJECTS_DATA[subjectKey].fiches.push(fiche);
            });
        }
    });
}

// Call on load
loadCustomFiches();

// ==================== UTILITIES ====================

function speakText(text) {
    if (!state.speechSynthesis) {
        showToast('La synthèse vocale n\'est pas disponible', 'error');
        return;
    }

    state.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR';
    utterance.rate = 0.8;
    utterance.pitch = 1;

    state.speechSynthesis.speak(utterance);
}

function playSound(type) {
    // Using simple audio feedback via Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    if (type === 'correct') {
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
        oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
    } else if (type === 'incorrect') {
        oscillator.frequency.setValueAtTime(349.23, audioContext.currentTime); // F4
        oscillator.frequency.setValueAtTime(311.13, audioContext.currentTime + 0.15); // D#4
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

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function levenshteinDistance(str1, str2) {
    const m = str1.length;
    const n = str2.length;
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
            }
        }
    }

    return dp[m][n];
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
