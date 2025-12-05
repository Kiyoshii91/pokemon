const fighters = [
  {
    id: 4, name: 'Charmander', types: ['fire'],
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png    ',
    maxMana: 750, mana: 750, armor: 3000,
    moves: [
      { name: 'Spit-Fire', mana: 0, power: 40, baseLow: 1, baseHigh: 3, cd: 2, desc: 'Basic attack' },
      { name: 'Flame On~', mana: 0, power: 2, baseLow: 4, baseHigh: 6, cd: 5, manaGain: '50%', desc: '' },
      { name: 'Flame Burst', mana: 35, power: 80, baseLow: 7, baseHigh: 9, cd: 8, trueDmg: true, desc: 'Small AoE burst' },
      { name: 'Inferno Overdrive', mana: 60, power: 150, baseLow: 10, baseHigh: 12, stun:1, trueDmg:true, cd: 25, lifesteal: '30%', desc: 'ULT: huge fire blast' }
    ]
  },
  {
    id: 7, name: 'Squirtle', types: ['water'],
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png    ',
    maxMana: 750, mana: 750, armor: 2800,
    moves: [
      { name: 'Water Blow', mana: 0, power: 40, baseLow: 1, baseHigh: 3, cd: 2, desc: 'Basic attack' },
      { name: 'Water Gun', mana: 20, power: 60, baseLow: 4, baseHigh: 6, cd: 5, stun:1, desc: 'Ranged water shot' },
      { name: 'Aqua Tail', mana: 25, power: 40, baseLow: 7, baseHigh: 9, cd: 8, trueDmg:true, lifesteal: '50%', desc: 'Strong tail whip' },
      { name: 'Hydro Vortex', mana: 50, power: 150, baseLow: 10, baseHigh: 12, cd: 23, trueDmg:true, manaGain: '80%', desc: 'ULT: crushing water vortex' }
    ]
  },
  {
    id: 1, name: 'Bulbasaur', types: ['grass', 'poison'],
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png    ',
    maxMana: 750, mana: 750, armor: 2700,
    moves: [
      { name: 'Vine Whip', mana: 0, power: 40, baseLow: 1, baseHigh: 3, cd: 2, desc: 'Basic grass whip' },
      { name: 'Razor Leaf', mana: 20, power: 60, baseLow: 4, baseHigh: 6, cd: 5,trueDmg:true, lifesteal: '40%', desc: 'Sharp leaf barrage' },
      { name: 'Poison Powder', mana: 35, power: 20, baseLow: 7, baseHigh: 9, stun: 2, cd: 8, desc: 'Applies poison DOT' },
      { name: 'Bloom Doom', mana: 60, power: 153, baseLow: 10, baseHigh: 12, cd: 16, trueDmg:true, desc: 'ULT: massive plant eruption' }
    ]
  },
  {
    id: 19, name: 'Rattata', types: ['normal'],
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/19.png    ',
    maxMana: 750, mana: 750, armor: 3600,
    moves: [
      { name: 'Face Slap', mana: 0, power: 40, baseLow: 1, baseHigh: 3, cd: 2, desc: 'Basic attack' },
      { name: 'Recover', mana: 45, power: 0, baseLow: 4, baseHigh: 6, cd: 15, heal: 100, desc: 'Heals self' },
      { name: 'Hand Thrust', mana: 50, power: 50, baseLow: 7, baseHigh: 9, stun: 1, cd: 16, desc: 'Strong tail whip' },
      { name: 'Thousand Kicks', mana: 100, power: 145, baseLow: 10, baseHigh: 12, cd: 16, trueDmg: true, desc: 'ULT: crushing water vortex' }
    ]
  }
];

/* ----------  PLAYER  ---------- */
const params = new URLSearchParams(location.search);
const fighterId = Number(params.get('fighter'));
const playerMon = fighters.find(f => f.id === fighterId) || fighters[0];

/* ----------  ENEMY (same pool)  ---------- */
const enemyPool = fighters;
const enemyTpl = enemyPool[Math.floor(Math.random() * enemyPool.length)];
const enemyMon = { ...enemyTpl, maxMana: 100, mana: 100 };

/* ----------  HP / MP / ARMOR  ---------- */
const maxHp = 5000;
let pHp = maxHp, eHp = maxHp;
playerMon.mana = playerMon.maxMana;
enemyMon._stunTurns = 0; // enemy stun counter
playerMon._stunTurns = 0; // player stun counter

/* ----------  DEPLETING ARMOR  ---------- */
const maxArmor = 4500; // visual scale for bar
playerMon.currentArmor = playerMon.armor || 0;
enemyMon.currentArmor  = enemyMon.armor  || 0;

/* ----------  DOM  ---------- */
const pName = document.getElementById('pName');
const pSprite = document.getElementById('pSprite');
const pTypes = document.getElementById('pTypes');
const pHpBar = document.getElementById('pHp');

const eName = document.getElementById('eName');
const eSprite = document.getElementById('eSprite');
const eTypes = document.getElementById('eTypes');
const eHpBar = document.getElementById('eHp');

const movePanel = document.getElementById('movePanel');

/* ----------  TURN TIMER (5 s)  ---------- */
let turnTimer = null;
const TURN_SECS = 5;

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
      setTimeout(enemyTurn, 500);
    }
  }, 200);
}
function clearTurnTimer() {
  clearInterval(turnTimer);
  turnTimer = null;
}

/* ----------  COOLDOWN MANAGER  ---------- */
const handlers = new Map();
function startCooldown(btn, secs) {
  const original = handlers.get(btn) ?? btn.onclick;
  handlers.set(btn, original);
  btn.onclick = null;
  btn.disabled = true;
  let left = secs;
  const end = Date.now() + left * 1000;
  const tick = setInterval(() => {
    left = Math.ceil((end - Date.now()) / 1000);
    btn.textContent = left + 's';
    if (left <= 0) {
      clearInterval(tick);
      btn.textContent = btn.dataset.move;
      btn.disabled = false;
      btn.onclick = original;
    }
  }, 200);
}

/* ----------  INIT DISPLAY  ---------- */
function init() {
  pName.textContent = playerMon.name;
  pSprite.src = playerMon.sprite;
  pTypes.textContent = playerMon.types.join('/');
  eName.textContent = enemyMon.name;
  eSprite.src = enemyMon.sprite;
  eTypes.textContent = enemyMon.types.join('/');
  updateBars();
  renderMana();
  renderArmor(); // armor bar
}

/* ----------  BARS  ---------- */
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

/* ----------  ARMOR BAR  ---------- */
function renderArmor() {
  const pBar = document.getElementById('pArmor');
  const eBar = document.getElementById('eArmor');
  if (!pBar) return;
  const pVal = playerMon.currentArmor || 0;
  const eVal = enemyMon.currentArmor || 0;
  pBar.style.display = pVal > 0 ? 'block' : 'none';
  eBar.style.display = eVal > 0 ? 'block' : 'none';
  pBar.style.width = Math.min(100, (pVal / maxArmor) * 100) + '%';
  eBar.style.width = Math.min(100, (eVal / maxArmor) * 100) + '%';
}

/* ----------  BATTLE LOG  ---------- */
function addLog(text, isEnemy) {
  const box = document.getElementById('battleLog');
  const p = document.createElement('p');
  p.className = isEnemy ? 'enemy' : 'player';
  p.textContent = text;
  box.appendChild(p);
  box.scrollTop = box.scrollHeight;
}

/* ----------  SPECIAL-EFFECT HELPER  ---------- */
function handleSpecials(move, isPlayer, dmg) {
  const subject = isPlayer ? playerMon : enemyMon;
  const target = isPlayer ? enemyMon : playerMon;

  // mana
  if (move.manaGain) {
    const gain = typeof move.manaGain === 'string' && move.manaGain.endsWith('%')
      ? Math.floor(dmg * parseFloat(move.manaGain) / 100)
      : move.manaGain;
    subject.mana = Math.min(subject.maxMana, subject.mana + gain);
    addLog(`${subject.name} gained ${gain} MP`, !isPlayer);
  }

  // lifesteal
  if (move.lifesteal) {
    const heal = typeof move.lifesteal === 'string' && move.lifesteal.endsWith('%')
      ? Math.floor(dmg * parseFloat(move.lifesteal) / 100)
      : move.lifesteal;
    const newHp = (isPlayer ? pHp : eHp) + heal;
    if (isPlayer) pHp = Math.min(maxHp, newHp);
    else eHp = Math.min(maxHp, newHp);
    addLog(`${subject.name} drained ${heal} HP`, !isPlayer);
  }

  // self-heal
  if (move.heal) {
    const heal = typeof move.heal === 'string' && move.heal.endsWith('%')
      ? Math.floor(subject.maxHp * parseFloat(move.heal) / 100)
      : move.heal;
    const newHp = (isPlayer ? pHp : eHp) + heal;
    if (isPlayer) pHp = Math.min(maxHp, newHp);
    else eHp = Math.min(maxHp, newHp);
    addLog(`${subject.name} recovered ${heal} HP`, !isPlayer);
  }

  // stun (bidirectional)
  if (move.stun) {
    const turns = typeof move.stun === 'number' ? move.stun : 1;
    target._stunTurns = turns;
    addLog(`${target.name} is stunned for ${turns} turn(s)!`, isPlayer);
  }
}

/* ----------  NEW ATTACK (trueDmg bypasses + 50 % armor damage)  ---------- */
function attack(move, isPlayer) {
  const power = move.power;
  const isUlt = /overdrive|vortex|doom/i.test(move.name);
  const base  = Math.floor(Math.random() * (move.baseHigh - move.baseLow + 1) + move.baseLow);
  let dmg = Math.floor(base * power * (isUlt ? 1 : 1));

  //armor
  const target = isPlayer ? enemyMon : playerMon;
  const armor  = target.currentArmor || 0;

  if (move.trueDmg) {
    // 1.  TRUE  →  full HP dmg
    // 2.  also shred 50 % of dmg from armor (min 0)
    const shred = Math.floor(dmg * 0.5);
    target.currentArmor = Math.max(0, armor - shred);
    addLog(`${target.name}'s armor was shredded for ${shred} (true)!`, !isPlayer);
    renderArmor();

  } else {
    // normal depleting armor
    if (armor > 0) {
      const armorDmg = Math.min(armor, dmg);
      target.currentArmor -= armorDmg;
      dmg -= armorDmg;
      addLog(`${target.name}'s armor absorbed ${armorDmg} dmg!`, !isPlayer);
      renderArmor();
    }
  }

  // apply final dmg to HP
  if (isPlayer) {
    eHp = Math.max(0, eHp - dmg);
    addLog(`${playerMon.name} used ${move.name} & dealt ${dmg} dmg`, false);
  } else {
    pHp = Math.max(0, pHp - dmg);
    addLog(`${enemyMon.name} used ${move.name} & dealt ${dmg} dmg`, true);
  }

  handleSpecials(move, isPlayer, dmg);
  updateBars();
  if (checkFaint()) return;
  if (!isPlayer) thawMoves();
}

/* ----------  END CHECK  ---------- */
function checkFaint() {
  if (eHp <= 0) { showEndBanner('You Win!'); return true; }
  if (pHp <= 0) { showEndBanner('Enemy Wins!'); return true; }
  return false;
}
function showEndBanner(message) {
  freezeMoves();
  const banner = document.createElement('div');
  banner.style.cssText = `
    position:fixed; inset:0; background:rgba(0,0,0,.85);
    display:flex; flex-direction:column; align-items:center; justify-content:center;
    color:#fff; font-family:sans-serif; z-index:9999;
  `;
  const txt = document.createElement('h1');
  txt.textContent = message;
  txt.style.fontSize = '4rem'; txt.style.marginBottom = '1.5rem';
  const btn = document.createElement('button');
  btn.textContent = 'Main Menu'; btn.className = 'neon-btn';
  btn.onclick = () => location.href = 'menu.html';
  banner.append(txt, btn); document.body.appendChild(banner);
}

/* ----------  MOVE BUTTONS  ---------- */
function renderMoveButtons() {
  const panel = document.getElementById('movePanel');
  panel.innerHTML = '';
  playerMon.moves.forEach((mv) => {
    const btn = document.createElement('button');
    btn.className = /overdrive|vortex|doom/i.test(mv.name) ? 'move-btn ult' : 'move-btn';
    btn.textContent = mv.name;
    btn.dataset.move = mv.name;
    btn.dataset.power = mv.power;
    btn.dataset.manacost = mv.mana;
    btn.title = `${mv.desc} (${mv.mana} MP)`;

    btn.onclick = function () {
      if (playerMon.mana < mv.mana) { addLog('Not enough Mana.', false); return; }
      if (playerMon._stunTurns > 0) return; // locked while stunned
      clearTurnTimer();
      playerMon.mana -= mv.mana;
      renderMana();
      let finalPower = 1;
      if (mv.name === 'Ember' && enemyMon.types.includes('grass')) finalPower = 1.5;
      if (mv.name === 'Water Gun' && enemyMon.types.includes('fire')) finalPower = 1.5;
      if (mv.name === 'Vine Whip' && enemyMon.types.includes('water')) finalPower = 1.5;
      attack(mv, true);
      freezeMoves();
      setTimeout(enemyTurn, 1500);
      startCooldown(btn, mv.cd);
    };
    panel.appendChild(btn);
  });
}

/* ----------  ENEMY TURN (bidirectional stun)  ---------- */
function enemyTurn() {
  // 1. player stunned → skip & decrement
  if (playerMon._stunTurns > 0) {
    playerMon._stunTurns--;
    addLog(`${playerMon.name} is stunned and skips!`, false);
  }
  // 2. enemy stunned → skip & decrement
  if (enemyMon._stunTurns > 0) {
    enemyMon._stunTurns--;
    addLog(`${enemyMon.name} is stunned and skips!`, true);
    thawMoves();
    startTurnTimer();
    return;
  }
  // 3. normal enemy turn
  const affordable = enemyMon.moves.filter(m => enemyMon.mana >= m.mana);
  if (affordable.length === 0) {
    addLog(`${enemyMon.name} has no MP and skips its turn!`, true);
    thawMoves();
    startTurnTimer();
    return;
  }

  const move = affordable[Math.floor(Math.random() * affordable.length)];
  enemyMon.mana -= move.mana;
  attack(move, false);
  renderEnemyMana();
  thawMoves();
  startTurnTimer();
}

/* ----------  FREEZE / THAW  ---------- */
function freezeMoves() {
  movePanel.querySelectorAll('button').forEach(b => b.disabled = true);
}
function thawMoves() {
  movePanel.querySelectorAll('button').forEach(b => b.disabled = false);
}

/* ----------  MANA REGEN  ---------- */
setInterval(() => {
  if (playerMon.mana < playerMon.maxMana) {
    playerMon.mana = Math.min(playerMon.maxMana, playerMon.mana + 2);
    renderMana();
  }
  if (enemyMon.mana < enemyMon.maxMana) {
    enemyMon.mana = Math.min(enemyMon.maxMana, enemyMon.mana + 2);
    renderEnemyMana();
  }
}, 1000);

document.getElementById('runBtn').onclick = () => confirm('Quit battle?');
window.addEventListener('DOMContentLoaded', () => {
  renderMoveButtons();
  init();
  startTurnTimer();
});