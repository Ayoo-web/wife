// Chapter 4 — flipped cards, one per little thing she does.
export function initLittleThings(content, observer) {
  const wrap = document.getElementById('cards');
  content.littleThings.cards.forEach(cardData => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'card reveal';
    card.setAttribute('aria-pressed', 'false');
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-face front">
          <span class="icon" aria-hidden="true">${cardData.icon}</span>
          <span class="label">${cardData.front}</span>
          <span class="hint">tap to read</span>
        </div>
        <div class="card-face back"><p>${cardData.back}</p></div>
      </div>`;
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
      card.setAttribute('aria-pressed', String(card.classList.contains('flipped')));
    });
    wrap.appendChild(card);
    observer.observe(card);
  });
}
