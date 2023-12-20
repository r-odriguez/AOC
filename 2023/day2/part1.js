const fs = require('node:fs')
const input = fs.readFileSync('./input1.txt', 'utf8')

let lines = input.split('\r\n')
lines.pop()

let result = lines
    .map(line => line.split(/;|:/)
         .map(e => e.split(','))
         .map(e => e.map(e => e.split(" ")
                         .filter(s => s.length != 0))))
    .map(entry =>
        entry.map(r =>
            r.map(v => (Number(v[0]) > 12 && v[1] == 'red')
                  || (Number(v[0]) > 13 && v[1] == 'green')
                  || (Number(v[0]) > 14 && v[1] == 'blue')))
            .flat()
            .reduce((acc, curr) => acc || curr, false))
    .reduce((acc, curr, index) => !curr ? acc += index + 1 : acc += 0, 0)

console.log(result)
