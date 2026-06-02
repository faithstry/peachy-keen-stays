// ========================
// BEFORE/AFTER SLIDER
// ========================
function moveSlider(input, overlayId, handleId) {
  const val = input.value;
  const overlay = document.getElementById(overlayId);
  const handle = document.getElementById(handleId);
  overlay.style.width = val + '%';
  handle.style.left = val + '%';
}

// ========================
// FAQ ACCORDION
// ========================
function toggleFaq(item) {
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// ========================
// CALCULATOR
// ========================
const BASE_PRICES = {
  'Studio / 1BD': 800,
  '2–3 Bedroom': 1200,
  '4+ Bedroom': 1800
};

const ADDON_PRICES = {
  'Shopping List': 200,
  '3D Renders': 350,
  'Rush Delivery': 400
};

let selectedType = 'Studio / 1BD';
let selectedAddons = new Set();

function selectOpt(btn) {
  const group = btn.dataset.group;
  document.querySelectorAll(`.calc-opt[data-group="${group}"]`).forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  if (group === 'type') {
    selectedType = btn.textContent.trim();
  }
  updateCalc();
}

function toggleAddon(btn) {
  const label = btn.textContent.trim();
  if (btn.classList.contains('active')) {
    btn.classList.remove('active');
    selectedAddons.delete(label);
  } else {
    btn.classList.add('active');
    selectedAddons.add(label);
  }
  updateCalc();
}

function updateCalc() {
  const rooms = parseInt(document.getElementById('roomCount').value);
  document.getElementById('roomVal').textContent = rooms;

  const base = BASE_PRICES[selectedType] || 800;
  const roomMult = 1 + (rooms - 1) * 0.18;
  let addonTotal = 0;
  selectedAddons.forEach(a => { addonTotal += ADDON_PRICES[a] || 0; });

  const low = Math.round((base * roomMult + addonTotal) / 100) * 100;
  const high = Math.round((base * roomMult * 1.45 + addonTotal) / 100) * 100;

  document.getElementById('estPrice').textContent = `$${low.toLocaleString()} – $${high.toLocaleString()}`;
}

// ========================
// MOBILE MENU
// ========================
function toggleMenu() {
  const links = document.querySelector('.nav-links');
  const cta = document.querySelector('.nav-cta');
  if (links.style.display === 'flex') {
    links.style.display = 'none';
    cta.style.display = 'none';
  } else {
    links.style.display = 'flex';
    links.style.flexDirection = 'column';
    links.style.position = 'absolute';
    links.style.top = '70px';
    links.style.left = '0';
    links.style.right = '0';
    links.style.background = 'white';
    links.style.padding = '20px 24px';
    links.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
    cta.style.display = 'none';
  }
}

// ========================
// SMOOTH SCROLL NAV
// ========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ========================
// NAV SCROLL EFFECT
// ========================
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav');
  if (window.scrollY > 50) {
    nav.style.boxShadow = '0 4px 24px rgba(26,18,8,0.12)';
  } else {
    nav.style.boxShadow = 'none';
  }
});

// Init
updateCalc();
