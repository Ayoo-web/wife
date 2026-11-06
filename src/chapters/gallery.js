// Chapter 5 — polaroids per place. Real files only; missing ones show honest placeholders.
import { open } from '../components/lightbox.js';

export function initGallery(content, observer) {
  const root = document.getElementById('gallery');
  const c = content.gallery;
  const allItems = []; // flattened for lightbox navigation

  c.groups.forEach(group => {
    const section = document.createElement('div');
    section.className = 'group';
    const head = document.createElement('div');
    head.className = 'group-head reveal';
    const h3 = document.createElement('h3');
    h3.textContent = group.title;
    const note = document.createElement('p');
    note.className = 'annotation hand';
    note.textContent = group.annotation || '';
    head.append(h3, note);
    section.appendChild(head);
    observer.observe(head);

    const row = document.createElement('div');
    row.className = 'row';
    group.photos.forEach(photo => {
      const item = { ...photo, placeholderText: 'The real photo is on its way here.' };
      const id = allItems.push(item) - 1;

      const pol = document.createElement('figure');
      pol.className = 'polaroid reveal' + (group.special === 'sleeping' ? ' special' : '');
      const media = document.createElement('div');
      media.className = 'polaroid-media';
      if (photo.src) {
        if (photo.type === 'video') {
          const v = document.createElement('video');
          v.src = photo.src; v.controls = true; v.playsInline = true; v.preload = 'metadata';
          media.appendChild(v);
        } else {
          const img = document.createElement('img');
          img.src = photo.src; img.alt = photo.caption || group.title; img.loading = 'lazy';
          media.appendChild(img);
          media.addEventListener('click', () => open(allItems, id));
        }
      } else {
        const ph = document.createElement('p');
        ph.textContent = 'a real photo of us will live here';
        media.title = `Add it to ${group.folder}`;
        media.appendChild(ph);
      }
      const cap = document.createElement('figcaption');
      cap.className = 'caption hand';
      cap.textContent = photo.caption || '';
      pol.append(media, cap);
      if (photo.date) {
        const d = document.createElement('div');
        d.className = 'date';
        d.textContent = photo.date;
        pol.appendChild(d);
      }
      row.appendChild(pol);
      observer.observe(pol);
    });
    section.appendChild(row);
    root.appendChild(section);
  });
}
