type Permutation = Array<number>

function swap<T>(arr: Array<T>, i: number, j: number) {
	const temp: T = arr[i]
	arr[i] = arr[j]
	arr[j] = temp
}

function permutations(n: number): Array<Permutation> {
	function permutate(current: Permutation, results: Array<Permutation>) {
		results.push(current)

		let i = n - 1
		while (i > 0 && (current[i - 1] >= current[i])) {
			--i
		}

		let j = n
		while (j > 0 && (current[j - 1] <= current[i - 1])) {
			--j
		}

		if (j <= 0 || i <= 0)
			return

		const newPermutation = [...current]
		swap(newPermutation, i - 1, j - 1)
		i++
		j = n

		// bubble sort from i to N
		while (i < j) {
			swap(newPermutation, i - 1, j - 1)
			i++
			j--
		}

		permutate(newPermutation, results)
	}

	const initial: Permutation = []
	for (let i = 0; i < n; ++i) {
		initial.push(i + 1)
	}
	const results = []
	permutate(initial, results)
	return results
}

console.log(permutations(3).join('\n'))
