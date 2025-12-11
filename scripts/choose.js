
function getOwnedIds() {
  const raw = localStorage.getItem('owned');
  if (!raw) return [];
  try {
    const obj = JSON.parse(raw);
    if (Array.isArray(obj.fighters)) return obj.fighters;
  } catch {}
  const m = raw.match(/^fighters:(.+)$/);
  if (m) return m[1].split(',').map(Number);
  return [];
}
const ownedIds = getOwnedIds();
const ownedFighters = allFighters.filter(f => ownedIds.includes(f.id));
if (ownedFighters.length === 0) {
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('pokeGrid').innerHTML = `
      <div style="text-align:center;color:#fff;margin-top:3rem;font-size:1.5rem;">
        <p>You don't own any champions yet!</p>
        <button class="neon-btn" onclick="location.href='marketplace.html'" style="margin-top:1rem;padding:1rem 2rem;">
          Go to Marketplace 
        </button>
      </div>`;
  });
}

// Use ONLY owned fighters from now on
const fighters = ownedFighters;
const arenas = [{ id: 'Arena', name: 'Colosseum', thumb: 'images/arena.png' }];

let selectedFighter = null;

/* ---------- RENDER & PAGINATION ---------- */
const PER_PAGE = 4;
let currentPage = 0;
const totalPages = Math.ceil(fighters.length / PER_PAGE);
const paginated = Array.from({ length: totalPages }, (_, i) =>
  fighters.slice(i * PER_PAGE, (i + 1) * PER_PAGE)
);

function renderFighters() {
  const grid = document.getElementById('pokeGrid');

  // Already handled empty case above
  if (fighters.length === 0) return;

  grid.innerHTML = paginated[currentPage].map(f => `
    <div class="poke-card" onclick="selectFighter(${f.id})">
      <img src="${f.sprite}" alt="${f.name}">
      <div class="name">${f.name}</div>
      <div class="types">${f.types.map(t => `<span class="type-badge ${t}">${t}</span>`).join('')}</div>
    </div>`).join('');

  renderPaginator();
}

function renderPaginator() {
  let el = document.getElementById('pokePaginator');
  if (!el) {
    document.getElementById('pokeGrid').insertAdjacentHTML('afterend', '<div id="pokePaginator" class="paginator"></div>');
    el = document.getElementById('pokePaginator');
  }
  el.innerHTML = `
    <button ${currentPage === 0 ? 'disabled' : ''} onclick="changePage(-1)">Prev</button>
    <span>Page ${currentPage + 1} / ${totalPages}</span>
    <button ${currentPage === totalPages - 1 ? 'disabled' : ''} onclick="changePage(1)">Next</button>
  `;
}

function changePage(dir) {
  currentPage = Math.max(0, Math.min(totalPages - 1, currentPage + dir));
  renderFighters();
}

function renderArenas() {
  const grid = document.getElementById('mapGrid');
  grid.innerHTML = arenas.map(a => `
    <div class="map-card" onclick="selectArena('${a.id}')">
      <img src="${a.thumb}" alt="${a.name}">
      <div>${a.name}</div>
    </div>`).join('');
}

/* ---------- SELECTION ---------- */
function selectFighter(id) {
  document.querySelectorAll('.poke-card').forEach(c => c.classList.remove('selected'));
  document.querySelector(`.poke-card[onclick="selectFighter(${id})"]`)?.classList.add('selected');
  selectedFighter = id;
  updateStartButton();
}

function selectArena(id) {
  document.querySelectorAll('.map-card').forEach(c => c.classList.remove('selected'));
  document.querySelector(`.map-card[onclick="selectArena('${id}')"]`)?.classList.add('selected');
}

/* ---------- START BUTTON ---------- */
function updateStartButton() {
  const btn = document.getElementById('startBtn');
  const ready = !!selectedFighter;
  btn.classList.toggle('disabled', !ready);
  btn.style.pointerEvents = ready ? 'auto' : 'none';
  btn.style.opacity = ready ? '1' : '0.5';
}

/* ---------- INIT ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('startBtn');

  // Clone to remove any old listeners
  const newBtn = startBtn.cloneNode(true);
  startBtn.parentNode.replaceChild(newBtn, startBtn);

  newBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (!selectedFighter) {
      alert('Please select a champion first!');
      return;
    }
    console.log('Launching battle with owned champion ID:', selectedFighter);
    location.href = `gameplay.html?fighter=${selectedFighter}`;
  });

  newBtn.classList.add('disabled');
  newBtn.style.pointerEvents = 'none';
  newBtn.style.opacity = '0.5';

  renderFighters();
  renderArenas();
  updateStartButton();
});