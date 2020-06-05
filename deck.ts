enum Suit {
	clubs = 'clubs',
	diamonds = 'diamonds',
	hearts = 'hearts',
	spades = 'spades'
}

class Card {
	public constructor(
		private suit: Suit,
		private value: number,
	) {

	}

	public lessOrEq(another: Card): boolean {
		return (
			this.suit < another.suit ||
			(this.suit === another.suit && this.value <= another.value)
		)
	}

	toString() {
		return `${Suit[this.suit]} <${this.value}>`.padEnd(12, ' ')
	}
}

const deck: Array<Card> = []
for (const suit of [Suit.diamonds, Suit.clubs, Suit.hearts, Suit.spades]) {
	for (let value = 2; value <= 130; ++value) {
		deck.push(new Card(suit, value))
	}
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

function print() {
	console.log(deck.map(d => d.toString()))
}

shuffle(deck)
print()

let sizeCalculator = 0

function sort(arr: Array<Card>) {
	if (arr.length > 1) {
		const middle = Math.floor(arr.length / 2)

		const left = arr.slice(0, middle)
		const right = arr.slice(middle)

		sizeCalculator += left.length + right.length

		sort(left)
		sort(right)

		let ki = 0
		let li = 0
		let ri = 0

		while (li < left.length && ri < right.length) {
			if (left[li].lessOrEq(right[ri])) {
				arr[ki++] = left[li++]
			} else {
				arr[ki++] = right[ri++]
			}
		}
		while (li < left.length) {
			arr[ki++] = left[li++]
		}
		while (ri < right.length) {
			arr[ki++] = right[ri++]
		}
	}
}

console.log(' ')
sort(deck)
print()
console.log('total size', deck.length)
console.log('total size', sizeCalculator)
