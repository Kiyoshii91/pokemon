/* ----------  DATA  ---------- */
const fighters = [
  {
    id: 4, name: 'Charmander', types: ['fire'],
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png ',
    maxMana: 100, mana: 100,
    armor: 0,
    moves: [
      { name: 'Scratch',       mana:  0, power: 40, cd: 0, desc: 'Basic attack' },
      { name: 'Ember',         mana: 20, power: 60, cd: 2, desc: 'Low-cost fire spit' },
      { name: 'Flame Burst',   mana: 35, power: 80, cd: 4, desc: 'Small AoE burst' },
      { name: 'Inferno Overdrive', mana: 60, power: 130, cd: 10, desc: 'ULT: huge fire blast' }
    ]
  },
  {
    id: 7, name: 'Squirtle', types: ['water'],
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png ',
    maxMana: 100, mana: 100,
    armor: 100,
    moves: [
      { name: 'Tackle',        mana:  0, power: 40, cd: 0, desc: 'Basic attack' },
      { name: 'Water Gun',     mana: 20, power: 60, cd: 2, desc: 'Ranged water shot' },
      { name: 'Aqua Tail',     mana: 35, power: 80, cd: 4, desc: 'Strong tail whip' },
      { name: 'Hydro Vortex',  mana: 60, power: 130, cd: 10, desc: 'ULT: crushing water vortex' }
    ]
  },
  {
    id: 1, name: 'Bulbasaur', types: ['grass','poison'],
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png ',
    maxMana: 100, mana: 100,
    moves: [
      { name: 'Vine Whip',      mana:  0, power: 40, cd: 0, desc: 'Basic grass whip' },
      { name: 'Razor Leaf',     mana: 20, power: 60, cd: 2, desc: 'Sharp leaf barrage' },
      { name: 'Poison Powder',  mana: 35, power: 20, cd: 4, desc: 'Applies poison DOT' },
      { name: 'Bloom Doom',     mana: 60, power: 130, cd: 10, desc: 'ULT: massive plant eruption' }
    ]
  },
    {
      id: 19, name: 'Rattata',   types: ['normal'],            
      sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/19.png  ',
      maxMana: 100, mana: 100,
      moves: [
      { name: 'Tackle',        mana: 0,  power: 40,  baseLow: 1,  baseHigh: 3,  cd: 0,  desc: 'Basic attack' },
      { name: 'Water Gun',     mana: 20, power: 60,  baseLow: 4,  baseHigh: 6,  cd: 2,  desc: 'Ranged water shot' },
      { name: 'Aqua Tail',     mana: 35, power: 80,  baseLow: 7,  baseHigh: 9,  cd: 4,  desc: 'Strong tail whip' },
      { name: 'Hydro Vortex',  mana: 60, power: 130, baseLow: 10, baseHigh: 11, cd: 10, desc: 'ULT: crushing water vortex' }
    ]
  }
];
const arenas = [
  {id:'Arena',name:'Colosseum',thumb:'images/arena.png'}
];

let selectedFighter = null;
let selectedArena   = null;

/* ----------  RENDER  ---------- */
function renderFighters(){
  const grid=document.getElementById('pokeGrid');
  grid.innerHTML=fighters.map(f=>`
    <div class="poke-card" onclick="selectFighter(${f.id})">
      <img src="${f.sprite}" alt="${f.name}">
      <div>${f.name}</div>
      <div>${f.types.map(t=>`<span class="type-badge ${t}">${t}</span>`).join('')}</div>
    </div>`).join('');
}
function renderArenas(){
  const grid=document.getElementById('mapGrid');
  grid.innerHTML=arenas.map(a=>`
    <div class="map-card" onclick="selectArena('${a.id}')">
      <img src="${a.thumb}" alt="${a.name}">
      <div>${a.name}</div>
    </div>`).join('');
}

/* ----------  SELECTION  ---------- */
function selectFighter(id){
  document.querySelectorAll('.poke-card').forEach(c=>c.classList.remove('selected'));
  document.querySelector(`.poke-card[onclick="selectFighter(${id})"]`).classList.add('selected');
  selectedFighter = id;
  checkReady();
}
function selectArena(id){
  document.querySelectorAll('.map-card').forEach(c=>c.classList.remove('selected'));
  document.querySelector(`.map-card[onclick="selectArena('${a.id}')"]`).classList.add('selected');
  selectedArena = id;
  checkReady();
}

/* ----------  LINK GUARD  ---------- */
const startLink = document.getElementById('startBtn');

function checkReady(){
  const ok = selectedFighter;
  startLink.classList.toggle('disabled', !ok);
  startLink.style.pointerEvents = ok ? 'auto' : 'none';
  startLink.style.opacity       = ok ? '1'   : '0.5';
}

startLink.addEventListener('click', e => {
  if (!selectedFighter){
    e.preventDefault();
    quickToast('Pick a Pokémon AND an arena first!');
  }
});

function quickToast(msg){
  const t = Object.assign(document.createElement('div'), {
    textContent: msg,
    style: `position:fixed;top:20%;left:50%;transform:translateX(-50%);
            background:#f0f;color:#fff;padding:10px 20px;border-radius:8px;
            font-weight:bold;z-index:9999;animation:fade 1.5s forwards;`
  });
  document.body.appendChild(t);
  setTimeout(()=>t.remove(), 1500);
}

startLink.addEventListener('click', e => {
  if (!selectedFighter){
    e.preventDefault();
    quickToast('Pick a Pokémon first!');
    return;
  }
  const url = `gameplay.html?fighter=${selectedFighter}`;
  startLink.href = url; 
  alert(`You chose ${fighters.find(f=>f.id===selectedFighter).name}!`);
});

/* ----------  30-s AUTO-REDIRECT  ---------- */
const LOCK_TIME = 30;
let timeLeft   = LOCK_TIME;
let locked     = false;
const timerBar = document.createElement('div');
timerBar.style.cssText = `
  position:fixed; top:0; left:0; height:6px; width:100%;
  background:#00c3ff; transform-origin:left;
  transition:transform ${LOCK_TIME}s linear;
  z-index:9999;
`;
document.body.appendChild(timerBar);
requestAnimationFrame(() => timerBar.style.transform = 'scaleX(0)');

const interval = setInterval(() => {
  if (--timeLeft <= 0 && !locked) autoLock();
}, 1000);

function autoLock(){
  locked = true;
  clearInterval(interval);
  location.href = selectedFighter
    ? `gameplay.html?fighter=${selectedFighter}`   // picked → play
    : 'menu.html';                                // nothing → menu
}

/* ----------  START BUTTON  ---------- */
startLink.addEventListener('click', e => {
  if (locked) return;
  if (!selectedFighter){
    e.preventDefault();
    quickToast('Pick a Pokémon first!');
    return;
  }
  locked = true;
  clearInterval(interval);
  location.href = `gameplay.html?fighter=${selectedFighter}`;
});

/* ----------  INIT  ---------- */
renderFighters();
renderArenas();
checkReady();