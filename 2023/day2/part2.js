const fs = require('node:fs')
const input = fs.readFileSync('./input2.txt', 'utf8')

const lines = input.split("\r\n")
const regex = new RegExp(/(\d+) (blue|green|red)/, 'gi')
const sessions = lines.map(e => [...e.matchAll(regex)])

const points = sessions
      .map(game => game.map(e => [Number(e[1]), e[2]]))
      .map(game => {
          const bluep  = game.filter(play => play[1] == 'blue' ).sort((a, b) => b[0] - a[0])[0]
          const redp   = game.filter(play => play[1] == 'red'  ).sort((a, b) => b[0] - a[0])[0]
          const greenp = game.filter(play => play[1] == 'green').sort((a, b) => b[0] - a[0])[0]
          return bluep[0] * redp[0] * greenp[0]
      }).reduce((acc, curr) => acc += curr, 0)

console.log(points)
