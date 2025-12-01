/* ----------  shared data  ---------- */
const fighters = [
  {
    id: 4, name: 'Charmander', types: ['fire'],
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png    ',
    maxMana: 100, mana: 100,
    moves: [
      { name: 'Scratch',       mana: 0,  power: 40,  baseLow: 1,  baseHigh: 3,  cd: 0,  desc: 'Basic attack' },
      { name: 'Ember',         mana: 20, power: 60,  baseLow: 4,  baseHigh: 6,  cd: 5,  desc: 'Low-cost fire spit' },
      { name: 'Flame Burst',   mana: 35, power: 80,  baseLow: 7,  baseHigh: 9,  cd: 8,  desc: 'Small AoE burst' },
      { name: 'Inferno Overdrive', mana: 60, power: 130, baseLow: 10, baseHigh: 12, cd: 16, desc: 'ULT: huge fire blast' }
    ]
  },
  {
    id: 7, name: 'Squirtle', types: ['water'],
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png    ',
    maxMana: 100, mana: 100,
    moves: [
      { name: 'Tackle',        mana: 0,  power: 40,  baseLow: 1,  baseHigh: 3,  cd: 0,  desc: 'Basic attack' },
      { name: 'Water Gun',     mana: 20, power: 60,  baseLow: 4,  baseHigh: 6,  cd: 5,  desc: 'Ranged water shot' },
      { name: 'Aqua Tail',     mana: 35, power: 80,  baseLow: 7,  baseHigh: 9,  cd: 8,  desc: 'Strong tail whip' },
      { name: 'Hydro Vortex',  mana: 60, power: 130, baseLow: 10, baseHigh: 12, cd: 16, desc: 'ULT: crushing water vortex' }
    ]
  },
  {
    id: 1, name: 'Bulbasaur', types: ['grass','poison'],
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png    ',
    maxMana: 100, mana: 100,
    moves: [
      { name: 'Vine Whip',      mana: 0,  power: 40,  baseLow: 1, baseHigh: 3,  cd: 0,  desc: 'Basic grass whip' },
      { name: 'Razor Leaf',     mana: 20, power: 60,  baseLow: 4,  baseHigh: 6,  cd: 5,  desc: 'Sharp leaf barrage' },
      { name: 'Poison Powder',  mana: 35, power: 20,  baseLow: 7,  baseHigh: 9,  cd: 8,  desc: 'Applies poison DOT' },
      { name: 'Bloom Doom',     mana: 60, power: 130, baseLow: 10, baseHigh: 12, cd: 16, desc: 'ULT: massive plant eruption' }
    ]
  },
    {
      id: 19, name: 'Rattata',   types: ['normal'],            
      sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/19.png    ',
      maxMana: 100, mana: 100,
      moves: [
      { name: 'Tackle',        mana: 0,  power: 40,  baseLow: 1,  baseHigh: 3,  cd: 0,  desc: 'Basic attack' },
      { name: 'Water Gun',     mana: 20, power: 60,  baseLow: 4,  baseHigh: 6,  cd: 5,  desc: 'Ranged water shot' },
      { name: 'Aqua Tail',     mana: 35, power: 80,  baseLow: 7,  baseHigh: 9,  cd: 8,  desc: 'Strong tail whip' },
      { name: 'Hydro Vortex',  mana: 60, power: 130, baseLow: 10, baseHigh: 12, cd: 16, desc: 'ULT: crushing water vortex' }
    ]
  }
];

const enemies = [
  { id: 19, name: 'Rattata',   types: ['normal'],            sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/19.png    ' },
  { id: 16, name: 'Pidgey',    types: ['normal', 'flying'],  sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png    ' },
  { id: 10, name: 'Caterpie',  types: ['bug'],               sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png    ' }
];

/* ----------  read chosen fighter  ---------- */
const params    = new URLSearchParams(location.search);
const fighterId = Number(params.get('fighter'));
const playerMon = fighters.find(f => f.id === fighterId) || fighters[0];
const enemyMon  = enemies[Math.floor(Math.random() * enemies.length)];
enemyMon.maxMana = 100;
enemyMon.mana    = enemyMon.maxMana;

/* ----------  HP / MP  ---------- */
const maxHp = 5000;
let pHp = maxHp, eHp = maxHp;
playerMon.mana = playerMon.maxMana;

/* ----------  DOM  ---------- */
const pName   = document.getElementById('pName');
const pSprite = document.getElementById('pSprite');
const pTypes  = document.getElementById('pTypes');
const pHpBar  = document.getElementById('pHp');

const eName   = document.getElementById('eName');
const eSprite = document.getElementById('eSprite');
const eTypes  = document.getElementById('eTypes');
const eHpBar  = document.getElementById('eHp');

const movePanel = document.getElementById('movePanel');

/* ----------  COOLDOWN MANAGER  (removes/restores handler)  ---------- */
const cooldowns = {};   // btn -> seconds left
function startCooldown(btn, secs) {
  if (secs <= 0) return;
  btn.disabled = true;
  btn.onclick  = null;                          // ★ kill handler immediately

  let left = secs;
  const end = Date.now() + left * 1000;
  const tick = setInterval(() => {
    left = Math.ceil((end - Date.now()) / 1000);
    if (left <= 0) {
      clearInterval(tick);
      btn.disabled = false;
      btn.textContent = btn.dataset.move;
      delete cooldowns[btn];
      btn.onclick = btn._originalHandler;      // ★ restore handler
    } else {
      btn.textContent = left + 's';
    }
  }, 200);
}

/* ----------  INIT DISPLAY  ---------- */
function init() {
  pName.textContent   = playerMon.name;
  pSprite.src         = playerMon.sprite;
  pTypes.textContent  = playerMon.types.join('/');
  eName.textContent   = enemyMon.name;
  eSprite.src         = enemyMon.sprite;
  eTypes.textContent  = enemyMon.types.join('/');
  updateBars();
  renderMana();
}

/* ----------  BAR UTIL  ---------- */
function updateBars() {
  pHpBar.style.width = (pHp / maxHp * 100) + '%';
  eHpBar.style.width = (eHp / maxHp * 100) + '%';
}

/* ----------  MANA BARS (no text)  ---------- */
function renderMana() {
  document.getElementById('pMp').style.width = (playerMon.mana / playerMon.maxMana * 100) + '%';
}
function renderEnemyMana() {
  document.getElementById('eMp').style.width = (enemyMon.mana / enemyMon.maxMana * 100) + '%';
}

/* ----------  BATTLE LOG  ---------- */
function addLog(text, isEnemy) {
  const box = document.getElementById('battleLog');
  const p   = document.createElement('p');
  p.className = isEnemy ? 'enemy' : 'player';
  p.textContent = text;
  box.appendChild(p);
  box.scrollTop = box.scrollHeight;
}

/* ----------  DAMAGE  (uses move object)  ---------- */
function attack(move, isPlayer) {
  const power   = move.power;
  const isUlt   = move.name.toLowerCase().includes('overdrive') ||
                  move.name.toLowerCase().includes('vortex')  ||
                  move.name.toLowerCase().includes('doom');

  const base    = Math.floor(Math.random() * (move.baseHigh - move.baseLow + 1) + move.baseLow);
  const ultMult = isUlt ? 1 : 1;
  const dmg     = Math.floor(base * power * ultMult);

  if (isPlayer) {
    eHp = Math.max(0, eHp - dmg);
    addLog(`${playerMon.name} used ${move.name} & dealt ${dmg} dmg`, false);
  } else {
    pHp = Math.max(0, pHp - dmg);
    addLog(`${enemyMon.name} used ${move.name} & dealt ${dmg} dmg`, true);
  }
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

/* ----------  MOVE BUTTONS  (cooldown-safe)  ---------- */
function renderMoveButtons() {
  const panel = document.getElementById('movePanel');
  panel.innerHTML = '';
  playerMon.moves.forEach((mv) => {
    const btn = document.createElement('button');
    btn.className = mv.name.toLowerCase().includes('overdrive') ? 'move-btn ult' : 'move-btn';
    btn.textContent = mv.name;
    btn.dataset.move = mv.name;
    btn.dataset.power = mv.power;
    btn.dataset.manacost = mv.mana;
    btn.title = `${mv.desc} (${mv.mana} MP)`;

    btn.onclick = function () {
      if (btn.disabled) return;                   // still counting
      const move = playerMon.moves.find(m => m.name === btn.dataset.move);
      if (!move) return;

      if (playerMon.mana < move.mana) { addLog('Not enough MP!', false); return; }

      playerMon.mana -= move.mana;
      renderMana();

      let finalPower = 1;
      if (move.name === 'Ember'     && enemyMon.types.includes('grass')) finalPower = 1.5;
      if (move.name === 'Water Gun' && enemyMon.types.includes('fire'))  finalPower = 1.5;
      if (move.name === 'Vine Whip' && enemyMon.types.includes('water')) finalPower = 1.5;

      attack(move, true);
      freezeMoves();
      setTimeout(enemyTurn, 1500);

      startCooldown(btn, move.cd);   // start timer
    };

    panel.appendChild(btn);
  });
}
/* ----------  ENEMY TURN  ---------- */
function enemyTurn() {
  const move = playerMon.moves[Math.floor(Math.random() * 4)];
  if (enemyMon.mana < move.mana) {
    attack({ name: 'Struggle', power: 40, baseLow: 10, baseHigh: 19 }, false);
  } else {
    enemyMon.mana -= move.mana;
    attack(move, false);
  }
  renderEnemyMana();
  thawMoves();         
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

/* ----------  RUN BUTTON  ---------- */
document.getElementById('runBtn').onclick = () => confirm('Quit battle?');

/* ----------  START  ---------- */
window.addEventListener('DOMContentLoaded', () => {
  renderMoveButtons();
  init();
}); 