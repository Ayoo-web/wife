// Chapter 3 — top-down McDonald's table; she asks to move her chair beside me.
export function initMcdonalds(content, observer) {
  const stage = document.getElementById('chairs');
  const invite = document.getElementById('chairs-invite');
  const quote = document.getElementById('tapad');
  const story = document.getElementById('mcd-story');
  const c = content.mcdonalds;

  stage.innerHTML = `
  <svg viewBox="0 0 480 400" role="img" aria-label="Two chairs facing each other across a small table. Tap a chair.">
    <rect x="0" y="0" width="480" height="400" fill="rgba(255,247,230,.35)"/>
    <ellipse cx="230" cy="200" rx="98" ry="74" fill="rgba(74,52,42,.12)"/>
    <rect x="140" y="134" width="180" height="132" rx="16" fill="#a8794c" stroke="#7b5c3f" stroke-width="3"/>
    <circle cx="203" cy="167" r="11" fill="#f2e7cb" stroke="#7b5c3f" stroke-width="2"/>
    <circle cx="257" cy="233" r="11" fill="#f2e7cb" stroke="#7b5c3f" stroke-width="2"/>
    <g id="chair-me" class="chair" tabindex="0" role="button" aria-label="My chair">
      <ellipse cx="0" cy="6" rx="40" ry="26" fill="rgba(74,52,42,.18)"/>
      <rect x="-32" y="-38" width="64" height="12" rx="6" fill="#8a5a40" stroke="#5f4330" stroke-width="2"/>
      <rect x="-27" y="-24" width="54" height="42" rx="11" fill="#a06a48" stroke="#5f4330" stroke-width="2.5"/>
    </g>
    <g id="chair-her" class="chair" tabindex="0" role="button" aria-label="Your chair">
      <ellipse cx="0" cy="6" rx="40" ry="26" fill="rgba(74,52,42,.18)"/>
      <rect x="-32" y="26" width="64" height="12" rx="6" fill="#8a5a40" stroke="#5f4330" stroke-width="2"/>
      <rect x="-27" y="-18" width="54" height="42" rx="11" fill="#a06a48" stroke="#5f4330" stroke-width="2.5"/>
    </g>
  </svg>`;

  const me = document.getElementById('chair-me');
  const her = document.getElementById('chair-her');
  // she faces up (back at bottom), I face down; both drawn around (0,0)
  me.style.transform = 'translate(230px, 66px)';
  her.style.transform = 'translate(230px, 334px)';
  stage.querySelectorAll('.chair').forEach(initChangeChairs);
  let moved = false;
  function initChangeChairs(chair) {
    const move = () => {
      if (moved) return;
      moved = true;
      me.style.transform = 'translate(388px, 170px) rotate(90deg)';
      her.style.transform = 'translate(388px, 236px) rotate(-90deg)';
      invite.hidden = true;
      // flip her back to the correct orientation for a side-by-side seat
      setTimeout(() => {
        quote.hidden = false;
        requestAnimationFrame(() => quote.classList.add('in', 'reveal'));
      }, 1150);
      setTimeout(showStory, 2100);
    };
    chair.addEventListener('click', move);
    chair.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); move(); } });
  }

  function showStory() {
    story.hidden = false;
    c.story
      .filter(p => p.trim() !== `"${c.reveal}"`)
      .forEach((text, i) => {
        const p = document.createElement('p');
        p.className = 'reveal';
        p.textContent = text;
        p.style.transitionDelay = `${i * 120}ms`;
        story.appendChild(p);
        observer.observe(p);
      });
    observer.observe(story);
  }
}
