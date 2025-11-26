let battleSystem;
let playerTeam = [
    pokemonDatabase.charmander,
    pokemonDatabase.squirtle,
    pokemonDatabase.bulbasaur
];

let currentPlayerIndex = 0;
function initGame(){
    const enemyPokemon = getRandomEnemyPokemon();
    battleSystem = new BattleSystem(playerTeam[currentPlayerIndex], enemyPokemon);
    updateUI();
}

function getRandomEnemyPokemon(){
    const enemies = [pokemonDatabase.pidgey, pokemonDatabase.rattata, pokemonDatabase.ekans];
    return enemies [Math.floor(Math.random() * enemies.length)];
}

function updateUI(){
    const state = battleSystem.getBattleState();

    document.getElementById('playerName').textContent = state.player.name;
    document.getElementById('playerHp').textContent = `HP: ${state.player.hp}/${state.player.maxHp}`;
    document.getElementById('playerHpBar').style.width = `${state.player.hpPercentage}%`;
    document.getElementById(`playerSprite`).textContent = state.player.sprite;

    const playerTypesContainer = document.getElementById('playerTypes');
    playerTypesContainer.innerHTML = '';
    state.player.types.foreach(type => {
        const badge = document.createElement('span');
        badge.className = `type-badge ${type}`;
        badge.textContent = type.charAt(0).toUpperCase() + type.slice(1);
        playerTypesContainer.appendChild(badge);
    });

    document.getElementById('enemyName').textContent = state.enemy.name;
    document.getElementById('enemyHp').textContent = `HP: ${state.enemy.hp}/${state.enemy.maxHp}`;
    document.getElementById('enemyHpBar').style.width = `${state.enemy.hpPercentage}%`;
    document.getElementById(`enemySprite`).textContent = state.enemy.sprite;

    const enemyTypesContainer = document.getElementById('enemyTypes');
    enemyTypesContainer.innerHTML = '';
    state.enemy.types.foreach(type => {
        const badge = document.createElement('span');
        badge.className = `type-badge ${type}`;
        badge.textContent = type.charAt(0).toUpperCase() + type.slice(1);
        enemyTypesContainer.appendChild(badge);
    });

    if(state.log.length > 0){
        document.getElementById('battleText').textContent = state.Log[state.log.length - 1];
    }
}

function showMoves(){
    document.getElementById('actionMenu').style.display = 'none';
    document.getElementById('movesMenu').style.display = 'block';
    
    const moveGrid = document.getElementById('moveGrid');
    moveGrid.innerHTML = '';

    const state = battleSystem.getBattleState();
    state.player.moves.forEach((move, index) => {
        const moveBtn = document.createElement(`button`);
        moveBtn.className = 'move-btn';
        moveBtn.textContent = move.name;
        moveBtn.onClick = () => executePlayerMove (index);
        movesGrid.appendChild(moveBtn);
    });
}

function showPokemon(){
    document.getElementById('actionMenu').style.display = 'none';
    document.getElementById('pokemonMenu').style.display = 'block';
    
    const moveGrid = document.getElementById('teameGrid');
    moveGrid.innerHTML = '';

    playerTeam.forEach((pokemon, index) => {
        const teamMember = document.createElement(`button`);
        teamMember.className = 'team-member';
        teamMember.textContent = pokemon.name;
        teamMember.disabled = index === currentPlayerIndex;
        teamMember.onClick = () => switchPokemon (index);
        teamGrid.appendChild(teamMember);
    });
}

function useItem(){
    document.getElementById('actionMenu').style.display = 'none';
    document.getElementById('itemMenu').style.display = 'block';
    
    const moveGrid = document.getElementById('moveGrid');
    moveGrid.innerHTML = '';

    const state = battleSystem.getBattleState();
    state.player.moves.forEach((move, index) => {
        const moveBtn = document.createElement(`button`);
        itemBtn.className = 'item';
        itemBtn.textContent = item;
        itemBtn.onClick = () => useItemAction (item);
        itemsGrid.appendChild(itemBtn);
    });
}

function run(){
    if (confirm('Are you sure you want to run from the battle?')){
        document.getElementById('battleText').textContent = 'Got away safely!';
        setTimeout(() => {
            if (confirm('Start a new battle?')){
                initGame;
            }
        }, 2000);
    }
}

function showMainMenu(){
    document.getElementById('actionMenu').style.display = 'grid';
    document.getElementById('movesMenu').style.display = 'block';
    document.getElementById('pokemonMenu').style.display = 'block';
    document.getElementById('itemMenu').style.display = 'block';
}

function executePlayerMove(){
    const result = battleSystem.playerMove(moveIndex);
    addDamageEffect('enemy', result.damage);
    updateUI();

    if(result.result === 'victory'){
        handleVictory();
        return;
    }

    setTimeout(()=>{
        const enemyResult = battleSystem.enemyMove();
        addDamageEffect('player', enemyResult.damage);
        updateUI();

        if (enemyResult.result === 'defeat'){
            handleDefeat();
            return;
        }
        showMainMenu();
    }, 1500)
}

function switchPokemon(newIndex){
    currentPlayerIndex = newIndex;
    const state = battleSystem.getBattleState();
    battleSystem.playerPokemon = new Pokemon(playerTeam[currentPlayerIndex]);

    document.getElementById('battleText').textContent = `Go! ${playerTeam[currentPlayerIndex].name}!`;
    updateUI();
    showMainMenu();
}

function useItemAction(item){
    const state = battleSystem.getBattleState();
    const healing = item === 'Potion' ? 20 : item === 'Super Potion' ? 50 : 0;

    if (healing > 0){
        battleSystem.playerPokemon.currentHp = Math.min(battleSystem.playerPokemon.maxHp, battleSystem.playerPokemon.currentHp + healing);
        document.getElementById('battleText').textContent = `${playerTeam[currentPlayerIndex].name} restored ${healing} HP!`;
        updateUI();
    }
    showMainMenu();
}

function addDamageEffect(target, damage){
    if (damage === 0) return;
    const targetElement = target === 'enemy' ?
        document.querySelector('.enemy-pokemon .pokemon-sprite'):
        document.querySelector('.player-pokemon .pokemon-sprite');
        
        targetElement.classList.add('shake');
        const damageNumber = document.createElement('div');
        damageNumber.className = 'damage-number';
        damageNumber.textContent =  `-${damage}`;
        damageNumber.style.left = targetElement.offsetLeft + 'px';
        damageNumber.style.top = targetElement.offsetTop + 'px';

        document.getElementById('battleEffects').appendChild(damageNumber);

        setTimeou(()=>{
            targetElement.classList.remove('shake');
            damageNumber.remove();
        }, 1000);
}

function handleVictory(){
    setTimeout(() => {
        if(confirm('You won, Start a new battle?')){
            initGame();
        }
    }, 2000);
}

function handleDefeat(){
    setTimeout(() => {
        if(confirm('You lose, start a new battle?')){
            initGame();
        }
    }, 2000)
}
windows.addEventListener('load', initGame);
