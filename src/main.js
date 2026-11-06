import content from './data/content.js';
import { bindText } from './utils/dom.js';
import { initChess } from './chapters/chess.js';
import { initMessages } from './chapters/messages.js';
import { initMcdonalds } from './chapters/mcdonalds.js';
import { initLittleThings } from './chapters/littleThings.js';
import { initGallery } from './chapters/gallery.js';
import { initStarmap, initLetterClose } from './chapters/starmap.js';

// shared reveal-on-scroll observer
const observer = new IntersectionObserver(entries => {
  for (const e of entries) {
    if (e.isIntersecting) { e.target.classList.add('in'); observer.unobserve(e.target); }
  }
}, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

window.__CONTENT__ = content;
bindText(document);

initChess(content, observer);
initMessages(content, observer);
initMcdonalds(content, observer);
initLittleThings(content, observer);
initGallery(content, observer);
initStarmap(content, observer);
initLetterClose();

// chapter rail — position dots, tap to jump
const chapters = [
  ['ch-chess', 'The Losing Streak'],
  ['ch-messages', 'Before We Knew'],
  ['ch-mcdonalds', '9:00 PM — A Seat Beside Me'],
  ['ch-littlethings', 'Things You Do Without Knowing I Notice'],
  ['ch-gallery', 'Little Places, Big Memories'],
  ['ch-stars', 'Still Writing'],
];
function setupRail() {
  const rail = document.getElementById('rail');
  const current = new Set();
  const buttons = new Map();
  const pick = () => {
    const active = [...current].pop() || [...current][0];
    for (const [id, btn] of buttons) {
      btn.classList.toggle('active', id === active);
      btn.classList.toggle('on-dark', id === 'ch-stars' && id === active);
    }
  };
  const spy = new IntersectionObserver(entries => {
    for (const e of entries) {
      if (e.isIntersecting) current.add(e.target.id);
      else current.delete(e.target.id);
    }
    pick();
  }, { threshold: 0.08 });
  for (const [id, name] of chapters) {
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-label', name);
    b.addEventListener('click', () => document.getElementById(id).scrollIntoView({ behavior: 'smooth' }));
    rail.appendChild(b);
    buttons.set(id, b);
    spy.observe(document.getElementById(id));
  }
  rail.hidden = false;
}

// cover
const cover = document.getElementById('cover');
const book = document.getElementById('book');
const openCover = () => {
  if (cover.classList.contains('open')) return;
  cover.classList.add('open');
  book.setAttribute('aria-hidden', 'false');
  setupRail();
  setTimeout(() => cover.remove(), 1500);
};
cover.addEventListener('click', openCover);
cover.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openCover(); } });
document.body.style.overflow = 'hidden';
setTimeout(() => { document.body.style.overflow = ''; }, 1600);

// music — only appears when a file actually exists
const musicBtn = document.getElementById('music');
const audio = document.getElementById('music-audio');
async function setupMusic() {
  if (!content.music.src) return;
  try {
    const res = await fetch(content.music.src, { method: 'HEAD' });
    if (!res.ok) return;
  } catch { return; }
  audio.src = content.music.src;
  audio.volume = 0.5;
  musicBtn.hidden = false;
  musicBtn.addEventListener('click', () => {
    if (audio.paused) { audio.play(); musicBtn.classList.add('playing'); musicBtn.setAttribute('aria-label', 'Pause music'); }
    else { audio.pause(); musicBtn.classList.remove('playing'); musicBtn.setAttribute('aria-label', 'Play music'); }
  });
}
setupMusic();
