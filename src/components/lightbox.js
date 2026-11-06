// Full-screen viewer for gallery items: {type:'image'|'video', src, caption}
let items = [];
let index = 0;

const lb = document.getElementById('lightbox');
const media = document.getElementById('lb-media');
const caption = document.getElementById('lb-caption');

function render() {
  const item = items[index];
  media.innerHTML = '';
  if (!item) return close();
  if (item.src == null) {
    const ph = document.createElement('div');
    ph.className = 'placeholder';
    ph.textContent = item.placeholderText || 'A real photo will live here.';
    media.appendChild(ph);
  } else if (item.type === 'video') {
    const v = document.createElement('video');
    v.src = item.src; v.controls = true; v.playsInline = true; v.autofocus = false;
    media.appendChild(v);
  } else {
    const img = document.createElement('img');
    img.src = item.src; img.alt = item.caption || '';
    media.appendChild(img);
  }
  caption.textContent = item.caption || '';
}

export function open(list, i) {
  items = list; index = i;
  lb.hidden = false;
  document.body.style.overflow = 'hidden';
  render();
}

export function close() {
  lb.hidden = true;
  media.innerHTML = '';
  document.body.style.overflow = '';
}

lb.querySelector('.lb-close').addEventListener('click', close);
lb.addEventListener('click', e => { if (e.target === lb) close(); });
lb.querySelector('.lb-prev').addEventListener('click', () => { index = (index - 1 + items.length) % items.length; render(); });
lb.querySelector('.lb-next').addEventListener('click', () => { index = (index + 1) % items.length; render(); });
document.addEventListener('keydown', e => {
  if (lb.hidden) return;
  if (e.key === 'Escape') close();
  if (e.key === 'ArrowLeft') lb.querySelector('.lb-prev').click();
  if (e.key === 'ArrowRight') lb.querySelector('.lb-next').click();
});
