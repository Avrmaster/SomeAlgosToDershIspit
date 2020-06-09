const conversions = { '0': 0, '1': 1, '2': 1, '3': 2 }

function countOnes(number4: string) {
	let res = 0
	for (const ch of number4) {
		res += conversions[ch]
	}
	return res
}

for (const n4 of [
	'0',
	'1',
	'2',
	'3',
	'2103221',
	'231301203103',
]) {
	console.log(`Ones in ${n4}: ${countOnes(n4)} ### (${parseInt(n4, 4).toString(2)})`)
}
