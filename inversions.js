function solve(n, t) {
  const memo = {}

  function calcPermutations(N, K) {
    if (N === 0)
      return 0
    if (K === 0)
      return 1

    const key = `${N}#${K}`
    if (memo[key] !== undefined) {
      return memo[key]
    }

    let sum = 0
    for (let j = 0; j < N && (K - j >= 0); j++) {
      sum += calcPermutations(
        N - 1,
        K - j,
      )
    }

    return memo[key] = sum
  }

  function swap(arr, i, j) {
    const temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
    return arr
  }

  const initialArray = []
  for (let i = 1; i <= n; ++i) {
    initialArray.push(i)
  }

  function permute(input, inversionsLeft = t) {
    if (inversionsLeft === 0) {
      return input
    }

    let smallest
    for (smallest = n - 1; smallest > 0; --smallest) {
      if (input[smallest - 1] < input[smallest]) {
        smallest = smallest - 1
        break
      }
    }

    let ceiling = -1
    for (let j = smallest + 1; j < n + 1; ++j) {
      if (ceiling === -1 || input[j] < input[ceiling])
        ceiling = j
    }

    const newPermutation = swap([...input], smallest, ceiling)
    return permute(newPermutation, inversionsLeft - 1)
  }

  const amount = calcPermutations(n, t)
  console.log(amount)
  console.log(amount <= 0 ? '-' : permute(initialArray).join(' '))
}

process.stdin.on('data', function (data) {
  const [n, t] = Buffer.from(data)
    .toString('utf-8')
    .split(' ')
    .map(a => parseInt(a))

  solve(n, t)
})
