/* eslint-disable @typescript-eslint/no-unused-vars */

let moves = [
  {
    color: "w",
    piece: "p",
    from: "b2",
    to: "b3",
    san: "b3",
    flags: "n",
    lan: "b2b3",
    before: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    after: "rnbqkbnr/pppppppp/8/8/8/1P6/P1PPPPPP/RNBQKBNR b KQkq - 0 1",
  },
  {
    color: "w",
    piece: "p",
    from: "b2",
    to: "b4",
    san: "b4",
    flags: "b",
    lan: "b2b4",
    before: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    after: "rnbqkbnr/pppppppp/8/8/1P6/8/P1PPPPPP/RNBQKBNR b KQkq - 0 1",
  },
]

let newSquares = {
  b3: {
    background: "radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)",
    borderRadius: "50%",
  },
  b4: {
    background: "radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)",
    borderRadius: "50%",
  },
  b2: {
    background: "rgba(255, 255, 0, 0.4)",
  },
}
