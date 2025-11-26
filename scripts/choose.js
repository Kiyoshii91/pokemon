/* ----------  DATA  ---------- */
const fighters = [
  {id:4 , name:'Charmander', types:['fire'] , sprite:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png'},
  {id:7 , name:'Squirtle'  , types:['water'], sprite:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png'},
  {id:1 , name:'Bulbasaur' , types:['grass','poison'], sprite:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'}
];
const arenas = [
  {id:'morning',name:'Morning Plains',thumb:'images/MorningSun.jpg'},
  {id:'midnight',name:'Midnight Valley',thumb:'images/MidnightValley.jpg'},
  {id:'sky',name:'Sky Atlas',thumb:'images/SkyAtlas.png'}
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
  selectedFighter=id; enableStart();
}
function selectArena(id){
  document.querySelectorAll('.map-card').forEach(c=>c.classList.remove('selected'));
  document.querySelector(`.map-card[onclick="selectArena('${id}')"]`).classList.add('selected');
  selectedArena=id; enableStart();
}
function enableStart(){
  document.getElementById('startBtn').disabled=!(selectedFighter && selectedArena);
}

/* ----------  CONFIRM  ---------- */
function confirmChoices(){
  if(!selectedFighter || !selectedArena) return;
  const f=fighters.find(x=>x.id===selectedFighter);
  const a=arenas.find(x=>x.id===selectedArena);
  alert(`Fighter: ${f.name}\nArena: ${a.name}\n\n→ Battle loading soon…`);
  // TODO: send choices to real battle engine
}

const startLink = document.getElementById('startBtn');
let pickedPoke = false;
let pickedMap  = false;

function checkReady(){
  startLink.classList.toggle('disabled', !(pickedPoke && pickedMap));
  startLink.style.pointerEvents = (pickedPoke && pickedMap) ? 'auto' : 'none';
}

// call this after each selection
function selectPokemon(id){
  pickedPoke = true; checkReady();
}
function selectMap(id){
  pickedMap = true; checkReady();
}

// initial state
checkReady();
/* ----------  INIT  ---------- */
renderFighters();
renderArenas();