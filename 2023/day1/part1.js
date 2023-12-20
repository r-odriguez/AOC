const fs = require('node:fs')
const input = fs.readFileSync('./input1.txt', 'utf8')

const result = input
      .split('\r\n')
      .reduce((acc, line, index, arr) => {
	      let nums = [...line].filter(c => c >= '0' && c <= '9')
	      let first = nums[0]
	      let last = nums[nums.length - 1]
	      acc += Number(first + last)
	      return acc
      }, 0)

console.log(result)
