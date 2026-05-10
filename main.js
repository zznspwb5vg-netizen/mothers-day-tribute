const TOTAL   = 9;
const slides  = Array.from(document.querySelectorAll('.slide'));
const dotsEl  = document.getElementById('progress-dots');
const progressEl = document.getElementById('progress');
const navEl   = document.getElementById('deck-nav');
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

/* ── Build Next button (in progress bar, top right) ── */
const btnNext = document.createElement('button');
btnNext.className = 'nav-btn nav-btn--next';
btnNext.setAttribute('aria-label', 'Next slide');
btnNext.innerHTML = 'Next <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M7 4l6 6-6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
btnNext.addEventListener('click', () => goTo(current + 1));
progressEl.appendChild(btnNext);

/* ── Build Back button (in nav bar, bottom left) ── */
const btnBack = document.createElement('button');
btnBack.className = 'nav-btn nav-btn--back';
btnBack.setAttribute('aria-label', 'Previous slide');
btnBack.innerHTML = '<svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M13 4l-6 6 6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg> Back';
btnBack.disabled = true;
btnBack.addEventListener('click', () => goTo(current - 1));
navEl.appendChild(btnBack);

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

  const titles = slide.querySelectorAll('.slide__title, .slide__hero');
  titles.forEach(el => {
    el.classList.remove('pop');
    void el.offsetWidth;
    el.classList.add('pop');
  });

  sync();
}

function sync() {
  dotsEl.querySelectorAll('.progress__dot').forEach((d, i) =>
    d.classList.toggle('active', i === current)
  );

  btnBack.disabled = current === 0;

  if (current === TOTAL - 1) {
    btnNext.innerHTML = '❤️';
    btnNext.classList.add('nav-btn--done');
    btnNext.disabled = true;
  } else {
    btnNext.innerHTML = 'Next <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M7 4l6 6-6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    btnNext.classList.remove('nav-btn--done');
    btnNext.disabled = false;
  }

  const s = slides[current];
  const accent   = s.style.getPropertyValue('--accent').trim()    || '#C4857A';
  const accentBg = s.style.getPropertyValue('--accent-bg').trim() || '#FAF6EF';
  deck.style.setProperty('--deck-accent',    accent);
  deck.style.setProperty('--deck-accent-bg', accentBg);
}

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
