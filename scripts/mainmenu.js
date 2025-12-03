/* ----------  MAIN-MENU TOGGLE  ---------- */
const subBattle = document.getElementById('sub-battle');
const subMarket = document.getElementById('sub-market');
const subSettings = document.getElementById('sub-settings');

function toggleSub(id) {
  // close all
  subBattle.style.display = 'none';
  subMarket.style.display = 'none';
  subSettings.style.display = 'none';

  // open clicked one (if it was closed)
  const target = document.getElementById('sub-' + id);
  if (target.style.display !== 'block') target.style.display = 'block';
}

/* ----------  EXIT  ---------- */
function exitGame() {
  if (confirm('Exit the game?')) window.close();   // browser may block
}

/* ----------  ENTRANCE FX  ---------- */
window.addEventListener('load', () => {
  document.querySelectorAll('.menu-btn').forEach((btn, i) => {
    btn.style.opacity = 0;
    btn.style.transform = 'translateY(30px)';
    setTimeout(() => {
      btn.style.transition = 'all .6s ease';
      btn.style.opacity = 1;
      btn.style.transform = 'translateY(0)';
    }, i * 150);
  });
});
  const bg = document.getElementById('menuMusic');
  document.body.addEventListener('click', () => {
    bg.muted = false;
  }, { once: true });