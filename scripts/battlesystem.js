// Fix the showMoves function
function showMoves() {
    console.log("=== DEBUG: showMoves() called ===");
    
    try {
        document.getElementById('actionMenu').style.display = 'none';
        document.getElementById('movesMenu').style.display = 'block';
        
        const movesGrid = document.getElementById('movesGrid');
        movesGrid.innerHTML = '';
        
        const state = battleSystem.getBattleState();
        console.log("Battle state:", state);
        console.log("Player moves:", state.player.moves);
        console.log("Moves length:", state.player.moves.length);
        
        if (!state.player.moves || state.player.moves.length === 0) {
            console.error("❌ No moves found!");
            movesGrid.innerHTML = '<div style="color: red;">No moves available!</div>';
            return;
        }
        
        state.player.moves.forEach((move, index) => {
            console.log(`Creating move button ${index}:`, move.name);
            
            const moveBtn = document.createElement('button');
            moveBtn.className = 'move-btn';
            moveBtn.textContent = move.name || 'Unknown Move';
            moveBtn.onclick = () => executePlayerMove(index);
            movesGrid.appendChild(moveBtn);
        });
        
        console.log("✅ Move buttons created successfully!");
        
    } catch (error) {
        console.error("❌ Error in showMoves():", error);
        document.getElementById('movesGrid').innerHTML = 
            `<div style="color: red;">Error: ${error.message}</div>`;
    }
}

// Fix the executePlayerMove function
function executePlayerMove(moveIndex) {
    console.log("Executing move:", moveIndex); // Debug log
    
    const result = battleSystem.playerMove(moveIndex);
    console.log("Move result:", result); // Debug log
    
    addDamageEffect('enemy', result.damage);
    updateUI();
    
    if (result.result === 'victory') {
        handleVictory();
        return;
    }
    
    // Enemy turn
    setTimeout(() => {
        const enemyResult = battleSystem.enemyMove();
        addDamageEffect('player', enemyResult.damage);
        updateUI();
        
        if (enemyResult.result === 'defeat') {
            handleDefeat();
            return;
        }
        
        showMainMenu();
    }, 1500);
}

// Add debug to battle system initialization
function initGame() {
    console.log("=== DEBUG: initGame() called ===");
    
    try {
        const enemyPokemon = getRandomEnemyPokemon();
        console.log("Player Pokemon:", playerTeam[currentPlayerIndex]);
        console.log("Enemy Pokemon:", enemyPokemon);
        
        battleSystem = new BattleSystem(playerTeam[currentPlayerIndex], enemyPokemon);
        
        const state = battleSystem.getBattleState();
        console.log("Initial battle state:", state);
        console.log("Player moves after init:", state.player.moves);
        
        updateUI();
        console.log("✅ Game initialized successfully!");
        
    } catch (error) {
        console.error("❌ Error in initGame():", error);
        alert("Failed to initialize game: " + error.message);
    }
}