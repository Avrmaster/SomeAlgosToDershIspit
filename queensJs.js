class Board {
  constructor(N) {
    this.queens = []

    // main ones
    this.beam1 = []
    this.beam2 = []
    this.beam3 = []
    for (let i = 0; i < N; ++i) {
      this.beam1.push(false)
      this.beam2.push(false)
      this.beam3.push(false)
    }

    // for undo
    this.beam0 = []
  }

  placeQueen(col) {
    this.queens.push(col)
  }

  canPlace(col, row) {
    for (let queenRow = this.queens.length - 1; queenRow >= 0; --queenRow) {
      const queenCol = this.queens[queenRow]

      if (
        queenCol === col ||
        queenRow === row ||
        Math.abs((queenCol - col)) === Math.abs((queenRow - row))
      ) {
        return false
      }
    }

    return true
  }

  unPlace() {
    this.queens.pop()
  }

  printOlymp() {
    this.queens.forEach(q => console.log(q))
  }

  toString() {
    let out = ''
    for (const queenCol of this.queens) {
      const row = []
      for (let i = 0; i < this.queens.length; ++i) {
        row.push('-')
      }
      row[queenCol] = '*'
      out += row.join(' ') + '\n'
    }
    return out
  }
}

function solveFor(N) {
  function place(board, row = 0) {
    if (row >= N) {
      return board
    }

    let randomColumnOffset = Math.floor(N * Math.random())
    for (let columnOffset = 0; columnOffset < N; ++columnOffset) {
      const column = (randomColumnOffset + columnOffset) % N

      if (board.canPlace(column, row)) {
        board.placeQueen(column, row)
        const subBoard = place(board, row + 1)
        if (subBoard) {
          return subBoard
        }
        board.unPlace()
      }
    }

    return null
  }

  return place(new Board())
}

// process.stdin.on('data', function (data) {
//   const N = parseInt(data)
//   solveFor(N).printOlymp()
// })


for (let i = 4; i < 10; ++i) {
  const key = `${i} queens`
  console.time(key)
  const result = solveFor(i)
  console.timeEnd(key)

  console.log(result + '\n\n')
}

