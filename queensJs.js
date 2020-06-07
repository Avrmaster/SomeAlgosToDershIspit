class Board {
  constructor(N) {
    this.queens = []

    this.slashCodes = []
    this.backCodes = []
    for (let i = 0; i < N; ++i) {
      this.slashCodes[i] = new Array(N)
      this.backCodes[i] = new Array(N)

      for (let j = 0; j < N; ++j) {
        this.slashCodes[i][j] = i - j + N
        this.backCodes[i][j] = i + j
      }
    }

    this.occupiedCols = {}
    this.occupiedSlashes = {}
    this.occupiedBacks = {}
  }

  placeQueen(col) {
    const row = this.queens.push(col) - 1

    this.occupiedCols[col] = true
    this.occupiedSlashes[this.slashCodes[col][row]] = true
    this.occupiedBacks[this.backCodes[col][row]] = true
  }

  unPlace() {
    const row = this.queens.length - 1
    const col = this.queens.pop()

    delete this.occupiedCols[col]
    delete this.occupiedSlashes[this.slashCodes[col][row]]
    delete this.occupiedBacks[this.backCodes[col][row]]
  }

  canPlace(col, row) {
    return (
      !this.occupiedCols[col] &&
      !this.occupiedSlashes[this.slashCodes[col][row]] &&
      !this.occupiedBacks[this.backCodes[col][row]]
    )
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

  printOlymp() {
    this.queens.forEach(q => console.log(q))
  }
}

function solveFor(N) {
  function place(board, row = 0) {
    if (row >= N) {
      return board
    }

    let randomColumnOffset = Math.floor(N * 0.9189991)
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

  return place(new Board(N))
}

process.stdin.on('data', function (data) {
  const N = parseInt(data)
  solveFor(N).printOlymp()
})


// for (let i = 4; i < 10000; ++i) {
//   const key = `${i} queens`
//   console.time(key)
//   const result = solveFor(i)
//   console.timeEnd(key)
//
//   // console.log(result + '\n\n')
// }
//
