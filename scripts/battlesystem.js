// battlesystem.js — FULLY FIXED VERSION (copy-paste this)

const fighters = allFighters; // ← from catalog.js (must be loaded first!)

let playerMon = null;
let enemyMon = null;

let pHp = 5000;
let eHp = 5000;
const maxHp = 5000;
const maxArmor = 4500;

let pName, pSprite, pTypes, pHpBar, eName, eSprite, eTypes, eHpBar, movePanel;
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
  playerMon = { ...selected, mana: selected.maxMana, currentArmor: selected.armor || 0, _stunTurns: 0 };
  playerMon.maxMana = playerMon.maxMana || 100; // safety

  const enemyPool = fighters.filter(f => f.id !== fighterId);
  const enemyTpl = enemyPool[Math.floor(Math.random() * enemyPool.length)];
  enemyMon = { ...enemyTpl, mana: 100, maxMana: 100, currentArmor: enemyTpl.armor || 0, _stunTurns: 0 };

  pName = document.getElementById('pName');
  pSprite = document.getElementById('pSprite');
  pTypes = document.getElementById('pTypes');
  pHpBar = document.getElementById('pHp');

  eName = document.getElementById('eName');
  eSprite = document.getElementById('eSprite');
  eTypes = document.getElementById('eTypes');
  eHpBar = document.getElementById('eHp');

  movePanel = document.getElementById('movePanel');

  // 6. Initialize everything
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

// ---------- ATTACK ----------
function attack(move, isPlayer) {
  let dmg = move.power;

  const target = isPlayer ? enemyMon : playerMon;
  let armor = target.currentArmor || 0;

  if (move.trueDmg) {
    const shred = Math.floor(dmg * 0.5);
    target.currentArmor = Math.max(0, armor - shred);
    addLog(`${target.name}'s armor shredded ${shred} (true damage)!`, !isPlayer);
  } else if (armor > 0) {
    const absorbed = Math.min(armor, dmg);
    target.currentArmor -= absorbed;
    dmg -= absorbed;
    addLog(`${target.name}'s armor absorbed ${absorbed}!`, !isPlayer);
  }

  if (isPlayer) {
    eHp = Math.max(0, eHp - dmg);
    addLog(`${playerMon.name} used ${move.name} → ${dmg} damage!`, false);
  } else {
    pHp = Math.max(0, pHp - dmg);
    addLog(`${enemyMon.name} used ${move.name} → ${dmg} damage!`, true);
  }

  renderArmor();
  updateBars();

  if (checkFaint()) return;

  playerMon.mana -= move.mana;
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
    btn.title = `${move.desc} (${move.mana} MP • ${move.cd}s CD)`;

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
    // If button is showing cooldown (e.g. "3s"), leave it disabled
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
  banner.innerHTML = `<h1>${msg}</h1><button class="neon-btn" style="margin-top:2rem;padding:1rem 2rem;font-size:1.5rem;" onclick="location.href='choose.html'">Back to Choose</button>`;
  document.body.appendChild(banner);
}

// ---------- MANA REGEN ----------
setInterval(() => {
  if (playerMon && playerMon.mana < playerMon.maxMana) {
    playerMon.mana = Math.min(playerMon.maxMana, playerMon.mana + 3);
    renderMana();
  }
  if (enemyMon && enemyMon.mana < 100) {
    enemyMon.mana = Math.min(100, enemyMon.mana + 3);
    renderEnemyMana();
  }
}, 1000);

// Run away button
document.getElementById('runBtn')?.addEventListener('click', () => {
  if (confirm('Run away?')) location.href = 'gamemaster.html';
});