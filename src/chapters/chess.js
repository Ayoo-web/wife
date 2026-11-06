// Chapter 1 — a small chessboard where Nikki always wins.
export function initChess(content, observer) {
  const board = document.getElementById('chessboard');
  const invite = document.getElementById('chess-invite');
  const reveal = document.getElementById('chess-reveal');
  const again = document.getElementById('chess-again');

  // her queen takes mine from d5 (col 3, row 4) to e4 (col 4, row 3)
  const her = { col: 3, row: 4 }, herTarget = { col: 4, row: 3 };
  const me = { col: 4, row: 3 };

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const sq = document.createElement('div');
      sq.className = `sq ${(col + row) % 2 ? 'dark' : 'light'}`;
      sq.dataset.col = col; sq.dataset.row = row;
      if (col === me.col && row === me.row) sq.classList.add('target');
      board.appendChild(sq);
    }
  }

  const makePiece = (glyph, cls, pos) => {
    const p = document.createElement('div');
    p.className = `piece ${cls}`;
    p.textContent = glyph;
    setXY(p, pos);
    board.appendChild(p);
    return p;
  };
  const setXY = (p, pos) => { p.style.setProperty('--x', pos.col); p.style.setProperty('--y', pos.row); };

  const whiteQueen = makePiece('♕', 'white', me);
  const blackQueen = makePiece('♛', 'black', her);

  let done = false;
  board.addEventListener('click', e => {
    if (done) return;
    const sq = e.target.closest('.sq');
    if (!sq || +sq.dataset.col !== me.col || +sq.dataset.row !== me.row) return;
    done = true;
    setXY(blackQueen, herTarget);
    whiteQueen.classList.add('captured');
    board.querySelector('.target').classList.remove('target');
    invite.style.opacity = 0;
    setTimeout(() => { invite.hidden = true; reveal.hidden = false; observer.observe(reveal); }, 1300);
  });

  again.addEventListener('click', () => {
    done = false;
    setXY(blackQueen, her);
    whiteQueen.classList.remove('captured');
    board.children[me.row * 8 + me.col].classList.add('target');
    reveal.hidden = true;
    invite.hidden = false; invite.style.opacity = '';
  });
}
