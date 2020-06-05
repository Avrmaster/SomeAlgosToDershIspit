abstract class HiddenSized {
	constructor(
		private size: number,
	) {
	}

	abstract type(): string;

	public biggerThan(another: HiddenSized): boolean {
		if (this.constructor.name === another.constructor.name) {
			throw 'Cannot compare two instances of the same subclass!'
		}

		return this.size > another.size
	}

	public lessThan(another: HiddenSized): boolean {
		return this.size < another.size
	}

	public equal(another: HiddenSized): boolean {
		return !this.biggerThan(another) &&
			!this.lessThan(another)
	}

	toString(): string {
		return `${this.type()} ø${this.size}`.padEnd(10, ' ')
	}
}

class Screw extends HiddenSized {
	private screw: any

	type(): string {
		return 'Screw'
	}
}

class Nut extends HiddenSized {
	private nut: any

	type(): string {
		return 'Nut'
	}
}

function solveFor(N: number) {
	const nuts: Array<Nut> = []
	const screws: Array<Screw> = []

	for (let i = 0; i < N; ++i) {
		nuts.push(new Nut(i + 1))
		screws.push(new Screw(i + 1))
	}

	function swap<T>(arr: Array<T>, i: number, j: number) {
		const temp: T = arr[i]
		arr[i] = arr[j]
		arr[j] = temp
	}

	function shuffle<T>(arr: Array<T>) {
		for (let i = 0; i < arr.length; ++i) {
			swap(arr, i, Math.floor(Math.random() * arr.length))
		}
	}

	shuffle(nuts)
	shuffle(screws)

	function print() {
		console.log(nuts.map(n => n.toString()).join(' '))
		console.log(screws.map(n => n.toString()).join(' '))
	}

	console.log('Shuffled')
	print()

	function partition(arr: Array<HiddenSized>, pivot: HiddenSized, low: number, high: number) {
		console.log({ pivot })

		let smallestIndex = low
		for (let j = low; j < high; ++j) {
			if (arr[j].lessThan(pivot)) {
				swap(arr, j, smallestIndex)
				smallestIndex++
			} else if (arr[j].equal(pivot)) {
				swap(arr, j--, high)
			}
		}
		return smallestIndex
	}

	function quickSort(start = 0, end = N - 1) {
		if (start < end) {
			const nutsPivot = partition(nuts, screws[end], start, end)
			swap(nuts, nutsPivot, end)

			partition(screws, nuts[nutsPivot], start, end)
			swap(screws, nutsPivot, end)

			console.log()
			console.log({ nutsPivot })
			print()
			console.log()

			quickSort(start, nutsPivot - 1)
			quickSort(nutsPivot + 1, end)
		}

	}

	quickSort()
	print()
}

solveFor(10)

// for (let i = 100; i < 1000; i += 100) {
// 	const key = `N: ${i}`
// 	console.time(key)
// 	for (let j = 0; j < 1000; ++j) {
// 		solveFor(i)
// 	}
// 	console.timeEnd(key)
// }
