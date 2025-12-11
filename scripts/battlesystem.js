const fighters = allFighters; 

let playerMon = null;
let enemyMon = null;

let pHp = 5000;
let eHp = 5000;
const maxHp = 5000;
const maxArmor = 4500;

let pName, pSprite, pTypes, pHpBar, eName, eSprite, eTypes, eHpBar, movePanel;

// Turn system
let turnTimer = null;
const TURN_SECS = 5;

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(location.search);
  const fighterId = Number(params.get('fighter'));

  console.log('Battle started with fighter ID:', fighterId);
  if (!fighterId || isNaN(fighterId)) {
    alert('No Pokémon selected! Returning to choose screen...');
    setTimeout(() => location.href = 'gamemaster.html', 1500);
    return;
  }
  const selected = fighters.find(f => f.id === fighterId);
  if (!selected) {
    alert(`Pokémon #${fighterId} not found or not owned!`);
    setTimeout(() => location.href = 'gamemaster.html', 2000);
    return;
  }

  playerMon = { ...selected, mana: selected.maxMana || 100, currentArmor: selected.armor || 0, _stunTurns: 0 };
  playerMon.maxMana = playerMon.maxMana || 100;

  const enemyPool = fighters.filter(f => f.id !== fighterId);
  const enemyTpl = enemyPool[Math.floor(Math.random() * enemyPool.length)];
  enemyMon = { ...enemyTpl, mana: enemyTpl.maxMana || 100, maxMana: enemyTpl.maxMana || 100, currentArmor: enemyTpl.armor || 0, _stunTurns: 0 };

  pName = document.getElementById('pName');
  pSprite = document.getElementById('pSprite');
  pTypes = document.getElementById('pTypes');
  pHpBar = document.getElementById('pHp');

  eName = document.getElementById('eName');
  eSprite = document.getElementById('eSprite');
  eTypes = document.getElementById('eTypes');
  eHpBar = document.getElementById('eHp');

  movePanel = document.getElementById('movePanel');

  init();
  renderMoveButtons();
  startTurnTimer();
});

// ---------- DISPLAY ----------
function init() {
  pName.textContent = playerMon.name;
  pSprite.src = playerMon.sprite;
  pTypes.textContent = playerMon.types.join(' / ');
  eName.textContent = enemyMon.name;
  eSprite.src = enemyMon.sprite;
  eTypes.textContent = enemyMon.types.join(' / ');

  updateBars();
  renderMana();
  renderEnemyMana();
  renderArmor();
}

function updateBars() {
  pHpBar.style.width = (pHp / maxHp * 100) + '%';
  eHpBar.style.width = (eHp / maxHp * 100) + '%';
}

function renderMana() {
  document.getElementById('pMp').style.width = (playerMon.mana / playerMon.maxMana * 100) + '%';
}
function renderEnemyMana() {
  document.getElementById('eMp').style.width = (enemyMon.mana / enemyMon.maxMana * 100) + '%';
}

function renderArmor() {
  const pBar = document.getElementById('pArmor');
  const eBar = document.getElementById('eArmor');
  if (pBar) pBar.style.width = Math.min(100, (playerMon.currentArmor / maxArmor) * 100) + '%';
  if (eBar) eBar.style.width = Math.min(100, (enemyMon.currentArmor / maxArmor) * 100) + '%';
}

// ---------- LOG ----------
function addLog(text, isEnemy = false) {
  const box = document.getElementById('battleLog');
  const line = document.createElement('p');
  line.textContent = text;
  line.className = isEnemy ? 'enemy' : 'player';
  box.appendChild(line);
  box.scrollTop = box.scrollHeight;
}

// ---------- ATTACK (NOW WITH TRUE DAMAGE, STUN & LIFESTEAL) ----------
function attack(move, isPlayer) {
  let dmg = move.power || 0;

  const attacker = isPlayer ? playerMon : enemyMon;
  const target = isPlayer ? enemyMon : playerMon;

  let armor = target.currentArmor || 0;

  // 1. True Damage – completely ignores armor
  if (move.trueDmg) {
    addLog(`${attacker.name} used ${move.name} – true damage ignores armor!`, isPlayer);
  } else if (armor > 0) {
    const absorbed = Math.min(armor, dmg);
    target.currentArmor -= absorbed;
    dmg -= absorbed;
    addLog(`${target.name}'s armor absorbed ${absorbed}!`, !isPlayer);
  }

  // 2. Apply damage to HP
  if (isPlayer) {
    eHp = Math.max(0, eHp - dmg);
  } else {
    pHp = Math.max(0, pHp - dmg);
  }

  addLog(`${attacker.name} used ${move.name} → ${dmg} damage!`, isPlayer);

  // 3. Lifesteal – heal attacker by % of damage dealt
  if (move.lifesteal) {
    const heal = Math.floor(dmg * move.lifesteal);
    if (isPlayer) {
      pHp = Math.min(maxHp, pHp + heal);
    } else {
      eHp = Math.min(maxHp, eHp + heal);
    }
    addLog(`${attacker.name} lifesteals ${heal} HP!`, isPlayer);
  }

  // 4. Stun – opponent loses next turn(s)
  if (move.stunTurns) {
    target._stunTurns = move.stunTurns;
    addLog(`${target.name} is stunned for ${move.stunTurns} turn(s)!`, !isPlayer);
  }

  if (move.heal) {
  const healAmount = move.heal; // e.g. 500 or 1000 HP
  if (isPlayer) {
    pHp = Math.min(maxHp, pHp + healAmount);
  } else {
    eHp = Math.min(maxHp, eHp + healAmount);
  }
  addLog(`${attacker.name} heals for ${healAmount} HP!`, isPlayer);
}

  renderArmor();
  updateBars();

  if (checkFaint()) return;

  // Mana cost
  attacker.mana -= move.mana || 0;
  renderMana();
  if (!isPlayer) renderEnemyMana();
}

// ---------- MOVE BUTTONS ----------
function renderMoveButtons() {
  movePanel.innerHTML = '';
  playerMon.moves.forEach(move => {
    const btn = document.createElement('button');
    btn.className = move.mana >= 60 ? 'move-btn ult' : 'move-btn';
    btn.textContent = move.name;
    btn.dataset.move = move.name;
    btn.title = `${move.desc} (${move.mana} MP • ${move.cd || 0}s CD)`;

    btn.onclick = () => {
      if (playerMon._stunTurns > 0) {
        addLog(`${playerMon.name} is stunned!`, false);
        return;
      }
      if (playerMon.mana < move.mana) {
        addLog('Not enough mana!', false);
        return;
      }

      clearTurnTimer();
      attack(move, true);
      freezeMoves();
      startCooldown(btn, move.cd || 0);
      setTimeout(enemyTurn, 1200);
    };

    movePanel.appendChild(btn);
  });
}

// ---------- COOLDOWN ----------
function startCooldown(btn, secs) {
  if (secs <= 0) return;
  const original = btn.textContent;
  btn.disabled = true;
  let left = secs;
  const interval = setInterval(() => {
    btn.textContent = left + 's';
    if (--left <= 0) {
      clearInterval(interval);
      btn.textContent = original;
      btn.disabled = false;
    }
  }, 1000);
}

// ---------- ENEMY TURN ----------
function enemyTurn() {
  if (playerMon._stunTurns > 0) {
    playerMon._stunTurns--;
    addLog(`${playerMon.name} is stunned!`, false);
  }
  if (enemyMon._stunTurns > 0) {
    enemyMon._stunTurns--;
    addLog(`${enemyMon.name} is stunned!`, true);
    thawMoves();
    startTurnTimer();
    return;
  }

  const possible = enemyMon.moves.filter(m => enemyMon.mana >= m.mana);
  if (possible.length === 0) {
    addLog(`${enemyMon.name} is out of mana!`, true);
    thawMoves();
    startTurnTimer();
    return;
  }

  const move = possible[Math.floor(Math.random() * possible.length)];
  enemyMon.mana -= move.mana;
  attack(move, false);
  thawMoves();
  startTurnTimer();
}

// ---------- TIMER ----------
function startTurnTimer() {
  clearTurnTimer();
  let left = TURN_SECS;
  const end = Date.now() + left * 1000;
  turnTimer = setInterval(() => {
    left = Math.ceil((end - Date.now()) / 1000);
    if (left <= 0) {
      clearTurnTimer();
      addLog(`${playerMon.name} hesitated...`, false);
      freezeMoves();
      setTimeout(enemyTurn, 800);
    }
  }, 200);
}
function clearTurnTimer() {
  clearInterval(turnTimer);
  turnTimer = null;
}

// ---------- FREEZE / THAW ----------
function freezeMoves() {
  movePanel.querySelectorAll('button').forEach(b => b.disabled = true);
}
function thawMoves() {
  movePanel.querySelectorAll('button').forEach(b => {
    if (!b.textContent.endsWith('s') || !/\d/.test(b.textContent)) {
      b.disabled = false;
    }
  });
}

// ---------- WIN/LOSE ----------
function checkFaint() {
  if (eHp <= 0) { showEndBanner('YOU WIN!'); return true; }
  if (pHp <= 0) { showEndBanner('You lost...'); return true; }
  return false;
}
function showEndBanner(msg) {
  freezeMoves();
  const banner = document.createElement('div');
  banner.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.9);display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;font-size:3rem;z-index:9999;';
  banner.innerHTML = `<h1>${msg}</h1><button class="neon-btn" style="margin-top:2rem;padding:1rem 2rem;font-size:1.5rem;" onclick="location.href='gamemaster.html'">Back to Choose</button>`;
  document.body.appendChild(banner);
}

// ---------- MANA REGEN ----------
setInterval(() => {
  if (playerMon && playerMon.mana < playerMon.maxMana) {
    playerMon.mana = Math.min(playerMon.maxMana, playerMon.mana + 3);
    renderMana();
  }
  if (enemyMon && enemyMon.mana < enemyMon.maxMana) {
    enemyMon.mana = Math.min(enemyMon.maxMana, enemyMon.mana + 3);
    renderEnemyMana();
  }
}, 1000);

// Run away
document.getElementById('runBtn')?.addEventListener('click', () => {
  if (confirm('Run away?')) location.href = 'gamemaster.html';
});