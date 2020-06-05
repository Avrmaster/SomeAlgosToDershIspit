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
	for (let value = 2; value <= 13; ++value) {
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

function sort(arr) {
	function sortHelper(part, low, high): Array<Card> {
		if (low < high) {
			const middle = Math.floor((low + high) / 2)

			const left = sortHelper(part, low, middle)
			const right = sortHelper(part, middle + 1, high)
			const result = []

			let li = 0
			let ri = 0
			while (li < left.length && ri < right.length) {
				if (left[li].lessOrEq(right[ri])) {
					result.push(left[li++])
				} else {
					result.push(right[ri++])
				}
			}
			while (li < left.length) {
				result.push(left[li++])
			}
			while (ri < right.length) {
				result.push(right[ri++])
			}

			return result
		} else if (low == high) {
			return [part[low]]
		}
	}

	const copy = sortHelper(arr, 0, arr.length - 1)
	for (let i = 0; i < copy.length; ++i) {
		arr[i] = copy[i]
	}
}

console.log(' ')
sort(deck)
print()
