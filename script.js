// Constants
const SELECTION_CLEAR_DELAY = 800;  // ms to wait before clearing incorrect selections
const FEEDBACK_CLEAR_DELAY = 2000;  // ms to wait before clearing feedback messages

// Game state
let currentGame = null;
let bagGameState = {
    items: [],
    totalPrice: 0,
    triesLeft: 3,
    gameOver: false
};

let pairGameState = {
    items: [],
    selectedItem: null,
    selectedPrice: null,
    matchesFound: 0,
    totalPairs: 5,
    startTime: null,
    timerInterval: null,
    gameOver: false
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
function startGame(gameType) {
    currentGame = gameType;
    document.getElementById('game-selection').style.display = 'none';
    
    if (gameType === 'bag') {
        document.getElementById('bag-game').style.display = 'block';
        initBagGame();
    } else if (gameType === 'pair') {
        document.getElementById('pair-game').style.display = 'block';
        initPairGame();
    }
}

function backToMenu() {
    // Hide all game containers
    document.getElementById('bag-game').style.display = 'none';
    document.getElementById('pair-game').style.display = 'none';
    
    // Show game selection
    document.getElementById('game-selection').style.display = 'block';
    
    // Clear timers
    if (pairGameState.timerInterval) {
        clearInterval(pairGameState.timerInterval);
    }
    
    currentGame = null;
}

// ============================================
// IT'S IN THE BAG GAME
// ============================================

function initBagGame() {
    // Reset game state
    bagGameState = {
        items: [],
        totalPrice: 0,
        triesLeft: 3,
        gameOver: false
    };
    
    // Select 4-6 random items
    const numItems = Math.floor(Math.random() * 3) + 4; // 4 to 6 items
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
    
    // Check if guess is close enough (within 5%)
    if (percentDiff <= 5) {
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
    
    const result = document.getElementById('bag-result');
    result.className = 'result win';
    result.innerHTML = `
        <h3>🎉 Congratulations! You Win! 🎉</h3>
        <p>The actual total was <strong>$${formatPrice(bagGameState.totalPrice)}</strong></p>
        <p>You guessed it correctly!</p>
        <button class="play-again-btn" onclick="initBagGame()">Play Again</button>
    `;
    
    showBagFeedback('', '');
}

function loseBagGame() {
    bagGameState.gameOver = true;
    document.getElementById('bag-guess').disabled = true;
    document.getElementById('bag-total').textContent = `$${formatPrice(bagGameState.totalPrice)}`;
    
    const result = document.getElementById('bag-result');
    result.className = 'result lose';
    result.innerHTML = `
        <h3>Sorry, you're out of tries!</h3>
        <p>The actual total was <strong>$${formatPrice(bagGameState.totalPrice)}</strong></p>
        <p>Better luck next time!</p>
        <button class="play-again-btn" onclick="initBagGame()">Try Again</button>
    `;
    
    showBagFeedback('', '');
}

// ============================================
// PICK A PAIR GAME
// ============================================

function initPairGame() {
    // Reset game state
    pairGameState = {
        items: [],
        selectedItem: null,
        selectedPrice: null,
        matchesFound: 0,
        totalPairs: 5,
        startTime: Date.now(),
        timerInterval: null,
        gameOver: false
    };
    
    // Select random items for pairing
    const shuffled = shuffleArray(pairItems);
    pairGameState.items = shuffled.slice(0, 5);
    
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
    
    const result = document.getElementById('pair-result');
    result.className = 'result win';
    result.innerHTML = `
        <h3>🎉 Perfect! You matched all pairs! 🎉</h3>
        <p>Time: <strong>${formatTime(elapsed)}</strong></p>
        <button class="play-again-btn" onclick="initPairGame()">Play Again</button>
    `;
    
    showPairFeedback('', '');
}

// Allow Enter key to submit guess in bag game
document.addEventListener('DOMContentLoaded', () => {
    const bagGuessInput = document.getElementById('bag-guess');
    if (bagGuessInput) {
        bagGuessInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                submitBagGuess();
            }
        });
    }
});
