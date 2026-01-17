// Constants
const SELECTION_CLEAR_DELAY = 800;  // ms to wait before clearing incorrect selections
const FEEDBACK_CLEAR_DELAY = 2000;  // ms to wait before clearing feedback messages

// ============================================
// ENHANCED VISUAL EFFECTS SYSTEM
// ============================================

// Screen Flash Effects
function screenFlash(type = 'success') {
    const flash = document.createElement('div');
    flash.className = `screen-flash ${type}`;
    document.body.appendChild(flash);
    
    setTimeout(() => {
        flash.remove();
    }, 800);
}

// Spotlight Effect
function createSpotlight(x, y, duration = 2000) {
    const spotlight = document.createElement('div');
    spotlight.className = 'spotlight-effect';
    spotlight.style.left = x + 'px';
    spotlight.style.top = y + 'px';
    document.body.appendChild(spotlight);
    
    setTimeout(() => {
        spotlight.remove();
    }, duration);
}

// Particle System - Stars
function createStarBurst(x, y, count = 20) {
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'star-particle';
        star.style.left = x + 'px';
        star.style.top = y + 'px';
        
        const angle = (Math.PI * 2 * i) / count;
        const velocity = 100 + Math.random() * 100;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        star.style.setProperty('--vx', vx + 'px');
        star.style.setProperty('--vy', vy + 'px');
        
        document.body.appendChild(star);
        
        setTimeout(() => {
            star.remove();
        }, 1500);
    }
}

// Sparkle Effect on Element
function addSparkles(element, count = 10) {
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle-particle';
            sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
            sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 1000);
        }, i * 100);
    }
}

// Glow Pulse Effect
function glowPulse(element, color = 'cyan') {
    element.classList.add(`glow-pulse-${color}`);
    setTimeout(() => {
        element.classList.remove(`glow-pulse-${color}`);
    }, 2000);
}

// Shake Animation
function shakeElement(element) {
    element.classList.add('shake-animation');
    setTimeout(() => {
        element.classList.remove('shake-animation');
    }, 600);
}

// Victory Ripple Effect
function victoryRipple() {
    const ripple = document.createElement('div');
    ripple.className = 'victory-ripple';
    document.body.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 2000);
}

// Floating Text Effect
function floatingText(text, x, y, color = '#FFD700') {
    const floater = document.createElement('div');
    floater.className = 'floating-text';
    floater.textContent = text;
    floater.style.left = x + 'px';
    floater.style.top = y + 'px';
    floater.style.color = color;
    document.body.appendChild(floater);
    
    setTimeout(() => {
        floater.remove();
    }, 2000);
}

// ============================================
// STATISTICS & LEADERBOARD SYSTEM
// ============================================

const STATS_KEY = 'priceIsRightStats';
const THEME_KEY = 'priceIsRightTheme';

// ============================================
// THEME SYSTEM
// ============================================

// Initialize theme on page load
function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY) || 'party';
    applyTheme(savedTheme);
}

// Change and save theme
function changeTheme(theme) {
    localStorage.setItem(THEME_KEY, theme);
    applyTheme(theme);
}

// Apply theme to body and update UI
function applyTheme(theme) {
    // Remove all theme classes
    document.body.classList.remove('theme-party', 'theme-light', 'theme-dark');
    
    // Add new theme class
    if (theme !== 'party') {
        document.body.classList.add(`theme-${theme}`);
    }
    
    // Update active button
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.theme === theme) {
            btn.classList.add('active');
        }
    });
}

// Initialize or get stats from localStorage
function getStats() {
    const defaultStats = {
        bagGame: {
            gamesPlayed: 0,
            wins: 0,
            losses: 0,
            bestTries: null, // fewest tries to win
            currentStreak: 0,
            bestStreak: 0,
            totalGuesses: 0
        },
        pairGame: {
            gamesPlayed: 0,
            wins: 0,
            losses: 0,
            bestTime: null, // fastest time in seconds
            currentStreak: 0,
            bestStreak: 0,
            totalTime: 0
        },
        overallGames: 0,
        lastPlayed: null
    };
    
    const stored = localStorage.getItem(STATS_KEY);
    return stored ? JSON.parse(stored) : defaultStats;
}

function saveStats(stats) {
    stats.lastPlayed = new Date().toISOString();
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
}

function recordBagGameWin(triesUsed) {
    const stats = getStats();
    stats.bagGame.gamesPlayed++;
    stats.bagGame.wins++;
    stats.bagGame.totalGuesses += triesUsed;
    stats.bagGame.currentStreak++;
    stats.overallGames++;
    
    if (stats.bagGame.currentStreak > stats.bagGame.bestStreak) {
        stats.bagGame.bestStreak = stats.bagGame.currentStreak;
    }
    
    if (!stats.bagGame.bestTries || triesUsed < stats.bagGame.bestTries) {
        stats.bagGame.bestTries = triesUsed;
    }
    
    saveStats(stats);
}

function recordBagGameLoss() {
    const stats = getStats();
    stats.bagGame.gamesPlayed++;
    stats.bagGame.losses++;
    stats.bagGame.totalGuesses += 3; // used all tries
    stats.bagGame.currentStreak = 0;
    stats.overallGames++;
    saveStats(stats);
}

function recordPairGameWin(timeInSeconds) {
    const stats = getStats();
    stats.pairGame.gamesPlayed++;
    stats.pairGame.wins++;
    stats.pairGame.totalTime += timeInSeconds;
    stats.pairGame.currentStreak++;
    stats.overallGames++;
    
    if (stats.pairGame.currentStreak > stats.pairGame.bestStreak) {
        stats.pairGame.bestStreak = stats.pairGame.currentStreak;
    }
    
    if (!stats.pairGame.bestTime || timeInSeconds < stats.pairGame.bestTime) {
        stats.pairGame.bestTime = timeInSeconds;
    }
    
    saveStats(stats);
}

function resetStats() {
    if (confirm('Are you sure you want to reset all statistics? This cannot be undone!')) {
        localStorage.removeItem(STATS_KEY);
        alert('Statistics have been reset!');
        if (currentGame === 'stats') {
            showStats();
        }
    }
}

// ============================================
// CONFETTI ANIMATION SYSTEM
// ============================================

function createConfetti() {
    const colors = ['#FFD700', '#E10600', '#00E5FF', '#FF4F9A', '#3FFFD8', '#0033A0'];
    const confettiCount = 100;
    const container = document.body;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.cssText = `
            position: fixed;
            width: ${Math.random() * 10 + 5}px;
            height: ${Math.random() * 10 + 5}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}%;
            top: -10px;
            opacity: ${Math.random() * 0.8 + 0.2};
            transform: rotate(${Math.random() * 360}deg);
            animation: confettiFall ${Math.random() * 3 + 2}s linear forwards;
            z-index: 9999;
            pointer-events: none;
        `;
        container.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 5000);
    }
}

// Add confetti animation styles dynamically
const confettiStyles = document.createElement('style');
confettiStyles.textContent = `
    @keyframes confettiFall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
    
    .confetti-piece {
        box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    }
`;
document.head.appendChild(confettiStyles);

// Game state
let currentGame = null;
let selectedGameType = null;
let currentDifficulty = 'medium';

// Difficulty configurations
const difficultySettings = {
    bag: {
        easy: {
            tries: 5,
            tolerance: 10, // percentage
            minItems: 3,
            maxItems: 4,
            label: 'Easy',
            color: '#4CAF50'
        },
        medium: {
            tries: 3,
            tolerance: 5,
            minItems: 4,
            maxItems: 6,
            label: 'Medium',
            color: '#FF9800'
        },
        hard: {
            tries: 2,
            tolerance: 3,
            minItems: 6,
            maxItems: 8,
            label: 'Hard',
            color: '#F44336'
        },
        custom: {
            tries: 3,
            tolerance: 5,
            minItems: 4,
            maxItems: 6,
            label: 'Custom',
            color: '#9C27B0'
        }
    },
    pair: {
        easy: {
            pairs: 3,
            label: 'Easy',
            color: '#4CAF50'
        },
        medium: {
            pairs: 5,
            label: 'Medium',
            color: '#FF9800'
        },
        hard: {
            pairs: 7,
            label: 'Hard',
            color: '#F44336'
        },
        custom: {
            pairs: 5,
            label: 'Custom',
            color: '#9C27B0'
        }
    }
};

const CUSTOM_SETTINGS_KEY = 'priceIsRightCustomSettings';

let bagGameState = {
    items: [],
    totalPrice: 0,
    triesLeft: 3,
    gameOver: false,
    difficulty: 'medium'
};

let pairGameState = {
    items: [],
    selectedItem: null,
    selectedPrice: null,
    matchesFound: 0,
    totalPairs: 5,
    startTime: null,
    timerInterval: null,
    gameOver: false,
    difficulty: 'medium'
};

// Item database for "It's in the Bag"
const bagItems = [
    { name: "Milk", icon: "🥛", price: 3.99 },
    { name: "Bread", icon: "🍞", price: 2.49 },
    { name: "Eggs", icon: "🥚", price: 4.29 },
    { name: "Butter", icon: "🧈", price: 5.99 },
    { name: "Cheese", icon: "🧀", price: 6.49 },
    { name: "Apples", icon: "🍎", price: 4.99 },
    { name: "Bananas", icon: "🍌", price: 1.99 },
    { name: "Coffee", icon: "☕", price: 8.99 },
    { name: "Cereal", icon: "🥣", price: 4.79 },
    { name: "Orange Juice", icon: "🧃", price: 5.49 }
];

// Item database for "Pick a Pair"
const pairItems = [
    { name: "Television", icon: "📺", price: 599.99 },
    { name: "Laptop", icon: "💻", price: 899.99 },
    { name: "Smartphone", icon: "📱", price: 699.99 },
    { name: "Headphones", icon: "🎧", price: 149.99 },
    { name: "Camera", icon: "📷", price: 449.99 },
    { name: "Blender", icon: "🍹", price: 79.99 },
    { name: "Microwave", icon: "📟", price: 129.99 },
    { name: "Vacuum", icon: "🧹", price: 199.99 }
];

// Utility functions
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function formatPrice(price) {
    return price.toFixed(2);
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Navigation functions
function selectGameForDifficulty(gameType) {
    selectedGameType = gameType;
    document.getElementById('game-selection').style.display = 'none';
    document.getElementById('difficulty-selection').style.display = 'block';
    
    // Update difficulty screen title
    const gameName = gameType === 'bag' ? "It's in the Bag" : "Pick a Pair";
    document.getElementById('difficulty-game-name').textContent = `Choose difficulty for ${gameName}`;
    
    // Update difficulty descriptions
    if (gameType === 'bag') {
        document.getElementById('easy-features').innerHTML = `
            <p>• 5 attempts</p>
            <p>• ±10% margin</p>
            <p>• 3-4 items</p>
        `;
        document.getElementById('medium-features').innerHTML = `
            <p>• 3 attempts</p>
            <p>• ±5% margin</p>
            <p>• 4-6 items</p>
        `;
        document.getElementById('hard-features').innerHTML = `
            <p>• 2 attempts</p>
            <p>• ±3% margin</p>
            <p>• 6-8 items</p>
        `;
    } else {
        document.getElementById('easy-features').innerHTML = `
            <p>• 3 pairs to match</p>
            <p>• Relaxed pace</p>
            <p>• Quick games</p>
        `;
        document.getElementById('medium-features').innerHTML = `
            <p>• 5 pairs to match</p>
            <p>• Standard challenge</p>
            <p>• Balanced gameplay</p>
        `;
        document.getElementById('hard-features').innerHTML = `
            <p>• 7 pairs to match</p>
            <p>• More items</p>
            <p>• Maximum challenge</p>
        `;
    }
}

function startGameWithDifficulty(difficulty) {
    currentDifficulty = difficulty;
    document.getElementById('difficulty-selection').style.display = 'none';
    startGame(selectedGameType);
}

// ============================================
// CUSTOM DIFFICULTY FUNCTIONS
// ============================================

function showCustomDifficulty() {
    document.getElementById('difficulty-selection').style.display = 'none';
    document.getElementById('custom-difficulty-panel').style.display = 'block';
    
    // Update the title based on selected game
    const gameName = selectedGameType === 'bag' ? "It's in the Bag" : "Pick a Pair";
    document.getElementById('custom-game-name').textContent = `Configure your challenge for ${gameName}`;
    
    // Show/hide relevant settings
    if (selectedGameType === 'bag') {
        document.getElementById('bag-custom-settings').style.display = 'block';
        document.getElementById('pair-custom-settings').style.display = 'none';
    } else {
        document.getElementById('bag-custom-settings').style.display = 'none';
        document.getElementById('pair-custom-settings').style.display = 'block';
    }
    
    // Load saved custom settings or defaults
    loadCustomSettings();
}

function backToDifficultySelection() {
    document.getElementById('custom-difficulty-panel').style.display = 'none';
    document.getElementById('difficulty-selection').style.display = 'block';
}

function updateSliderValue(sliderId) {
    const slider = document.getElementById(sliderId + '-slider');
    const valueDisplay = document.getElementById(sliderId + '-value');
    
    if (sliderId === 'bag-tolerance') {
        valueDisplay.textContent = slider.value + '%';
    } else {
        valueDisplay.textContent = slider.value;
    }
}

function loadCustomSettings() {
    const saved = localStorage.getItem(CUSTOM_SETTINGS_KEY);
    let customSettings;
    
    if (saved) {
        customSettings = JSON.parse(saved);
    } else {
        // Use medium difficulty as defaults
        customSettings = {
            bagTries: 3,
            bagTolerance: 5,
            bagItems: 5,
            pairCount: 5
        };
    }
    
    // Set slider values
    document.getElementById('bag-tries-slider').value = customSettings.bagTries;
    document.getElementById('bag-tolerance-slider').value = customSettings.bagTolerance;
    document.getElementById('bag-items-slider').value = customSettings.bagItems;
    document.getElementById('pair-count-slider').value = customSettings.pairCount;
    
    // Update displays
    updateSliderValue('bag-tries');
    updateSliderValue('bag-tolerance');
    updateSliderValue('bag-items');
    updateSliderValue('pair-count');
}

function saveCustomSettings() {
    const customSettings = {
        bagTries: parseInt(document.getElementById('bag-tries-slider').value),
        bagTolerance: parseInt(document.getElementById('bag-tolerance-slider').value),
        bagItems: parseInt(document.getElementById('bag-items-slider').value),
        pairCount: parseInt(document.getElementById('pair-count-slider').value)
    };
    
    localStorage.setItem(CUSTOM_SETTINGS_KEY, JSON.stringify(customSettings));
    
    // Update the custom difficulty settings
    difficultySettings.bag.custom = {
        tries: customSettings.bagTries,
        tolerance: customSettings.bagTolerance,
        minItems: customSettings.bagItems,
        maxItems: customSettings.bagItems,
        label: 'Custom',
        color: '#9C27B0'
    };
    
    difficultySettings.pair.custom = {
        pairs: customSettings.pairCount,
        label: 'Custom',
        color: '#9C27B0'
    };
}

function resetCustomSettings() {
    // Reset to medium difficulty defaults
    document.getElementById('bag-tries-slider').value = 3;
    document.getElementById('bag-tolerance-slider').value = 5;
    document.getElementById('bag-items-slider').value = 5;
    document.getElementById('pair-count-slider').value = 5;
    
    updateSliderValue('bag-tries');
    updateSliderValue('bag-tolerance');
    updateSliderValue('bag-items');
    updateSliderValue('pair-count');
    
    saveCustomSettings();
}

function applyCustomDifficulty() {
    saveCustomSettings();
    currentDifficulty = 'custom';
    document.getElementById('custom-difficulty-panel').style.display = 'none';
    startGame(selectedGameType);
}

function startGame(gameType) {
    currentGame = gameType;
    
    if (gameType === 'bag') {
        document.getElementById('bag-game').style.display = 'block';
        initBagGame();
    } else if (gameType === 'pair') {
        document.getElementById('pair-game').style.display = 'block';
        initPairGame();
    }
}

function showStats() {
    currentGame = 'stats';
    document.getElementById('game-selection').style.display = 'none';
    document.getElementById('stats-panel').style.display = 'block';
    updateStatsDisplay();
}

function updateStatsDisplay() {
    const stats = getStats();
    
    // Overall
    document.getElementById('total-games').textContent = stats.overallGames;
    
    // It's in the Bag
    document.getElementById('bag-played').textContent = stats.bagGame.gamesPlayed;
    document.getElementById('bag-wins').textContent = stats.bagGame.wins;
    document.getElementById('bag-losses').textContent = stats.bagGame.losses;
    
    const bagWinRate = stats.bagGame.gamesPlayed > 0 
        ? Math.round((stats.bagGame.wins / stats.bagGame.gamesPlayed) * 100) 
        : 0;
    document.getElementById('bag-winrate').textContent = bagWinRate + '%';
    
    document.getElementById('bag-best').textContent = stats.bagGame.bestTries 
        ? `${stats.bagGame.bestTries} ${stats.bagGame.bestTries === 1 ? 'try' : 'tries'}`
        : '-';
    
    document.getElementById('bag-streak').textContent = stats.bagGame.currentStreak;
    document.getElementById('bag-best-streak').textContent = stats.bagGame.bestStreak;
    
    // Pick a Pair
    document.getElementById('pair-played').textContent = stats.pairGame.gamesPlayed;
    document.getElementById('pair-wins').textContent = stats.pairGame.wins;
    
    const pairWinRate = stats.pairGame.gamesPlayed > 0 
        ? Math.round((stats.pairGame.wins / stats.pairGame.gamesPlayed) * 100) 
        : 100;
    document.getElementById('pair-winrate').textContent = pairWinRate + '%';
    
    const avgTime = stats.pairGame.wins > 0 
        ? Math.round(stats.pairGame.totalTime / stats.pairGame.wins)
        : 0;
    document.getElementById('pair-avg').textContent = avgTime > 0 ? formatTime(avgTime) : '-';
    
    document.getElementById('pair-best').textContent = stats.pairGame.bestTime 
        ? formatTime(stats.pairGame.bestTime)
        : '-';
    
    document.getElementById('pair-streak').textContent = stats.pairGame.currentStreak;
    document.getElementById('pair-best-streak').textContent = stats.pairGame.bestStreak;
}

function backToMenu() {
    // Hide all game containers
    document.getElementById('bag-game').style.display = 'none';
    document.getElementById('pair-game').style.display = 'none';
    document.getElementById('stats-panel').style.display = 'none';
    document.getElementById('difficulty-selection').style.display = 'none';
    
    // Show game selection
    document.getElementById('game-selection').style.display = 'block';
    
    // Clear timers
    if (pairGameState.timerInterval) {
        clearInterval(pairGameState.timerInterval);
    }
    
    currentGame = null;
    selectedGameType = null;
}

// ============================================
// IT'S IN THE BAG GAME
// ============================================

function initBagGame() {
    // Get difficulty settings
    const settings = difficultySettings.bag[currentDifficulty];
    
    // Reset game state
    bagGameState = {
        items: [],
        totalPrice: 0,
        triesLeft: settings.tries,
        gameOver: false,
        difficulty: currentDifficulty
    };
    
    // Update difficulty badge
    const badge = document.getElementById('bag-difficulty-badge');
    badge.textContent = settings.label;
    badge.style.background = settings.color;
    
    // Update instructions
    const instructions = document.querySelector('#bag-game .game-instructions');
    instructions.textContent = `Guess the total price of all items! You have ${settings.tries} ${settings.tries === 1 ? 'try' : 'tries'}. (±${settings.tolerance}% margin)`;
    
    // Select random items based on difficulty
    const numItems = Math.floor(Math.random() * (settings.maxItems - settings.minItems + 1)) + settings.minItems;
    const shuffled = shuffleArray(bagItems);
    bagGameState.items = shuffled.slice(0, numItems);
    
    // Calculate total price
    bagGameState.totalPrice = bagGameState.items.reduce((sum, item) => sum + item.price, 0);
    
    // Display items
    displayBagItems();
    
    // Reset UI
    document.getElementById('bag-tries').textContent = bagGameState.triesLeft;
    document.getElementById('bag-total').textContent = '$???';
    document.getElementById('bag-guess').value = '';
    document.getElementById('bag-feedback').innerHTML = '';
    document.getElementById('bag-result').innerHTML = '';
    document.getElementById('bag-guess').disabled = false;
}

function displayBagItems() {
    const container = document.getElementById('bag-items');
    container.innerHTML = '';
    
    bagGameState.items.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.className = 'item-card';
        itemCard.innerHTML = `
            <div class="item-icon">${item.icon}</div>
            <div class="item-name">${item.name}</div>
        `;
        container.appendChild(itemCard);
    });
}

function submitBagGuess() {
    if (bagGameState.gameOver) return;
    
    const guessInput = document.getElementById('bag-guess');
    const guess = parseFloat(guessInput.value);
    
    if (isNaN(guess) || guess <= 0) {
        showBagFeedback('Please enter a valid price!', 'incorrect');
        return;
    }
    
    bagGameState.triesLeft--;
    document.getElementById('bag-tries').textContent = bagGameState.triesLeft;
    
    const difference = Math.abs(guess - bagGameState.totalPrice);
    const percentDiff = (difference / bagGameState.totalPrice) * 100;
    
    // Get tolerance from difficulty settings
    const settings = difficultySettings.bag[currentDifficulty];
    
    // Check if guess is close enough based on difficulty
    if (percentDiff <= settings.tolerance) {
        winBagGame();
    } else if (bagGameState.triesLeft > 0) {
        // Give hints
        if (guess > bagGameState.totalPrice) {
            if (percentDiff > 20) {
                showBagFeedback('Way too high! Try a much lower price.', 'incorrect');
            } else {
                showBagFeedback('Too high! Lower your guess.', 'hint');
            }
        } else {
            if (percentDiff > 20) {
                showBagFeedback('Way too low! Try a much higher price.', 'incorrect');
            } else {
                showBagFeedback('Too low! Raise your guess.', 'hint');
            }
        }
    } else {
        loseBagGame();
    }
}

function showBagFeedback(message, type) {
    const feedback = document.getElementById('bag-feedback');
    feedback.textContent = message;
    feedback.className = `feedback ${type}`;
}

function winBagGame() {
    bagGameState.gameOver = true;
    document.getElementById('bag-guess').disabled = true;
    document.getElementById('bag-total').textContent = `$${formatPrice(bagGameState.totalPrice)}`;
    
    // Record win statistics
    const triesUsed = 3 - bagGameState.triesLeft + 1;
    recordBagGameWin(triesUsed);
    
    // ===== ENHANCED VISUAL EFFECTS =====
    // Trigger confetti celebration
    createConfetti();
    
    // Screen flash effect
    screenFlash('success');
    
    // Victory ripple from center
    victoryRipple();
    
    // Star burst at center of screen
    setTimeout(() => {
        createStarBurst(window.innerWidth / 2, window.innerHeight / 2, 30);
    }, 200);
    
    // Spotlight effect
    setTimeout(() => {
        createSpotlight(window.innerWidth / 2, window.innerHeight / 2, 2000);
    }, 400);
    
    // Floating "WINNER!" text
    setTimeout(() => {
        floatingText('WINNER!', window.innerWidth / 2, window.innerHeight / 2, '#FFD700');
    }, 600);
    
    // Add sparkles to result container
    const result = document.getElementById('bag-result');
    result.className = 'result win';
    result.innerHTML = `
        <h3>🎉 Congratulations! You Win! 🎉</h3>
        <p>The actual total was <strong>$${formatPrice(bagGameState.totalPrice)}</strong></p>
        <p>You guessed it correctly!</p>
        <button class="play-again-btn" onclick="initBagGame()">Play Again</button>
    `;
    
    setTimeout(() => {
        addSparkles(result, 15);
        glowPulse(result, 'yellow');
    }, 800);
    
    showBagFeedback('', '');
}

function loseBagGame() {
    bagGameState.gameOver = true;
    document.getElementById('bag-guess').disabled = true;
    document.getElementById('bag-total').textContent = `$${formatPrice(bagGameState.totalPrice)}`;
    
    // Record loss statistics
    recordBagGameLoss();
    
    // ===== ENHANCED VISUAL EFFECTS =====
    // Screen flash for loss
    screenFlash('error');
    
    // Shake the game container
    const gameContainer = document.getElementById('bag-game');
    shakeElement(gameContainer);
    
    const result = document.getElementById('bag-result');
    result.className = 'result lose';
    result.innerHTML = `
        <h3>Sorry, you're out of tries!</h3>
        <p>The actual total was <strong>$${formatPrice(bagGameState.totalPrice)}</strong></p>
        <p>Better luck next time!</p>
        <button class="play-again-btn" onclick="initBagGame()">Try Again</button>
    `;
    
    // Glow pulse effect on result
    setTimeout(() => {
        glowPulse(result, 'red');
    }, 300);
    
    showBagFeedback('', '');
}

// ============================================
// PICK A PAIR GAME
// ============================================

function initPairGame() {
    // Get difficulty settings
    const settings = difficultySettings.pair[currentDifficulty];
    
    // Reset game state
    pairGameState = {
        items: [],
        selectedItem: null,
        selectedPrice: null,
        matchesFound: 0,
        totalPairs: settings.pairs,
        startTime: Date.now(),
        timerInterval: null,
        gameOver: false,
        difficulty: currentDifficulty
    };
    
    // Update difficulty badge
    const badge = document.getElementById('pair-difficulty-badge');
    badge.textContent = settings.label;
    badge.style.background = settings.color;
    
    // Update instructions
    const instructions = document.querySelector('#pair-game .game-instructions');
    instructions.textContent = `Match all ${settings.pairs} pairs! Click an item, then click its price.`;
    
    // Select random items for pairing based on difficulty
    const shuffled = shuffleArray(pairItems);
    pairGameState.items = shuffled.slice(0, settings.pairs);
    
    // Display items and prices
    displayPairItems();
    displayPairPrices();
    
    // Reset UI
    document.getElementById('pair-matches').textContent = `0 / ${pairGameState.totalPairs}`;
    document.getElementById('pair-feedback').innerHTML = '';
    document.getElementById('pair-result').innerHTML = '';
    
    // Start timer
    startPairTimer();
}

function displayPairItems() {
    const container = document.getElementById('pair-items');
    container.innerHTML = '';
    
    pairGameState.items.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'pair-item';
        itemDiv.dataset.index = index;
        itemDiv.innerHTML = `${item.icon} ${item.name}`;
        itemDiv.onclick = () => selectPairItem(index);
        container.appendChild(itemDiv);
    });
}

function displayPairPrices() {
    const container = document.getElementById('pair-prices');
    container.innerHTML = '';
    
    // Shuffle prices for display
    const prices = shuffleArray(pairGameState.items.map((item, index) => ({
        price: item.price,
        originalIndex: index
    })));
    
    prices.forEach(priceObj => {
        const priceDiv = document.createElement('div');
        priceDiv.className = 'pair-price';
        priceDiv.dataset.index = priceObj.originalIndex;
        priceDiv.textContent = `$${formatPrice(priceObj.price)}`;
        priceDiv.onclick = () => selectPairPrice(priceObj.originalIndex);
        container.appendChild(priceDiv);
    });
}

function selectPairItem(index) {
    if (pairGameState.gameOver) return;
    
    // Check if already matched
    const itemDiv = document.querySelector(`.pair-item[data-index="${index}"]`);
    if (itemDiv.classList.contains('matched')) return;
    
    // Deselect previous selection
    document.querySelectorAll('.pair-item').forEach(el => el.classList.remove('selected'));
    
    // Select this item
    itemDiv.classList.add('selected');
    pairGameState.selectedItem = index;
    
    // Check for match if price is also selected
    if (pairGameState.selectedPrice !== null) {
        checkPairMatch();
    }
}

function selectPairPrice(index) {
    if (pairGameState.gameOver) return;
    
    // Check if already matched
    const priceDiv = document.querySelector(`.pair-price[data-index="${index}"]`);
    if (priceDiv.classList.contains('matched')) return;
    
    // Deselect previous selection
    document.querySelectorAll('.pair-price').forEach(el => el.classList.remove('selected'));
    
    // Select this price
    priceDiv.classList.add('selected');
    pairGameState.selectedPrice = index;
    
    // Check for match if item is also selected
    if (pairGameState.selectedItem !== null) {
        checkPairMatch();
    }
}

function checkPairMatch() {
    const itemIndex = pairGameState.selectedItem;
    const priceIndex = pairGameState.selectedPrice;
    
    if (itemIndex === priceIndex) {
        // Match found!
        const itemDiv = document.querySelector(`.pair-item[data-index="${itemIndex}"]`);
        const priceDiv = document.querySelector(`.pair-price[data-index="${priceIndex}"]`);
        
        itemDiv.classList.remove('selected');
        itemDiv.classList.add('matched');
        priceDiv.classList.remove('selected');
        priceDiv.classList.add('matched');
        
        // ===== ENHANCED VISUAL EFFECTS =====
        // Glow pulse on matched items
        glowPulse(itemDiv, 'cyan');
        glowPulse(priceDiv, 'cyan');
        
        // Sparkle effect on matched items
        const itemRect = itemDiv.getBoundingClientRect();
        const priceRect = priceDiv.getBoundingClientRect();
        addSparkles(itemDiv, 5);
        addSparkles(priceDiv, 5);
        
        // Small star burst at match location
        setTimeout(() => {
            createStarBurst(itemRect.left + itemRect.width / 2, itemRect.top + itemRect.height / 2, 8);
            createStarBurst(priceRect.left + priceRect.width / 2, priceRect.top + priceRect.height / 2, 8);
        }, 100);
        
        pairGameState.matchesFound++;
        document.getElementById('pair-matches').textContent = 
            `${pairGameState.matchesFound} / ${pairGameState.totalPairs}`;
        
        showPairFeedback('✓ Correct match!', 'correct');
        
        // Check if game is won
        if (pairGameState.matchesFound === pairGameState.totalPairs) {
            winPairGame();
        }
    } else {
        // No match
        showPairFeedback('✗ Not a match! Try again.', 'incorrect');
        
        // ===== ENHANCED VISUAL EFFECTS =====
        // Shake the incorrect selections
        const itemDiv = document.querySelector(`.pair-item[data-index="${itemIndex}"]`);
        const priceDiv = document.querySelector(`.pair-price[data-index="${priceIndex}"]`);
        shakeElement(itemDiv);
        shakeElement(priceDiv);
        
        // Deselect after a brief delay
        setTimeout(() => {
            document.querySelectorAll('.pair-item, .pair-price').forEach(el => {
                el.classList.remove('selected');
            });
        }, SELECTION_CLEAR_DELAY);
    }
    
    // Reset selections
    pairGameState.selectedItem = null;
    pairGameState.selectedPrice = null;
}

function showPairFeedback(message, type) {
    const feedback = document.getElementById('pair-feedback');
    feedback.textContent = message;
    feedback.className = `feedback ${type}`;
    
    // Clear feedback after a delay
    setTimeout(() => {
        if (feedback.textContent === message) {
            feedback.textContent = '';
            feedback.className = 'feedback';
        }
    }, FEEDBACK_CLEAR_DELAY);
}

function startPairTimer() {
    if (pairGameState.timerInterval) {
        clearInterval(pairGameState.timerInterval);
    }
    
    pairGameState.timerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - pairGameState.startTime) / 1000);
        document.getElementById('pair-timer').textContent = formatTime(elapsed);
    }, 1000);
}

function winPairGame() {
    pairGameState.gameOver = true;
    
    if (pairGameState.timerInterval) {
        clearInterval(pairGameState.timerInterval);
    }
    
    const elapsed = Math.floor((Date.now() - pairGameState.startTime) / 1000);
    
    // Record win statistics
    recordPairGameWin(elapsed);
    
    // ===== ENHANCED VISUAL EFFECTS =====
    // Check if it was a perfect/fast completion
    const isPerfect = elapsed < 20;
    
    // Trigger confetti celebration
    createConfetti();
    
    // Screen flash effect (perfect flash if under 20 seconds)
    screenFlash(isPerfect ? 'perfect' : 'success');
    
    // Victory ripple
    victoryRipple();
    
    // Multiple star bursts for perfect game
    if (isPerfect) {
        setTimeout(() => {
            createStarBurst(window.innerWidth / 2, window.innerHeight / 3, 25);
        }, 200);
        setTimeout(() => {
            createStarBurst(window.innerWidth / 3, window.innerHeight / 2, 20);
        }, 400);
        setTimeout(() => {
            createStarBurst(window.innerWidth * 2 / 3, window.innerHeight / 2, 20);
        }, 600);
        
        // Floating "PERFECT!" text
        setTimeout(() => {
            floatingText('PERFECT!', window.innerWidth / 2, window.innerHeight / 2, '#3FFFD8');
        }, 800);
    } else {
        // Standard celebration
        setTimeout(() => {
            createStarBurst(window.innerWidth / 2, window.innerHeight / 2, 20);
        }, 200);
        
        setTimeout(() => {
            floatingText('WINNER!', window.innerWidth / 2, window.innerHeight / 2, '#FFD700');
        }, 600);
    }
    
    // Spotlight effect
    setTimeout(() => {
        createSpotlight(window.innerWidth / 2, window.innerHeight / 2, 2000);
    }, isPerfect ? 1000 : 400);
    
    const result = document.getElementById('pair-result');
    result.className = 'result win';
    result.innerHTML = `
        <h3>🎉 ${isPerfect ? 'PERFECT! Lightning fast!' : 'Perfect! You matched all pairs!'} 🎉</h3>
        <p>Time: <strong>${formatTime(elapsed)}</strong></p>
        <button class="play-again-btn" onclick="initPairGame()">Play Again</button>
    `;
    
    // Add sparkles and glow to result
    setTimeout(() => {
        addSparkles(result, isPerfect ? 20 : 15);
        glowPulse(result, 'yellow');
    }, isPerfect ? 1200 : 800);
    
    showPairFeedback('', '');
}

// Allow Enter key to submit guess in bag game
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme
    initTheme();
    
    // Add Enter key support for bag game
    const bagGuessInput = document.getElementById('bag-guess');
    if (bagGuessInput) {
        bagGuessInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                submitBagGuess();
            }
        });
    }
});
