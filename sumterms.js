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


function generateTerms(n) {
  const memo = {}
  const results = []

  function add(newArr) {
    newArr.sort((a, b) => b - a)
    const key = JSON.stringify(newArr)
    if (!memo[key]) {
      results.push(newArr)
      memo[key] = true
    }
  }

  add([+n])
  for (let x = 1; x < n; ++x) {
    for (const y of generateTerms(n - x)) {
      add([+x, ...y])
    }
  }
  return results
}

function generateTermsLexicographic(n) {
  return generateTerms(n)
    .sort((a, b) => (
      -a.map((ae, i) => ae - b[i])
        .find(el => el !== 0)
    ))
}

// generateTermsLexicographic(13)
console.log(generateTermsLexicographic(13).join('\n'))
