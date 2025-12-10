/* ==========================================
   MARKETPLACE  –  FULL REPLACEMENT
   ========================================== */

/* ----------  CHAIN  ---------- */
const MTK_ADDRESS = '0xbd6852f0ef500984F4dAdBD58397B9199950BD5B';
const MTK_ABI = [
  {"inputs":[{"internalType":"uint256","name":"initialSupply","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},
  {"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"}
];
let account, provider, mtkContract;

/* ----------  ECONOMY  ---------- */
let gold = Number(localStorage.getItem('mtk') || 0);
let gems = Number(localStorage.getItem('eth') || 0);
function saveAndRefresh() {
  localStorage.setItem('mtk', gold);
  localStorage.setItem('eth', gems);
  document.getElementById('gold').textContent = '💰 ' + gold.toFixed(2);
  document.getElementById('gems').textContent = '💎 ' + gems.toFixed(3);
}
function spendMTK(n) { if (gold >= n) { gold -= n; saveAndRefresh(); return true; } return false; }
function spendETH(n) { if (gems >= n) { gems -= n; saveAndRefresh(); return true; } return false; }

/* ----------  INVENTORY  ---------- */
const owned = JSON.parse(localStorage.getItem('owned')) || { fighters: [4, 7, 1, 19], moves: {}, items: {}, skins: [] };
function pushOwned(id) {
  if (!owned.fighters.includes(id)) owned.fighters.push(id);
  localStorage.setItem('owned', JSON.stringify(owned));
  // keep legacy champions key in sync
  const champs = JSON.parse(localStorage.getItem('champions') || '[]');
  if (!champs.includes(id)) { champs.push(id); localStorage.setItem('champions', JSON.stringify(champs)); }
}

/* ----------  CATALOG  ---------- */
const shopCatalog = {
  Fire: [
    { id: 4, name: 'Charmander', price: 0, currency: 'gold', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png', desc: 'Starter fire lizard' },
    { id: 5, name: 'Charmeleon', price: 1800, currency: 'gold', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png', desc: 'Flaming tail whip' },
    { id: 6, name: 'Charizard', price: 5000, currency: 'gold', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png', desc: 'Ultimate blaze' },
    { id: 37, name: 'Vulpix', price: 1800, currency: 'gold', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/37.png', desc: 'Six-tailed fox' },
    { id: 38, name: 'Ninetales', price: 3000, currency: 'gold', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/38.png', desc: 'Mystic fire' },
    { id: 58, name: 'Growlithe', price: 1500, currency: 'gold', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/58.png', desc: 'Loyal pup' },
    { id: 59, name: 'Arcanine', price: 3500, currency: 'gold', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/59.png', desc: 'Legendary speed' },
    { id: 77, name: 'Ponyta', price: 1500, currency: 'gold', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/77.png', desc: 'Fiery mane' },
    { id: 78, name: 'Rapidash', price: 3000, currency: 'gold', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/78.png', desc: 'Flame gallop' },
    { id: 126, name: 'Magmar', price: 2800, currency: 'gold', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/126.png', desc: 'Lava brawler' }
  ],
  Water: [
    { id: 7, name: 'Squirtle', price: 0, currency: 'gold', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png', desc: 'Starter water turtle' },
    { id: 8, name: 'Wartortle', price: 2000, currency: 'gold', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png', desc: 'Jet-water cannons' },
    { id: 9, name: 'Blastoise', price: 5000, currency: 'gold', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png', desc: 'Hydro cannon' },
    { id: 54, name: 'Psyduck', price: 1800, currency: 'gold', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/54.png', desc: 'Confusion duck' },
    { id: 55, name: 'Golduck', price: 2500, currency: 'gold', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/55.png', desc: 'Swift swimmer' },
    { id: 60, name: 'Poliwag', price: 1200, currency: 'gold', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/60.png', desc: 'Swirl belly' },
    { id: 61, name: 'Poliwhirl', price: 2200, currency: 'gold', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/61.png', desc: 'Spiral fighter' },
    { id: 62, name: 'Poliwrath', price: 3800, currency: 'gold', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/62.png', desc: 'Muscle punch' },
    { id: 72, name: 'Tentacool', price: 1300, currency: 'gold', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/72.png', desc: 'Jellyfish drift' },
    { id: 73, name: 'Tentacruel', price: 2800, currency: 'gold', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/73.png', desc: 'Toxic whips' }
  ],
  Normal: [
    { id: 19, name: 'Rattata', price: 0, currency: 'gold', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/19.png', desc: 'Quick normal rodent' },
    { id: 20, name: 'Raticate', price: 1900, currency: 'gold', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/20.png', desc: 'Hyper-fang' },
    { id: 16, name: 'Pidgey', price: 1800, currency: 'gold', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png', desc: 'Tiny bird' },
    { id: 17, name: 'Pidgeotto', price: 5000, currency: 'gold', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/17.png', desc: 'Gust master' },
    { id: 18, name: 'Pidgeot', price: 5500, currency: 'gold', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/18.png', desc: 'Hurricane wings' },
    { id: 21, name: 'Spearow', price: 1500, currency: 'gold', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/21.png', desc: 'Beak strike' },
    { id: 22, name: 'Fearow', price: 3200, currency: 'gold', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/22.png', desc: 'Sky piercer' },
    { id: 83, name: 'Farfetch\'d', price: 2200, currency: 'gold', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/83.png', desc: 'Leek sword' },
    { id: 84, name: 'Doduo', price: 1700, currency: 'gold', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/84.png', desc: 'Twin sprint' },
    { id: 85, name: 'Dodrio', price: 3300, currency: 'gold', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/85.png', desc: 'Triple peck' }
  ],
  Poison: [
    { id: 1, name: 'Bulbasaur', price: 0, currency: 'gold', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png', desc: 'Grass / poison seed' },
    { id: 2, name: 'Ivysaur', price: 2000, currency: 'gold', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png', desc: 'Vine whip pro' },
    { id: 3, name: 'Venusaur', price: 4500, currency: 'gold', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png', desc: 'Petal dance' },
    { id: 23, name: 'Ekans', price: 1900, currency: 'gold', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/23.png', desc: 'Snake wrap' },
    { id: 24, name: 'Arbok', price: 1900, currency: 'gold', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/24.png', desc: 'Glare & poison' },
    { id: 29, name: 'Nidoran♀', price: 1500, currency: 'gold', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/29.png', desc: 'Poison pin' },
    { id: 30, name: 'Nidorina', price: 2500, currency: 'gold', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/30.png', desc: 'Barb strike' },
    { id: 31, name: 'Nidoqueen', price: 4000, currency: 'gold', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/31.png', desc: 'Toxic tank' },
    { id: 32, name: 'Nidoran♂', price: 1500, currency: 'gold', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/32.png', desc: 'Poison horn' },
    { id: 33, name: 'Nidorino', price: 2500, currency: 'gold', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/33.png', desc: 'Venom rush' }
  ],
  Dragon: [
    { id: 147, name: 'Dratini', price: 6000, currency: 'gold', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/147.png', desc: 'Rare dragon snake' },
    { id: 148, name: 'Dragonair', price: 5500, currency: 'gold', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/148.png', desc: 'Mystic dragon' },
    { id: 149, name: 'Dragonite', price: 5000, currency: 'gold', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png', desc: 'Legendary dragon' },
    { id: 130, name: 'Gyarados', price: 6000, currency: 'gold', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/130.png', desc: 'Flying water dragon' },
    { id: 6, name: 'Mega-Charizard X', price: 7500, currency: 'gold', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png', desc: 'Black fire dragon' },
    { id: 329, name: 'Trapinch', price: 2000, currency: 'gold', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/329.png', desc: 'Ant lion' },
    { id: 330, name: 'Vibrava', price: 3500, currency: 'gold', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/330.png', desc: 'Sonic sand' },
    { id: 331, name: 'Flygon', price: 5000, currency: 'gold', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/331.png', desc: 'Desert dragon' },
    { id: 246, name: 'Larvitar', price: 2500, currency: 'gold', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/246.png', desc: 'Mountain baby' },
    { id: 247, name: 'Pupitar', price: 4000, currency: 'gold', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/247.png', desc: 'Cocoon cannon' }
  ]
};

/* ----------  ONE-TIME: SAVE FULL ROSTER FOR CHOOSE.JS  ---------- */
(function saveRosterOnce() {
  const roster = Object.values(shopCatalog).flat().map(c => ({
    id: c.id,
    name: c.name,
    types: c.types || ['normal'],
    sprite: c.sprite.trim(),
    maxMana: 100,
    mana: 100,
    armor: 0,
    moves: c.moves || [
      { name: 'Tackle', mana: 0, power: 40, cd: 0, desc: 'Basic attack' },
      { name: 'Water Gun', mana: 20, power: 60, cd: 2, desc: 'Ranged shot' },
      { name: 'Aqua Tail', mana: 35, power: 80, cd: 4, desc: 'Strong whip' },
      { name: 'Hydro Vortex', mana: 60, power: 130, cd: 10, desc: 'ULT' }
    ]
  }));
  if (!localStorage.getItem('roster')) localStorage.setItem('roster', JSON.stringify(roster));
})();

/* ----------  HELPERS  ---------- */
function getPriceById(id) {
  for (const list of Object.values(shopCatalog)) {
    const it = list.find(x => x.id === id);
    if (it) return it.price;
  }
  return 0;
}

/* ----------  RENDER  ---------- */
function cardHTML(item, forSale = false) {
  const ownedAlready = owned.fighters.includes(item.id);
  return `
    <div class="card">
      <img src="${item.sprite}" onerror="this.src='images/placeholder.png'">
      <div>${item.name}</div>
      <div class="price">${item.price} ${item.currency === 'gold' ? '💰' : '💎'}</div>
      ${forSale
        ? `<button class="sell-btn" data-id="${item.id}">Sell (50 % refund)</button>`
        : `<button class="buy-btn" data-id="${item.id}" ${ownedAlready ? 'disabled' : ''}>
             ${ownedAlready ? 'Owned' : 'Buy'}
           </button>`}
    </div>`;
}

function renderTab(tab) {
  const grid = document.getElementById('shopContent');
  if (tab === 'Owned') {
    const list = owned.fighters.map(id => {
      for (const arr of Object.values(shopCatalog)) {
        const it = arr.find(x => x.id === id);
        if (it) return it;
      }
      return null;
    }).filter(Boolean);
    grid.innerHTML = list.length
      ? list.map(i => cardHTML(i, true)).join('')
      : `<div style="text-align:center;color:#fff;">
           <p>You don’t own any champions yet.</p>
           <button class="neon-btn" onclick="location.href='gamemaster.html'">Go to Game</button>
         </div>`;
  } else {
    grid.innerHTML = shopCatalog[tab].map(i => cardHTML(i, false)).join('');
  }
}

/* ----------  BUY / SELL  ---------- */
document.addEventListener('click', e => {
  if (e.target.matches('.buy-btn') && !e.target.disabled) {
    const id = Number(e.target.dataset.id);
    const item = Object.values(shopCatalog).flat().find(i => i.id === id);
    if (!item) return;
    if (!spendMTK(item.price)) return alert('Not enough MTK!');
    pushOwned(id);
    renderTab(document.querySelector('.tab.active').dataset.tab);
  }
  if (e.target.matches('.sell-btn')) {
    const id = Number(e.target.dataset.id);
    const refund = Math.floor(getPriceById(id) * 0.5);
    if (!confirm(`Sell for ${refund} MTK?`)) return;
    owned.fighters = owned.fighters.filter(f => f !== id);
    localStorage.setItem('owned', JSON.stringify(owned));
    gold += refund; saveAndRefresh();
    renderTab('Owned');
  }
});

/* ----------  TABS  ---------- */
document.addEventListener('DOMContentLoaded', () => {
  saveAndRefresh();
  renderTab('Fire');
  document.querySelectorAll('.tab').forEach(btn =>
    btn.addEventListener('click', e => {
      document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      renderTab(e.target.dataset.tab);
    })
  );
});

/* ----------  WALLET  ---------- */
document.querySelector('.currency-bar').insertAdjacentHTML('afterbegin',
  '<button id="connectBtn" style="margin-right:8px;padding:2px 8px;border:1px solid #0ff;background:transparent;color:#0ff;border-radius:4px;cursor:pointer;">Connect</button>');

async function connectWallet() {
  if (!window.ethereum) return alert('MetaMask not found');
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  handleAccountsChanged(accounts);
}
async function handleAccountsChanged(accounts) {
  if (!accounts.length) return;
  account = accounts[0];
  const btn = document.getElementById('connectBtn');
  btn.textContent = `${account.slice(0, 6)}…${account.slice(-4)}`;
  btn.disabled = true; btn.style.cursor = 'default';
  provider = new ethers.providers.Web3Provider(window.ethereum);
  mtkContract = new ethers.Contract(MTK_ADDRESS, MTK_ABI, provider);
  await fetchOnChainBalances();
}
async function fetchOnChainBalances() {
  const mtkRaw = await mtkContract.balanceOf(account);
  const dec = await mtkContract.decimals();
  gold = parseFloat(ethers.utils.formatUnits(mtkRaw, dec));
  const ethRaw = await provider.getBalance(account);
  gems = parseFloat(ethers.utils.formatEther(ethRaw));
  saveAndRefresh();
}
window.addEventListener('load', async () => {
  if (!window.ethereum) return;
  const accounts = await window.ethereum.request({ method: 'eth_accounts' });
  if (accounts[0]) handleAccountsChanged(accounts);
  document.getElementById('connectBtn').addEventListener('click', connectWallet);
});