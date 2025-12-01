/* ==========================================
   BATTLE.JS  –  4-skill moveset + Mana
   ========================================== */
(function(){

/* ----------  CONFIG  ---------- */
const LOCK_TIME      = 30;        // choose timer (sec) – re-use if you want
const MANA_REGEN_PER_SEC = 3;     // MP restored each second
const MANA_COLOR     = '#00c3ff';
const ULT_COLOR      = 'crimson';

/* ----------  FIGHTER DATA  ---------- */
const fighters = [
  {
    id: 4, name: 'Charmander', types: ['fire'],
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
    maxMana: 100, mana: 100,
    moves: [
      { name: 'Scratch',       mana:  0, power: 40, cd: 0, desc: 'Basic attack' },
      { name: 'Ember',         mana: 20, power: 60, cd: 2, desc: 'Low-cost fire spit' },
      { name: 'Flame Burst',   mana: 35, power: 80, cd: 4, desc: 'Small AoE burst' },
      { name: 'Inferno Overdrive', mana: 60, power: 130, cd: 10, desc: 'ULT: huge fire blast' }
    ]
  },
  {
    id: 7, name: 'Squirtle', types: ['water'],
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',
    maxMana: 100, mana: 100,
    moves: [
      { name: 'Tackle',        mana:  0, power: 40, cd: 0, desc: 'Basic attack' },
      { name: 'Water Gun',     mana: 20, power: 60, cd: 2, desc: 'Ranged water shot' },
      { name: 'Aqua Tail',     mana: 35, power: 80, cd: 4, desc: 'Strong tail whip' },
      { name: 'Hydro Vortex',  mana: 60, power: 130, cd: 10, desc: 'ULT: crushing water vortex' }
    ]
  },
  {
    id: 1, name: 'Bulbasaur', types: ['grass','poison'],
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    maxMana: 100, mana: 100,
    moves: [
      { name: 'Vine Whip',      mana:  0, power: 40, cd: 0, desc: 'Basic grass whip' },
      { name: 'Razor Leaf',     mana: 20, power: 60, cd: 2, desc: 'Sharp leaf barrage' },
      { name: 'Poison Powder',  mana: 35, power: 20, cd: 4, desc: 'Applies poison DOT' },
      { name: 'Bloom Doom',     mana: 60, power: 130, cd: 10, desc: 'ULT: massive plant eruption' }
    ]
  }
];

/* ----------  GRAB CHOSEN FIGHTER  ---------- */
const params    = new URLSearchParams(location.search);
const fighterId = Number(params.get('fighter'));
const pokemon   = fighters.find(f => f.id === fighterId);
if (!pokemon) { location.href = 'index.html'; }   // safety redirect

/* ----------  STATE  ---------- */
let locked = false;

/* ----------  DOM HELPERS  ---------- */
function make(tag, attr = {}, ...kids){
  const el = Object.assign(document.createElement(tag), attr);
  kids.forEach(k => el.append(k));
  return el;
}

/* ----------  BUILD UI  ---------- */
const skillBar = make('div', { id: 'skillbar' });
const manaGlobe = make('div', { id: 'manaGlobe', textContent: 'MP: ' });
const manaSpan  = make('span', { textContent: pokemon.mana });
manaGlobe.append(manaSpan, `/${pokemon.maxMana}`);

pokemon.moves.forEach((move, idx)=>{
  const btn = make('button', {
    className: idx === 3 ? 'skill ult' : 'skill',
    textContent: move.name,
    title: `${move.desc} (${move.mana} MP, CD ${move.cd}s)`
  });
  btn.dataset.slot = idx;
  btn.onclick = () => cast(idx);
  skillBar.appendChild(btn);
});

document.body.append(skillBar, manaGlobe);

/* ----------  STYLE  ---------- */
const style = make('style', { textContent: `
#skillbar{position:fixed;bottom:20px;left:50%;transform:translateX(-50%);display:flex;gap:8px;z-index:100}
.skill{padding:10px 18px;border:none;border-radius:6px;background:#444;color:#fff;font-weight:bold;cursor:pointer}
.skill:disabled{opacity:.4;cursor:not-allowed}
.skill.ult{background:${ULT_COLOR}}
#manaGlobe{position:fixed;bottom:80px;left:50%;transform:translateX(-50%);color:${MANA_COLOR};font-weight:bold}
`});
document.head.appendChild(style);

/* ----------  MANA REGEN  ---------- */
setInterval(()=>{
  if (pokemon.mana < pokemon.maxMana) {
    pokemon.mana = Math.min(pokemon.maxMana, pokemon.mana + MANA_REGEN_PER_SEC);
    renderMana();
  }
}, 1000);

/* ----------  CAST LOGIC  ---------- */
function cast(slot){
  if (locked) return;
  const move = pokemon.moves[slot];
  const btn  = document.querySelector(`[data-slot="${slot}"]`);

  if (pokemon.mana < move.mana)  return flash('Not enough MP!');
  if (btn.dataset.cooldown)      return flash('Skill on cooldown!');

  pokemon.mana -= move.mana;
  renderMana();
  startCooldown(btn, move.cd);
  doMove(move);
}

function startCooldown(btn, secs){
  btn.dataset.cooldown = 'true';
  btn.disabled = true;
  const end = Date.now() + secs * 1000;
  const ival = setInterval(()=>{
    const left = Math.ceil((end - Date.now()) / 1000);
    if (left <= 0) {
      clearInterval(ival);
      btn.disabled = false;
      delete btn.dataset.cooldown;
      btn.textContent = pokemon.moves[btn.dataset.slot].name;
    } else {
      btn.textContent = left + 's';
    }
  }, 200);
}

function doMove(move){
  console.log(`${pokemon.name} used ${move.name} (${move.power} power)`);
  // plug your own particles / enemy HP reduction here
}

/* ----------  HELPERS  ---------- */
function renderMana(){ manaSpan.textContent = pokemon.mana; }
function flash(msg){
  const t = make('div', {
    textContent: msg,
    style: `position:fixed;top:20%;left:50%;transform:translateX(-50%);
            background:#f0f;color:#fff;padding:10px 20px;border-radius:8px;
            font-weight:bold;z-index:9999;animation:fade 1.5s forwards;`
  });
  document.body.appendChild(t);
  setTimeout(()=>t.remove(), 1500);
}

})();