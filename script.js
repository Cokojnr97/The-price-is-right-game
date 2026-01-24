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

// ============================================
// PRODUCT LIST MANAGEMENT
// ============================================

const PRODUCT_LIST_KEY = 'priceIsRightProductList';

function changeProductList(listType) {
    currentProductList = listType;
    localStorage.setItem(PRODUCT_LIST_KEY, listType);
    
    // Update active product arrays
    if (listType === 'colombian') {
        activeBagItems = colombianBagItems;
        activePairItems = colombianPairItems;
    } else {
        activeBagItems = bagItems;
        activePairItems = pairItems;
    }
    
    // Update UI
    document.querySelectorAll('.product-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.products === listType) {
            btn.classList.add('active');
        }
    });
}

function initProductList() {
    const saved = localStorage.getItem(PRODUCT_LIST_KEY);
    if (saved && (saved === 'standard' || saved === 'colombian')) {
        changeProductList(saved);
    } else {
        changeProductList('standard');
    }
}

// ============================================
// CURRENCY MANAGEMENT
// ============================================

const CURRENCY_KEY = 'priceIsRightCurrency';
const USD_TO_COP_RATE = 4000; // Approximate conversion rate (adjust as needed)

let currentCurrency = 'USD';

function changeCurrency(currency) {
    currentCurrency = currency;
    localStorage.setItem(CURRENCY_KEY, currency);
    
    // Update UI
    document.querySelectorAll('.currency-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.currency === currency) {
            btn.classList.add('active');
        }
    });
}

function initCurrency() {
    const saved = localStorage.getItem(CURRENCY_KEY);
    if (saved && (saved === 'USD' || saved === 'COP')) {
        changeCurrency(saved);
    } else {
        changeCurrency('USD');
    }
}

function convertPrice(priceUSD) {
    if (currentCurrency === 'COP') {
        return Math.round(priceUSD * USD_TO_COP_RATE);
    }
    return priceUSD;
}

function formatCurrency(price) {
    if (currentCurrency === 'COP') {
        // Format COP with thousands separator and no decimals
        return '$' + price.toLocaleString('es-CO', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });
    } else {
        // Format USD with 2 decimals
        return '$' + price.toFixed(2);
    }
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

// Colombian Products - "It's in the Bag"
const colombianBagItems = [
    { name: "Café Juan Valdez", icon: "☕", price: 12.99, img: "https://i.imgur.com/placeholder-coffee.png" },
    { name: "Arepa Mix", icon: "🫓", price: 4.99, img: "https://i.imgur.com/placeholder-arepa.png" },
    { name: "Panela (Cane Sugar)", icon: "🍯", price: 3.49, img: "https://i.imgur.com/placeholder-panela.png" },
    { name: "Aguardiente", icon: "🍾", price: 18.99, img: "https://i.imgur.com/placeholder-aguardiente.png" },
    { name: "Bocadillo (Guava Paste)", icon: "🍬", price: 5.49, img: "https://i.imgur.com/placeholder-bocadillo.png" },
    { name: "Arequipe (Dulce de Leche)", icon: "🍯", price: 6.99, img: "https://i.imgur.com/placeholder-arequipe.png" },
    { name: "Postobón Soda", icon: "🥤", price: 2.49, img: "https://i.imgur.com/placeholder-postobon.png" },
    { name: "Colombina Candy", icon: "🍭", price: 1.99, img: "https://i.imgur.com/placeholder-colombina.png" },
    { name: "Papa Criolla", icon: "🥔", price: 4.29, img: "https://i.imgur.com/placeholder-papa.png" },
    { name: "Ramo Ponqué", icon: "🍰", price: 3.79, img: "https://i.imgur.com/placeholder-ponque.png" }
];

// Colombian Products - "Pick a Pair"
const colombianPairItems = [
    { name: "Coffee Maker", icon: "☕", price: 79.99, img: "https://i.imgur.com/placeholder-coffeemaker.png" },
    { name: "Colombian Flag", icon: "🇨🇴", price: 15.99, img: "https://i.imgur.com/placeholder-flag.png" },
    { name: "Ruana (Poncho)", icon: "🧥", price: 45.99, img: "https://i.imgur.com/placeholder-ruana.png" },
    { name: "Sombrero Vueltiao", icon: "🎩", price: 35.99, img: "https://i.imgur.com/placeholder-sombrero.png" },
    { name: "Mochilas Wayuu", icon: "👜", price: 89.99, img: "https://i.imgur.com/placeholder-mochila.png" },
    { name: "Colombian Emerald", icon: "💎", price: 299.99, img: "https://i.imgur.com/placeholder-emerald.png" },
    { name: "Coffee Grinder", icon: "⚙️", price: 49.99, img: "https://i.imgur.com/placeholder-grinder.png" },
    { name: "Tejo Game Set", icon: "🎯", price: 129.99, img: "https://i.imgur.com/placeholder-tejo.png" }
];

// Current active product lists
let currentProductList = 'standard';
let activeBagItems = bagItems;
let activePairItems = pairItems;

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
    } else if (sliderId === 'blind-timer') {
        const minutes = Math.floor(slider.value / 60);
        const seconds = slider.value % 60;
        valueDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    } else {
        valueDisplay.textContent = slider.value;
    }
}

function loadCustomSettings() {
    const saved = localStorage.getItem(CUSTOM_SETTINGS_KEY);
    let customSettings;
    
    if (saved) {
        customSettings = JSON.parse(saved);
        // Add blindTimer if not present (for backwards compatibility)
        if (!customSettings.blindTimer) {
            customSettings.blindTimer = 180; // default 3 minutes
        }
    } else {
        // Use medium difficulty as defaults
        customSettings = {
            bagTries: 3,
            bagTolerance: 5,
            bagItems: 5,
            pairCount: 5,
            blindTimer: 180 // 3 minutes
        };
    }
    
    // Set slider values
    document.getElementById('bag-tries-slider').value = customSettings.bagTries;
    document.getElementById('bag-tolerance-slider').value = customSettings.bagTolerance;
    document.getElementById('bag-items-slider').value = customSettings.bagItems;
    document.getElementById('pair-count-slider').value = customSettings.pairCount;
    document.getElementById('blind-timer-slider').value = customSettings.blindTimer;
    
    // Update displays
    updateSliderValue('bag-tries');
    updateSliderValue('bag-tolerance');
    updateSliderValue('bag-items');
    updateSliderValue('pair-count');
    updateSliderValue('blind-timer');
}

function saveCustomSettings() {
    const customSettings = {
        bagTries: parseInt(document.getElementById('bag-tries-slider').value),
        bagTolerance: parseInt(document.getElementById('bag-tolerance-slider').value),
        bagItems: parseInt(document.getElementById('bag-items-slider').value),
        pairCount: parseInt(document.getElementById('pair-count-slider').value),
        blindTimer: parseInt(document.getElementById('blind-timer-slider').value)
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
    document.getElementById('blind-timer-slider').value = 180; // 3 minutes
    
    updateSliderValue('bag-tries');
    updateSliderValue('bag-tolerance');
    updateSliderValue('bag-items');
    updateSliderValue('pair-count');
    updateSliderValue('blind-timer');
    
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
        // Show mode selection instead of directly starting game
        document.getElementById('pair-mode-selection').style.display = 'block';
        document.getElementById('pair-game-content').style.display = 'none';
        
        // Reset instructions
        document.getElementById('pair-instructions').textContent = 'Match each item with its correct price! Click an item, then click its price.';
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
    document.getElementById('custom-difficulty-panel').style.display = 'none';
    
    // Show game selection
    document.getElementById('game-selection').style.display = 'block';
    
    // Clear timers to prevent memory leaks
    if (pairGameState.timerInterval) {
        clearInterval(pairGameState.timerInterval);
        pairGameState.timerInterval = null;
    }
    if (blindModeState.timerInterval) {
        clearInterval(blindModeState.timerInterval);
        blindModeState.timerInterval = null;
    }
    
    // Reset game state
    currentGame = null;
    selectedGameType = null;
    pairGameMode = null;
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
    const shuffled = shuffleArray(activeBagItems);
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
        const usdPrice = formatCurrency(item.price);
        const copPrice = formatCurrency(convertPrice(item.price));
        itemCard.innerHTML = `
            <div class="item-icon">${item.icon}</div>
            <div class="item-name">${item.name}</div>
            <div class="item-prices" style="display: none;">
                <div class="item-price-usd">${usdPrice} USD</div>
                <div class="item-price-cop">${copPrice} COP</div>
            </div>
        `;
        container.appendChild(itemCard);
    });
}

function submitBagGuess() {
    if (bagGameState.gameOver) return;
    
    const guessInput = document.getElementById('bag-guess');
    let guess = parseFloat(guessInput.value.replace(/,/g, '')); // Remove commas for parsing
    
    if (isNaN(guess) || guess <= 0) {
        showBagFeedback('Please enter a valid price!', 'incorrect');
        return;
    }
    
    bagGameState.triesLeft--;
    document.getElementById('bag-tries').textContent = bagGameState.triesLeft;
    
    // Compare against the converted price
    const actualTotal = convertPrice(bagGameState.totalPrice);
    const difference = Math.abs(guess - actualTotal);
    const percentDiff = (difference / actualTotal) * 100;
    
    // Get tolerance from difficulty settings
    const settings = difficultySettings.bag[currentDifficulty];
    
    // Check if guess is close enough based on difficulty
    if (percentDiff <= settings.tolerance) {
        winBagGame();
    } else if (bagGameState.triesLeft > 0) {
        // Give hints
        if (guess > actualTotal) {
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
    const usdPrice = formatCurrency(bagGameState.totalPrice);
    const copPrice = formatCurrency(convertPrice(bagGameState.totalPrice));
    if (currentCurrency === 'USD') {
        document.getElementById('bag-total').textContent = `${usdPrice} (${copPrice})`;
    } else {
        document.getElementById('bag-total').textContent = `${copPrice} (${usdPrice})`;
    }
    
    // Reveal item prices
    document.querySelectorAll('.item-prices').forEach(priceDiv => {
        priceDiv.style.display = 'flex';
    });
    
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
    const usdTotal = formatCurrency(bagGameState.totalPrice);
    const copTotal = formatCurrency(convertPrice(bagGameState.totalPrice));
    result.innerHTML = `
        <h3>🎉 Congratulations! You Win! 🎉</h3>
        <p>The actual total was <strong>${usdTotal}</strong> USD / <strong>${copTotal}</strong> COP</p>
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
    const usdPrice = formatCurrency(bagGameState.totalPrice);
    const copPrice = formatCurrency(convertPrice(bagGameState.totalPrice));
    if (currentCurrency === 'USD') {
        document.getElementById('bag-total').textContent = `${usdPrice} (${copPrice})`;
    } else {
        document.getElementById('bag-total').textContent = `${copPrice} (${usdPrice})`;
    }
    
    // Reveal item prices
    document.querySelectorAll('.item-prices').forEach(priceDiv => {
        priceDiv.style.display = 'flex';
    });
    
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
    const usdTotal = formatCurrency(bagGameState.totalPrice);
    const copTotal = formatCurrency(convertPrice(bagGameState.totalPrice));
    result.innerHTML = `
        <h3>Sorry, you're out of tries!</h3>
        <p>The actual total was <strong>${usdTotal}</strong> USD / <strong>${copTotal}</strong> COP</p>
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
    const shuffled = shuffleArray(activePairItems);
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
        const convertedPrice = convertPrice(priceObj.price);
        priceDiv.textContent = `${formatCurrency(convertedPrice)}`;
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

// ============================================
// PICK A PAIR - MODE SELECTION & BLIND MODE
// ============================================

let pairGameMode = null; // 'standard' or 'blind'
let blindModeState = {
    matches: {}, // stores item-price pairs: { itemIndex: priceIndex }
    timeLimit: 0,
    timerInterval: null,
    checksRemaining: Infinity, // unlimited checks before time runs out
    gameStarted: false
};

// Timer durations per difficulty (in seconds)
const blindModeTimers = {
    easy: { pairs: { 3: 180, 4: 240, 5: 300, 6: 360, 7: 420, 8: 480 } },
    medium: { pairs: { 3: 120, 4: 160, 5: 200, 6: 240, 7: 280, 8: 320 } },
    hard: { pairs: { 3: 90, 4: 120, 5: 150, 6: 180, 7: 210, 8: 240 } },
    custom: { pairs: { 3: 120, 4: 160, 5: 200, 6: 240, 7: 280, 8: 320 } } // defaults to medium
};

function selectPairMode(mode) {
    pairGameMode = mode;
    
    // Hide mode selection
    document.getElementById('pair-mode-selection').style.display = 'none';
    
    // Show game content
    document.getElementById('pair-game-content').style.display = 'block';
    
    // Update instructions and UI based on mode
    const instructions = document.getElementById('pair-instructions');
    const matchesStat = document.getElementById('pair-matches-stat');
    const timerStat = document.getElementById('pair-timer-stat');
    const timerLabel = document.getElementById('pair-timer-label');
    
    if (mode === 'blind') {
        instructions.textContent = 'Match all pairs, then check your results. Beat the clock!';
        // In blind mode: hide "Matches Found", show only countdown timer
        matchesStat.style.display = 'none';
        timerStat.style.display = 'flex';
        timerLabel.textContent = 'Time Remaining:';
    } else {
        instructions.textContent = 'Match each item with its correct price! Click an item, then click its price.';
        // In standard mode: show both stats
        matchesStat.style.display = 'flex';
        timerStat.style.display = 'flex';
        timerLabel.textContent = 'Time:';
        document.getElementById('pair-stat-label').textContent = 'Matches Found:';
    }
    
    // Initialize the game
    if (mode === 'blind') {
        initBlindMode();
    } else {
        initPairGame();
    }
}

function initBlindMode() {
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
    
    // Reset blind mode state
    let timeLimit;
    if (currentDifficulty === 'custom') {
        // Use custom timer from settings
        const saved = localStorage.getItem(CUSTOM_SETTINGS_KEY);
        if (saved) {
            const customSettings = JSON.parse(saved);
            timeLimit = customSettings.blindTimer || 180;
        } else {
            timeLimit = 180; // default 3 minutes
        }
    } else {
        // Use preset difficulty timers
        timeLimit = blindModeTimers[currentDifficulty].pairs[settings.pairs];
    }
    
    blindModeState = {
        matches: {},
        timeLimit: timeLimit,
        timerInterval: null,
        checksRemaining: Infinity,
        gameStarted: true,
        finalScore: 0
    };
    
    // Update difficulty badge
    const badge = document.getElementById('pair-difficulty-badge');
    badge.textContent = settings.label + ' - Blind';
    badge.style.background = settings.color;
    
    // Select random items for pairing
    const shuffled = shuffleArray(activePairItems);
    pairGameState.items = shuffled.slice(0, settings.pairs);
    
    // Display items and prices
    displayPairItems();
    displayPairPrices();
    
    // Reset UI
    document.getElementById('pair-timer').textContent = `${formatTime(blindModeState.timeLimit)}`;
    document.getElementById('pair-feedback').innerHTML = '';
    document.getElementById('pair-result').innerHTML = '';
    document.getElementById('blind-results').style.display = 'none';
    
    // Show check button
    document.getElementById('blind-check-container').style.display = 'block';
    
    // Start countdown timer
    startBlindTimer();
}

function startBlindTimer() {
    if (blindModeState.timerInterval) {
        clearInterval(blindModeState.timerInterval);
    }
    
    pairGameState.startTime = Date.now();
    const endTime = pairGameState.startTime + (blindModeState.timeLimit * 1000);
    
    blindModeState.timerInterval = setInterval(() => {
        const remaining = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
        document.getElementById('pair-timer').textContent = formatTime(remaining);
        
        // Flash timer when running low
        const timerElement = document.getElementById('pair-timer');
        if (remaining <= 10 && remaining > 0) {
            timerElement.style.color = '#FF4136';
            timerElement.style.animation = 'pulse 0.5s infinite';
        } else if (remaining === 0) {
            // Time's up!
            timeUpBlindMode();
        }
    }, 100);
}

function timeUpBlindMode() {
    if (blindModeState.timerInterval) {
        clearInterval(blindModeState.timerInterval);
    }
    
    pairGameState.gameOver = true;
    blindModeState.gameStarted = false;
    
    // Disable further clicking
    document.querySelectorAll('.pair-item, .pair-price').forEach(el => {
        el.style.pointerEvents = 'none';
    });
    
    // Hide check button
    document.getElementById('blind-check-container').style.display = 'none';
    
    // Calculate final results
    const totalPairs = pairGameState.totalPairs;
    let correctMatches = 0;
    
    // Check all current matches
    for (let itemIndex in blindModeState.matches) {
        const priceIndex = blindModeState.matches[itemIndex];
        if (parseInt(itemIndex) === parseInt(priceIndex)) {
            correctMatches++;
        }
    }
    
    const wrongMatches = Object.keys(blindModeState.matches).length - correctMatches;
    const unmatched = totalPairs - Object.keys(blindModeState.matches).length;
    
    // Calculate score (0-100)
    const accuracyScore = (correctMatches / totalPairs) * 100;
    blindModeState.finalScore = Math.round(accuracyScore);
    
    // Show visual indicators on all pairs
    for (let i = 0; i < totalPairs; i++) {
        const itemDiv = document.querySelector(`.pair-item[data-index="${i}"]`);
        const matchedPriceIndex = blindModeState.matches[i];
        
        if (matchedPriceIndex !== undefined) {
            const priceDiv = document.querySelector(`.pair-price[data-index="${matchedPriceIndex}"]`);
            
            if (i === matchedPriceIndex) {
                // Correct match - green
                itemDiv.classList.add('revealed-correct');
                priceDiv.classList.add('revealed-correct');
                glowPulse(itemDiv, '#00FF00');
                glowPulse(priceDiv, '#00FF00');
            } else {
                // Wrong match - red
                itemDiv.classList.add('revealed-wrong');
                priceDiv.classList.add('revealed-wrong');
                shakeElement(itemDiv);
                shakeElement(priceDiv);
            }
        } else {
            // Unmatched - yellow outline
            itemDiv.classList.add('revealed-unmatched');
        }
    }
    
    // Show correct matches for unmatched/wrong items
    setTimeout(() => {
        for (let i = 0; i < totalPairs; i++) {
            const matchedPriceIndex = blindModeState.matches[i];
            
            // If wrong or unmatched, show the correct price
            if (matchedPriceIndex === undefined || i !== matchedPriceIndex) {
                const correctPriceDiv = document.querySelector(`.pair-price[data-index="${i}"]`);
                if (!correctPriceDiv.classList.contains('revealed-correct')) {
                    correctPriceDiv.classList.add('revealed-answer');
                    glowPulse(correctPriceDiv, '#FFD700');
                }
            }
        }
    }, 1000);
    
    // Show final result
    setTimeout(() => {
        const result = document.getElementById('pair-result');
        const isWin = correctMatches === totalPairs;
        
        if (isWin) {
            // Perfect score!
            result.className = 'result win';
            result.innerHTML = `
                <h3>🎉 PERFECT SCORE! 🎉</h3>
                <p>All ${totalPairs} pairs matched correctly!</p>
                <p>Score: <strong>${blindModeState.finalScore}/100</strong></p>
                <p>But time ran out! Try to beat the clock next time!</p>
                <button class="play-again-btn" onclick="resetPairGame()">Play Again</button>
            `;
            createConfetti();
            screenFlash('success');
        } else {
            // Partial or fail
            result.className = 'result lose';
            result.innerHTML = `
                <h3>⏰ Time's Up!</h3>
                <p>✓ Correct: <strong>${correctMatches}</strong> / ${totalPairs}</p>
                <p>✗ Wrong: <strong>${wrongMatches}</strong></p>
                <p>○ Unmatched: <strong>${unmatched}</strong></p>
                <p>Score: <strong>${blindModeState.finalScore}/100</strong></p>
                <button class="play-again-btn" onclick="resetPairGame()">Try Again</button>
            `;
            screenFlash('fail');
        }
        
        addSparkles(result, 10);
    }, 2000);
    
    // Record statistics (only if some matches were made)
    if (Object.keys(blindModeState.matches).length > 0) {
        recordPairGameBlind(correctMatches, totalPairs, blindModeState.finalScore);
    }
}

function checkBlindMatches() {
    // Check how many pairs have been matched
    const matchedCount = Object.keys(blindModeState.matches).length;
    const totalPairs = pairGameState.totalPairs;
    
    if (matchedCount === 0) {
        showPairFeedback('⚠️ You haven\'t made any matches yet!', 'incorrect');
        return;
    }
    
    if (matchedCount < totalPairs) {
        showPairFeedback(`⚠️ Match all ${totalPairs} pairs before checking! (${matchedCount}/${totalPairs} done)`, 'incorrect');
        return;
    }
    
    // All pairs matched - calculate results
    let correctMatches = 0;
    let wrongMatches = 0;
    
    for (let itemIndex in blindModeState.matches) {
        const priceIndex = blindModeState.matches[itemIndex];
        if (parseInt(itemIndex) === parseInt(priceIndex)) {
            correctMatches++;
        } else {
            wrongMatches++;
        }
    }
    
    // Check if perfect
    if (correctMatches === totalPairs) {
        // WIN! Stop timer and celebrate
        if (blindModeState.timerInterval) {
            clearInterval(blindModeState.timerInterval);
        }
        
        pairGameState.gameOver = true;
        blindModeState.gameStarted = false;
        
        const elapsed = Math.floor((Date.now() - pairGameState.startTime) / 1000);
        const timeRemaining = blindModeState.timeLimit - elapsed;
        
        // Calculate bonus score based on time remaining
        const timeBonus = Math.round((timeRemaining / blindModeState.timeLimit) * 50);
        blindModeState.finalScore = 100 + timeBonus;
        
        // Mark all as correct
        for (let i = 0; i < totalPairs; i++) {
            const itemDiv = document.querySelector(`.pair-item[data-index="${i}"]`);
            const priceDiv = document.querySelector(`.pair-price[data-index="${blindModeState.matches[i]}"]`);
            itemDiv.classList.add('revealed-correct');
            priceDiv.classList.add('revealed-correct');
            glowPulse(itemDiv, '#00FF00');
            glowPulse(priceDiv, '#00FF00');
        }
        
        // Hide check button and results
        document.getElementById('blind-check-container').style.display = 'none';
        document.getElementById('blind-results').style.display = 'none';
        
        // Celebration!
        createConfetti();
        screenFlash('perfect');
        victoryRipple();
        
        setTimeout(() => {
            createStarBurst(window.innerWidth / 2, window.innerHeight / 2, 25);
            floatingText('PERFECT!', window.innerWidth / 2, window.innerHeight / 2, '#3FFFD8');
        }, 300);
        
        setTimeout(() => {
            createSpotlight(window.innerWidth / 2, window.innerHeight / 2, 2000);
        }, 800);
        
        // Show result
        setTimeout(() => {
            const result = document.getElementById('pair-result');
            result.className = 'result win';
            result.innerHTML = `
                <h3>🎉 PERFECT! ALL CORRECT! 🎉</h3>
                <p>Time Remaining: <strong>${formatTime(timeRemaining)}</strong></p>
                <p>Score: <strong>${blindModeState.finalScore}/100</strong> (with time bonus!)</p>
                <button class="play-again-btn" onclick="resetPairGame()">Play Again</button>
            `;
            addSparkles(result, 20);
            glowPulse(result, 'yellow');
        }, 1000);
        
        // Record statistics
        recordPairGameBlindWin(elapsed, blindModeState.finalScore);
        
    } else {
        // Some wrong - show results and allow changes
        document.getElementById('blind-correct').textContent = correctMatches;
        document.getElementById('blind-wrong').textContent = wrongMatches;
        document.getElementById('blind-results').style.display = 'block';
        
        // Visual feedback
        showPairFeedback(`${correctMatches} correct, ${wrongMatches} wrong. Make changes and try again!`, 'incorrect');
        screenFlash('fail');
    }
}

function tryAgainBlind() {
    // Hide results
    document.getElementById('blind-results').style.display = 'none';
    showPairFeedback('Make your changes and check again!', 'correct');
}

function resetPairGame() {
    // Clear timers
    if (pairGameState.timerInterval) {
        clearInterval(pairGameState.timerInterval);
    }
    if (blindModeState.timerInterval) {
        clearInterval(blindModeState.timerInterval);
    }
    
    // Clear selections and state
    blindModeState.matches = {};
    pairGameState.selectedItem = null;
    pairGameState.selectedPrice = null;
    
    // Clear all visual states and remove match indicators
    document.querySelectorAll('.pair-item, .pair-price').forEach(el => {
        // Remove match indicator if present
        const indicator = el.querySelector('.match-indicator');
        if (indicator) indicator.remove();
        
        el.className = el.classList.contains('pair-item') ? 'pair-item' : 'pair-price';
        el.style.pointerEvents = '';
        el.style.color = '';
        el.style.animation = '';
    });
    
    // Reset timer display
    document.getElementById('pair-matches').style.color = '';
    document.getElementById('pair-matches').style.animation = '';
    document.getElementById('pair-timer').style.color = '';
    document.getElementById('pair-timer').style.animation = '';
    
    // Reset stats visibility
    document.getElementById('pair-matches-stat').style.display = 'flex';
    document.getElementById('pair-timer-stat').style.display = 'flex';
    
    // Hide game content
    document.getElementById('pair-game-content').style.display = 'none';
    
    // Show mode selection again
    document.getElementById('pair-mode-selection').style.display = 'block';
    
    // Clear result
    document.getElementById('pair-result').innerHTML = '';
    document.getElementById('pair-feedback').innerHTML = '';
    
    pairGameMode = null;
}

// Override selectPairItem for blind mode
const originalSelectPairItem = selectPairItem;
selectPairItem = function(index) {
    if (pairGameMode === 'blind') {
        selectBlindItem(index);
    } else {
        originalSelectPairItem(index);
    }
};

// Override selectPairPrice for blind mode
const originalSelectPairPrice = selectPairPrice;
selectPairPrice = function(index) {
    if (pairGameMode === 'blind') {
        selectBlindPrice(index);
    } else {
        originalSelectPairPrice(index);
    }
};

function selectBlindItem(index) {
    if (pairGameState.gameOver || !blindModeState.gameStarted) return;
    
    const itemDiv = document.querySelector(`.pair-item[data-index="${index}"]`);
    
    // Deselect previous selection
    document.querySelectorAll('.pair-item').forEach(el => el.classList.remove('selected'));
    
    // Select this item
    itemDiv.classList.add('selected');
    pairGameState.selectedItem = index;
    
    // Check if price is also selected
    if (pairGameState.selectedPrice !== null) {
        makeBlindMatch();
    }
}

function selectBlindPrice(index) {
    if (pairGameState.gameOver || !blindModeState.gameStarted) return;
    
    const priceDiv = document.querySelector(`.pair-price[data-index="${index}"]`);
    
    // Deselect previous selection
    document.querySelectorAll('.pair-price').forEach(el => el.classList.remove('selected'));
    
    // Select this price
    priceDiv.classList.add('selected');
    pairGameState.selectedPrice = index;
    
    // Check if item is also selected
    if (pairGameState.selectedItem !== null) {
        makeBlindMatch();
    }
}

function makeBlindMatch() {
    const itemIndex = pairGameState.selectedItem;
    const priceIndex = pairGameState.selectedPrice;
    
    // Check if this item was already matched to a different price
    if (blindModeState.matches[itemIndex] !== undefined) {
        // Unmatch the old price
        const oldPriceIndex = blindModeState.matches[itemIndex];
        const oldPriceDiv = document.querySelector(`.pair-price[data-index="${oldPriceIndex}"]`);
        oldPriceDiv.classList.remove('blind-matched');
        // Remove old number indicator
        const oldIndicator = oldPriceDiv.querySelector('.match-indicator');
        if (oldIndicator) oldIndicator.remove();
    }
    
    // Check if this price was already matched to a different item
    for (let prevItemIndex in blindModeState.matches) {
        if (blindModeState.matches[prevItemIndex] === priceIndex) {
            const prevItemDiv = document.querySelector(`.pair-item[data-index="${prevItemIndex}"]`);
            prevItemDiv.classList.remove('blind-matched');
            // Remove old number indicator
            const oldIndicator = prevItemDiv.querySelector('.match-indicator');
            if (oldIndicator) oldIndicator.remove();
            delete blindModeState.matches[prevItemIndex];
            break;
        }
    }
    
    // Store the match
    blindModeState.matches[itemIndex] = priceIndex;
    
    // Mark as matched visually (neutral color, no feedback on correctness)
    const itemDiv = document.querySelector(`.pair-item[data-index="${itemIndex}"]`);
    const priceDiv = document.querySelector(`.pair-price[data-index="${priceIndex}"]`);
    
    itemDiv.classList.remove('selected');
    itemDiv.classList.add('blind-matched');
    priceDiv.classList.remove('selected');
    priceDiv.classList.add('blind-matched');
    
    // Add matching number indicators
    const matchNumber = Object.keys(blindModeState.matches).length;
    const itemIndicator = document.createElement('span');
    itemIndicator.className = 'match-indicator';
    itemIndicator.textContent = matchNumber;
    itemDiv.appendChild(itemIndicator);
    
    const priceIndicator = document.createElement('span');
    priceIndicator.className = 'match-indicator';
    priceIndicator.textContent = matchNumber;
    priceDiv.appendChild(priceIndicator);
    
    // Subtle feedback
    glowPulse(itemDiv, 'blue');
    glowPulse(priceDiv, 'blue');
    
    // Reset selections
    pairGameState.selectedItem = null;
    pairGameState.selectedPrice = null;
    
    // Check if all pairs are matched
    const matchedCount = Object.keys(blindModeState.matches).length;
    if (matchedCount === pairGameState.totalPairs) {
        showPairFeedback('✓ All pairs matched! Click "Check My Matches" to see results.', 'correct');
    } else {
        showPairFeedback(`Paired! (${matchedCount}/${pairGameState.totalPairs})`, 'correct');
    }
}

// Statistics recording for blind mode
function recordPairGameBlindWin(time, score) {
    const stats = getStats();
    stats.pairGame.gamesPlayed++;
    stats.pairGame.wins++;
    stats.pairGame.totalTime += time;
    stats.overallGames++;
    
    if (!stats.pairGame.bestTime || time < stats.pairGame.bestTime) {
        stats.pairGame.bestTime = time;
    }
    
    stats.pairGame.currentStreak++;
    if (stats.pairGame.currentStreak > stats.pairGame.bestStreak) {
        stats.pairGame.bestStreak = stats.pairGame.currentStreak;
    }
    
    saveStats(stats);
    updateStatsDisplay();
}

function recordPairGameBlind(correct, total, score) {
    const stats = getStats();
    stats.pairGame.gamesPlayed++;
    stats.overallGames++;
    
    // Only count as win if all correct
    if (correct === total) {
        stats.pairGame.wins++;
        stats.pairGame.currentStreak++;
        if (stats.pairGame.currentStreak > stats.pairGame.bestStreak) {
            stats.pairGame.bestStreak = stats.pairGame.currentStreak;
        }
    } else {
        stats.pairGame.currentStreak = 0;
    }
    
    saveStats(stats);
    updateStatsDisplay();
}

// Allow Enter key to submit guess in bag game
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme
    initTheme();
    
    // Initialize product list
    initProductList();
    
    // Initialize currency
    initCurrency();
    
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
