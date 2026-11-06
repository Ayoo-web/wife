// Chapter 6 — night sky of real memories; the final star reveals the letter.
const MEMORIES = [
  { x: 120, y: 150, title: 'the first games', text: 'High-school chessboards, where you first refused — and kept refusing — to lose to me.' },
  { x: 285, y: 90, title: 'a Messenger note', text: 'The summer before college. You replied, we kept talking, and neither of us knew what it would become.' },
  { x: 455, y: 130, title: 'the seat beside me', text: 'A late Palakasan night, a McDonald’s table, and your question: can I sit beside you? Of course. Ali ali tapad ta.' },
  { x: 600, y: 105, title: 'caps and gowns', text: 'Grade 12 graduation. Side by side in a photo, years before “us” was a word we used.' },
  { x: 185, y: 300, title: 'Bangko Bangko', text: 'A day trip to Iligan City’s own quiet corner. Ordinary wandering, made worth remembering by who it was with.' },
  { x: 360, y: 270, title: 'Esplanade evenings', text: 'Esplanade and the coastal road — our usual place to slow down and let the evening pass by together.' },
  { x: 540, y: 310, title: 'July miles', text: 'We jogged around Iligan City in July. Nothing about it was remarkable, except that we did it side by side.' },
];

const FINAL = { x: 350, y: 200 };

function bgStars(n, seed, w, h) {
  let s = seed;
  const rand = () => (s = (s * 1103515245 + 12345) % 2147483648) / 2147483648;
  return Array.from({ length: n }, () => ({
    x: +(rand() * w).toFixed(1), y: +(rand() * h).toFixed(1),
    r: +(rand() * 1.1 + .4).toFixed(2), o: +(rand() * .5 + .15).toFixed(2),
  }));
}

export function initStarmap(content, observer) {
  const sky = document.getElementById('sky');
  const counter = document.getElementById('sky-counter');
  const card = document.getElementById('star-card');
  const cardTitle = document.getElementById('star-card-title');
  const cardText = document.getElementById('star-card-text');
  const prompt = document.getElementById('sky-prompt');
  const c = content.stars;

  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', '0 0 720 430');

  for (const st of bgStars(110, 7, 720, 430)) {
    const dot = document.createElementNS(NS, 'circle');
    dot.setAttribute('cx', st.x); dot.setAttribute('cy', st.y);
    dot.setAttribute('r', st.r); dot.setAttribute('fill', '#cdd2e2'); dot.setAttribute('opacity', st.o);
    svg.appendChild(dot);
  }

  const visited = new Set();
  let finalBright = false;

  function makeStar(pos, cls, label) {
    const g = document.createElementNS(NS, 'g');
    g.setAttribute('class', `star ${cls}`);
    g.setAttribute('tabindex', '0');
    g.setAttribute('role', 'button');
    g.setAttribute('aria-label', label);
    const halo = document.createElementNS(NS, 'circle');
    halo.setAttribute('class', 'halo');
    halo.setAttribute('cx', pos.x); halo.setAttribute('cy', pos.y); halo.setAttribute('r', 13);
    const core = document.createElementNS(NS, 'circle');
    core.setAttribute('class', 'core');
    core.setAttribute('cx', pos.x); core.setAttribute('cy', pos.y); core.setAttribute('r', 5.5);
    // generous invisible tap target (halo alone is ~12px on phones)
    const hit = document.createElementNS(NS, 'circle');
    hit.setAttribute('cx', pos.x); hit.setAttribute('cy', pos.y); hit.setAttribute('r', 26);
    hit.setAttribute('fill', 'transparent');
    hit.setAttribute('pointer-events', 'all');
    g.append(hit, halo, core);
    svg.appendChild(g);
    return g;
  }

  const finalStar = makeStar(FINAL, 'final-dim', c.finalStarLabel || 'A star still waiting');
  finalStar.style.pointerEvents = 'none';

  function showCard(title, text) {
    cardTitle.textContent = title;
    cardText.textContent = text;
    card.hidden = false;
  }

  MEMORIES.forEach(mem => {
    const star = makeStar(mem, '', mem.title);
    const visit = () => {
      if (!visited.has(mem.title)) {
        visited.add(mem.title);
        star.classList.add('visited');
        counter.textContent = c.counterTemplate.replace('n of n', `${visited.size} of ${MEMORIES.length}`);
        showCard(mem.title, mem.text);
        if (visited.size === MEMORIES.length) {
          setTimeout(() => {
            finalBright = true;
            finalStar.classList.remove('final-dim');
            finalStar.classList.add('bright');
            finalStar.style.pointerEvents = '';
            prompt.textContent = c.promptAfterAll;
            prompt.hidden = false;
          }, 1200);
        }
      } else {
        showCard(mem.title, mem.text);
      }
    };
    star.addEventListener('click', visit);
    star.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); visit(); } });
  });

  const finalVisit = () => {
    if (!finalBright) return;
    openLetter(content);
  };
  finalStar.addEventListener('click', finalVisit);
  finalStar.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); finalVisit(); } });

  sky.appendChild(svg);
  observer.observe(sky);
}

function openLetter(content) {
  const letter = document.getElementById('letter');
  const body = document.getElementById('letter-body');
  if (!body.children.length) {
    content.stars.letter.paragraphs.forEach(text => {
      const p = document.createElement('p');
      p.textContent = text;
      body.appendChild(p);
    });
  }
  letter.hidden = false;
  document.body.style.overflow = 'hidden';
  document.getElementById('letter-close').focus();
}

export function initLetterClose() {
  const close = document.getElementById('letter-close');
  const letter = document.getElementById('letter');
  const hide = () => { letter.hidden = true; document.body.style.overflow = ''; };
  close.addEventListener('click', hide);
  letter.addEventListener('click', e => { if (e.target === letter) hide(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !letter.hidden) hide(); });
}
