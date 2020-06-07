type Queen = {
	i: number,
	j: number
}

class Board {
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
		return this.queens[this.queens.length - 1]
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
		return this.queens.map(queen => `${queen.i}#${queen.j}`).join('#')
	}
}

function solveFor(N: number) {
	const memo = {}

	function place(board: Board, queensLeft: number = N, offset: number = 0) {
		const key = `${board.hashCode()}#${queensLeft}#${offset}`
		if (memo[key]) {
			return memo[key]
		}

		// console.log({ queensLeft, offset })
		// console.log('' + board)

		if (queensLeft <= 0) {
			return board
		}

		if (offset >= N) {
			return null
		}
		const j = N - queensLeft

		let placed: null | Queen = null
		for (let i = offset; i < N; ++i) {
			if (board.canPlace(i, j)) {
				placed = board.placeQueen(i, j)
				break
			}
		}

		if (!placed) {
			return null
		}

		const subBoard = place(board, queensLeft - 1, 0)
		if (subBoard) {
			return memo[key] = subBoard
		} else {
			board.undoLast()
			return place(board, queensLeft, offset + 1)
		}
	}

	return place(new Board(N))
}

for (let i = 4; i < 20; ++i) {
	const key = `${i} queens`
	console.time(key)
	solveFor(i)
	console.timeEnd(key)
}

// console.log('' + solveFor(8))
