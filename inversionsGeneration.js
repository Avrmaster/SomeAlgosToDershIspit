function swap(arr, i, j) {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

function generate(n) {
  const initial = []
  for (let i = 1; i <= n; ++i) {
    initial.push(i)
  }

  function helper(arr) {
    if (arr.length === 0) {
      return []
    }
    if (arr.length === 1) {
      return [arr]
    }

    const [first, ...tail] = arr
    const results = []
    const tailPermutations = helper(tail)

    for (const tailPermutation of tailPermutations) {
      for (let i = 0; i <= tailPermutation.length; ++i) {
        results.push([...tailPermutation.slice(0, i), first, ...tailPermutation.slice(i)])
      }
    }

    console.log(arr.length)
    return results
  }

  return helper(initial)
}

function generate2(n) {
  const LEFT = '<-'
  const RIGHT = '->'

  const arr = []
  const directions = []
  for (let i = 1; i <= n; ++i) {
    arr.push(i)
    directions.push(LEFT)
  }

  function isMovable(i) {
    return (
      (directions[i] === LEFT && (i - 1 >= 0) && (arr[i] > arr[i - 1])) ||
      (directions[i] === RIGHT && (i + 1 < arr.length) && (arr[i] > arr[i + 1]))
    )
  }

  // const results = []

  function iteration() {
    console.log(`${arr}`)
    // results.push([...arr])

    let maxMoving = null
    for (let i = 0; i < n; ++i) {
      if (isMovable(i) && (maxMoving === null || arr[i] > arr[maxMoving])) {
        maxMoving = i
      }
    }

    if (maxMoving === null) {
      return false
    }

    for (let i = 0; i < n; ++i) {
      if (arr[i] > arr[maxMoving]) {
        directions[i] = directions[i] === LEFT
          ? RIGHT
          : LEFT
      }
    }
    swap(
      arr,
      maxMoving,
      directions[maxMoving] === LEFT
        ? maxMoving - 1
        : maxMoving + 1,
    )
    swap(
      directions,
      maxMoving,
      directions[maxMoving] === LEFT
        ? maxMoving - 1
        : maxMoving + 1,
    )

    return true
  }

  while (true) {
    if (!iteration())
      break
  }
  // return results
}

// console.log(generate(0))
// console.log(generate(1))
// console.log(generate(2))
// console.log(generate(3))
// console.log(generate(4))
console.log(generate(9))
// console.log(generate2(9))

