// Chapter 2 — the summer-before-college Messenger screenshots (real ones only).
export function initMessages(content, observer) {
  const wrap = document.getElementById('screens');
  const c = content.messages;

  c.screenshots.forEach(shot => {
    const art = document.createElement('article');
    art.className = 'shot reveal';
    if (shot.src) {
      const frame = document.createElement('div');
      frame.className = 'shot-frame';
      const img = document.createElement('img');
      img.src = shot.src; img.alt = 'A Messenger screenshot from the summer before college'; img.loading = 'lazy';
      frame.appendChild(img);
      frame.addEventListener('click', () => import('../components/lightbox.js').then(m =>
        m.open([{ type: 'image', src: shot.src, caption: shot.annotation }], 0)));
      art.appendChild(frame);
    } else {
      const frame = document.createElement('div');
      frame.className = 'shot-frame';
      const p = document.createElement('p');
      p.textContent = c.placeholderText;
      frame.appendChild(p);
      art.appendChild(frame);
    }
    const note = document.createElement('p');
    note.className = 'annotation';
    note.textContent = shot.annotation || '';
    art.appendChild(note);
    wrap.appendChild(art);
    observer.observe(art);
  });
}
