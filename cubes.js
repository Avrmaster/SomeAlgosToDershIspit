function generate(N) {

  function printSum(a, b) {
    console.log(Math.pow(a, 3) + Math.pow(b, 3))
  }

  for (let i = 0; i < N; ++i) {
    printSum(i, i + 1)
    printSum(i + 1, i + 1)
  }
}

generate(10)
