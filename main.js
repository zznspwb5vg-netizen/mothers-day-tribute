const TOTAL   = 9;
const slides  = Array.from(document.querySelectorAll('.slide'));
const btnNext = document.getElementById('btn-next');
const btnBack = document.getElementById('btn-back');
const dotsEl  = document.getElementById('progress-dots');
const countEl = null;
const deck    = document.getElementById('deck');

let current = 0;

/* ── Build progress dots ── */
slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.className = 'progress__dot';
  dot.setAttribute('aria-label', `Slide ${i + 1}`);
  dot.addEventListener('click', () => goTo(i));
  dotsEl.appendChild(dot);
});

/* ── Initialise ── */
slides[0].classList.add('active');
sync();

/* ── Core navigation ── */
function goTo(next) {
  if (next === current || next < 0 || next >= TOTAL) return;

  slides[current].classList.remove('active');
  current = next;
  const slide = slides[current];
  slide.classList.add('active');
  const inner = slide.querySelector('.slide__inner');
  if (inner) inner.scrollTop = 0;

  /* Re-trigger title pop */
  const titles = slide.querySelectorAll('.slide__title, .slide__hero');
  titles.forEach(el => {
    el.classList.remove('pop');
    void el.offsetWidth;          // force reflow
    el.classList.add('pop');
  });

  sync();
}

function sync() {
  /* Dots */
  dotsEl.querySelectorAll('.progress__dot').forEach((d, i) =>
    d.classList.toggle('active', i === current)
  );

  /* Count */
  if (countEl) countEl.textContent = `${current + 1} / ${TOTAL}`;

  /* Back button */
  btnBack.disabled = current === 0;

  /* Next button */
  if (current === TOTAL - 1) {
    btnNext.innerHTML = '❤️';
    btnNext.classList.add('nav-btn--done');
    btnNext.disabled = true;
  } else {
    btnNext.innerHTML = `Next <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M7 4l6 6-6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    btnNext.classList.remove('nav-btn--done');
    btnNext.disabled = false;
  }

  /* Sync accent colour to deck for nav + dots */
  const s = slides[current];
  const accent   = s.style.getPropertyValue('--accent').trim()    || '#C4857A';
  const accentBg = s.style.getPropertyValue('--accent-bg').trim() || '#FAF6EF';
  deck.style.setProperty('--deck-accent',    accent);
  deck.style.setProperty('--deck-accent-bg', accentBg);
}

/* ── Button listeners ── */
btnNext.addEventListener('click', () => goTo(current + 1));
btnBack.addEventListener('click', () => goTo(current - 1));

/* ── Keyboard ── */
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goTo(current + 1);
  if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   goTo(current - 1);
});

/* ── Swipe (touch) ── */
let tx = 0, ty = 0;
document.addEventListener('touchstart', e => {
  tx = e.touches[0].clientX;
  ty = e.touches[0].clientY;
}, { passive: true });
document.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - tx;
  const dy = e.changedTouches[0].clientY - ty;
  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 42) {
    dx < 0 ? goTo(current + 1) : goTo(current - 1);
  }
}, { passive: true });
