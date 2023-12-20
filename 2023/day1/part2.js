const fs = require('node:fs')
const input = fs.readFileSync('./input2.txt', 'utf8')

const Nums = [
    ["one"  , '1'],
    ["two"  , '2'],
    ["three", '3'],
    ["four" , '4'],
    ["five" , '5'],
    ["six"  , '6'],
    ["seven", '7'],
    ["eight", '8'],
    ["nine" , '9'],
]

const result = input
      .split('\r\n')
      .slice(0, -1)
      .reduce((acc, line, index, arr) => {
	      const nums = line
		        .split('')
		        .map((c, i) => [c, i])
		        .filter(c => c[0] >= '0' && c[0] <= '9')
	      const wordNums = Nums
		        .map(n => [...line.matchAll(new RegExp(n[0], 'gi'))])
		        .filter(e => e.length != 0)
		        .map(n => n.map(n => [n[0], n.index]))
		        .flat()
	      const resultList = wordNums
		        .concat(nums)
		        .sort((x, y) => x[1] - y[1])
		        .map(n => {
		            let translationArr = Nums.filter(e => e[0] == n[0])[0]
		            let translatedNum = translationArr != undefined ? translationArr[1] : 0
		            return translatedNum != 0 ? translatedNum : n[0]
		        })

	      const first = resultList[0]
	      const last = resultList[resultList.length - 1]
	      acc += Number(first + last)
	      return acc
      }, 0)

console.log(result)
