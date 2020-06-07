type Queen = {
	i: number,
	j: number
}

class Board {
	// for toString() only
	private readonly arr: ReadonlyArray<Array<boolean>>
	private readonly queens: Array<Queen>

	constructor(N: number) {
		const arr = []
		for (let i = 0; i < N; ++i) {
			const row = []
			for (let j = 0; j < N; ++j) {
				row.push(false)
			}
			arr.push(row)
		}
		this.arr = arr
		this.queens = []
	}

	public canPlace(i: number, j: number) {
		return this.queens.every(queen => (
			queen.i !== i &&
			queen.j !== j &&
			Math.abs((queen.i - i)) !== Math.abs((queen.j - j))
		))
	}

	public placeQueen(i: number, j: number) {
		this.arr[i][j] = true
		this.queens.push({ i, j })
	}

	public undoLast() {
		const lastQueen = this.queens.pop()
		this.arr[lastQueen.i][lastQueen.j] = false
	}

	public toString() {
		const { length: N } = this.arr

		let builder = ''
		for (let i = 0; i < N; ++i) {
			for (let j = 0; j < N; ++j) {
				builder += this.arr[i][j] ? ' * ' : ' - '
			}
			builder += '\n'
		}
		return builder
	}

	public hashCode() {
		return this.queens.map(queen => `${queen.i}-${queen.j}`).join('#')
	}
}

function solveFor(N: number) {
	function place(board: Board, queensLeft: number = N) {
		// console.log({ queensLeft })
		// console.log('' + board)

		if (queensLeft <= 0) {
			return board
		}

		const row = N - queensLeft
		for (let column = 0; column < N; ++column) {
			if (board.canPlace(column, row)) {
				board.placeQueen(column, row)
				const subBoard = place(board, queensLeft - 1)
				if (subBoard) {
					return subBoard
				}
				board.undoLast()
			}
		}

		return null
	}

	return place(new Board(N))
}

// for (let i = 20; i < 100; i += 5) {
// 	const key = `${i} queens`
// 	console.time(key)
// 	for (let j = 0; j < 10; ++j) {
// 		const result = solveFor(i)
// 	}
// 	console.timeEnd(key)
//
// 	// console.log(result + '\n\n')
// }

for (let i = 4; i < 20; ++i) {
	const key = `${i} queens`
	console.time(key)
	const result = solveFor(i)
	console.timeEnd(key)

	console.log(result + '\n\n')
}
