const memo = {}

function P(n, k) {
  const key = `${n}#${k}`
  if (isFinite(memo[key]))
    return memo[key]

  if (n === 0 && k === 0) {
    return 1
  }
  if (k === 0) {
    return 0
  }

  if (k > n) {
    return P(n, n)
  }

  return memo[key] = P(n, k - 1) + P(n - k, k)
}

console.log(P(5, 4))
