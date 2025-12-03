/* ----------  CURRENCY  ---------- */
let gold = Number(localStorage.getItem('gold') || 0);
let gems = Number(localStorage.getItem('gems') || 0);
function spendGold(n){ if(gold>=n){gold-=n;saveAndRefresh(); return true} return false}
function spendGems(n){ if(gems>=n){gems-=n;saveAndRefresh(); return true} return false}
function saveAndRefresh(){
  localStorage.setItem('gold',gold);
  localStorage.setItem('gems',gems);
  document.getElementById('gold').textContent='💰 '+gold;
  document.getElementById('gems').textContent='💎 '+gems;
}

/* ----------  OWNED INVENTORY  ---------- */
const owned = JSON.parse(localStorage.getItem('owned')) || {
  fighters: [4,7,1,19], //Free for 1st Time users
  moves    : {},
  items    : {},
  skins    : []
};

/* ----------  CATALOG BY TYPE (capital keys = your tabs)  ---------- */
const shopCatalog = {
  Fire: [
    {id:4,  name:'Charmander',      price:0,   currency:'gold', sprite:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',   desc:'Starter fire lizard'},
    {id:5,  name:'Charmeleon',      price:1800,currency:'gold', sprite:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png',   desc:'Flaming tail whip'},
    {id:6,  name:'Charizard',       price:5000,currency:'gold', sprite:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',   desc:'Ultimate blaze'},
    {id:37, name:'Vulpix',          price:1800,currency:'gold', sprite:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/37.png',  desc:'Six-tailed fox'},
    {id:38, name:'Ninetales',       price:3000,currency:'gold', sprite:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/38.png',  desc:'Mystic fire'},
    {id:58, name:'Growlithe',       price:1500,currency:'gold', sprite:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/58.png',  desc:'Loyal pup'},
    {id:59, name:'Arcanine',        price:3500,currency:'gold', sprite:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/59.png',  desc:'Legendary speed'},
    {id:77, name:'Ponyta',          price:1500,currency:'gold', sprite:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/77.png',  desc:'Fiery mane'},
    {id:78, name:'Rapidash',        price:3000,currency:'gold', sprite:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/78.png',  desc:'Flame gallop'},
    {id:126,name:'Magmar',          price:2800,currency:'gold', sprite:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/126.png', desc:'Lava brawler'}
  ],

  Water: [
    {id:7,  name:'Squirtle',        price:0,   currency:'gold', sprite:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',   desc:'Starter water turtle'},
    {id:8,  name:'Wartortle',       price:2000,currency:'gold', sprite:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png',   desc:'Jet-water cannons'},
    {id:9,  name:'Blastoise',       price:5000,currency:'gold', sprite:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png',   desc:'Hydro cannon'},
    {id:54, name:'Psyduck',         price:1800,currency:'gold', sprite:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/54.png',  desc:'Confusion duck'},
    {id:55, name:'Golduck',         price:2500,currency:'gold', sprite:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/55.png',  desc:'Swift swimmer'},
    {id:60, name:'Poliwag',         price:1200,currency:'gold', sprite:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/60.png',  desc:'Swirl belly'},
    {id:61, name:'Poliwhirl',       price:2200,currency:'gold', sprite:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/61.png',  desc:'Spiral fighter'},
    {id:62, name:'Poliwrath',       price:3800,currency:'gold', sprite:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/62.png',  desc:'Muscle punch'},
    {id:72, name:'Tentacool',       price:1300,currency:'gold', sprite:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/72.png',  desc:'Jellyfish drift'},
    {id:73, name:'Tentacruel',      price:2800,currency:'gold', sprite:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/73.png',  desc:'Toxic whips'}
  ],

  Normal: [
    {id:19, name:'Rattata',         price:0,   currency:'gold', sprite:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/19.png',  desc:'Quick normal rodent'},
    {id:20, name:'Raticate',        price:1900,currency:'gold', sprite:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/20.png',  desc:'Hyper-fang'},
    {id:16, name:'Pidgey',          price:1800,currency:'gold', sprite:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png',  desc:'Tiny bird'},
    {id:17, name:'Pidgeotto',       price:5000,currency:'gold', sprite:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/17.png',  desc:'Gust master'},
    {id:18, name:'Pidgeot',         price:5500,currency:'gold', sprite:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/18.png',  desc:'Hurricane wings'},
    {id:21, name:'Spearow',         price:1500,currency:'gold', sprite:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/21.png',  desc:'Beak strike'},
    {id:22, name:'Fearow',          price:3200,currency:'gold', sprite:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/22.png',  desc:'Sky piercer'},
    {id:83, name:'Farfetch\'d',     price:2200,currency:'gold', sprite:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/83.png',  desc:'Leek sword'},
    {id:84, name:'Doduo',           price:1700,currency:'gold', sprite:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/84.png',  desc:'Twin sprint'},
    {id:85, name:'Dodrio',          price:3300,currency:'gold', sprite:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/85.png',  desc:'Triple peck'}
  ],

  Poison: [
    {id:1,  name:'Bulbasaur',       price:0,   currency:'gold', sprite:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',   desc:'Grass / poison seed'},
    {id:2,  name:'Ivysaur',         price:2000,currency:'gold', sprite:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png',   desc:'Vine whip pro'},
    {id:3,  name:'Venusaur',        price:4500,currency:'gold', sprite:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png',   desc:'Petal dance'},
    {id:23, name:'Ekans',           price:1900,currency:'gold', sprite:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/23.png',  desc:'Snake wrap'},
    {id:24, name:'Arbok',           price:1900,currency:'gold', sprite:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/24.png',  desc:'Glare & poison'},
    {id:29, name:'Nidoran♀',        price:1500,currency:'gold', sprite:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/29.png',  desc:'Poison pin'},
    {id:30, name:'Nidorina',        price:2500,currency:'gold', sprite:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/30.png',  desc:'Barb strike'},
    {id:31, name:'Nidoqueen',       price:4000,currency:'gold', sprite:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/31.png',  desc:'Toxic tank'},
    {id:32, name:'Nidoran♂',        price:1500,currency:'gold', sprite:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/32.png',  desc:'Poison horn'},
    {id:33, name:'Nidorino',        price:2500,currency:'gold', sprite:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/33.png',  desc:'Venom rush'}
  ],

  Dragon: [
    {id:147,name:'Dratini',         price:6000,currency:'gold', sprite:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/147.png', desc:'Rare dragon snake'},
    {id:148,name:'Dragonair',       price:5500,currency:'gold', sprite:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/148.png', desc:'Mystic dragon'},
    {id:149,name:'Dragonite',       price:5000,currency:'gold', sprite:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png', desc:'Legendary dragon'},
    {id:130,name:'Gyarados',        price:6000,currency:'gold', sprite:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/130.png', desc:'Flying water dragon'},
    {id:6,  name:'Mega-Charizard X',price:7500,currency:'gold', sprite:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',   desc:'Black fire dragon'},
    {id:329,name:'Trapinch',        price:2000,currency:'gold', sprite:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/329.png', desc:'Ant lion'},
    {id:330,name:'Vibrava',         price:3500,currency:'gold', sprite:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/330.png', desc:'Sonic sand'},
    {id:331,name:'Flygon',          price:5000,currency:'gold', sprite:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/331.png', desc:'Desert dragon'},
    {id:246,name:'Larvitar',        price:2500,currency:'gold', sprite:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/246.png', desc:'Mountain baby'},
    {id:247,name:'Pupitar',         price:4000,currency:'gold', sprite:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/247.png', desc:'Cocoon cannon'}
  ]
};

/* ---- render cards ---- */
function renderTab(tab) {
  const list = shopCatalog[tab] || [];
  const grid = document.getElementById('shopContent');
  grid.innerHTML = list.map(item => `
    <div class="card">
      <img src="${item.sprite}" onerror="this.src='images/placeholder.png'">
      <div>${item.name}</div>
      <div class="price">${item.price} ${item.currency === 'gold' ? '💰' : '💎'}</div>
      <button class="buy-btn" data-tab="${tab}" data-id="${item.id}" ${owned.fighters.includes(item.id) ? 'disabled' : ''}>
        ${owned.fighters.includes(item.id) ? 'Owned' : 'Buy'}
      </button>
    </div>
  `).join('');
}

/* ---- tab switching (after DOM ready) ---- */
document.addEventListener('DOMContentLoaded', () => {
  saveAndRefresh();
  renderTab('Fire'); // default

  document.querySelectorAll('.tab').forEach(btn =>
    btn.addEventListener('click', e => {
      document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      renderTab(e.target.dataset.tab);
    })
  );

  /* ---- buy logic ---- */
  document.addEventListener('click', e => {
    if (!e.target.matches('.buy-btn')) return;
    const tab  = document.querySelector('.tab.active').dataset.tab;
    const id   = Number(e.target.dataset.id);
    const item = shopCatalog[tab].find(i => i.id === id);
    if (!item) return;

    const ok = item.currency === 'gold' ? spendGold(item.price) : spendGems(item.price);
    if (!ok) return alert('Not enough currency!');

    owned.fighters.push(item.id);
    localStorage.setItem('owned', JSON.stringify(owned));
    renderTab(tab); // refresh → button becomes “Owned”
  });
});