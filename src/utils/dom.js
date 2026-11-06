export const $ = (sel, root = document) => root.querySelector(sel);

export function get(obj, path) {
  return path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj);
}

// Fill every [data-bind="a.b.c"] in root from the content object.
export function bindText(root = document) {
  for (const node of root.querySelectorAll('[data-bind]')) {
    const value = get(window.__CONTENT__, node.dataset.bind);
    if (value != null) node.textContent = value;
  }
}

// Attach the shared scroll-reveal behaviour to a freshly added subtree.
export function observeReveals(root, observer) {
  for (const node of root.querySelectorAll('.reveal')) observer.observe(node);
}
