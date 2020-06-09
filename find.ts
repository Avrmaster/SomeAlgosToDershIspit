function find(
	f: (x: number) => number,
	a: number,
	b: number,
	eps: number,
) {
	const fa: number = f(a)
	const fb: number = f(b)

	if (Math.abs(fa) < eps) {
		return a
	}
	if (Math.abs(fa) < eps) {
		return b
	}

	if (fa * fb > 0) {
		return NaN
	}

	const middle = (a + b) / 2
	const fm = f(middle)

	if (fa * fm >= 0) {
		return find(f, middle, b, eps)
	} else {
		return find(f, a, middle, eps)
	}
}

const f = (x) => 10 * x + 4
const a = -100000
const b = 100000
const eps = 0.000001

console.log(find(f, a, b, eps))
console.log(`Steps to process: ${Math.ceil(Math.log2(Math.abs(f(a) - f(b)) / eps))}`)

// difficulty:
// O(logN), where N is (abs(f(a)-f(b))/e)
