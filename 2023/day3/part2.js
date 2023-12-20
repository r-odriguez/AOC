const fs = require("node:fs")
const file = fs.readFileSync("input2.txt", "utf8")

let idCounter = 0
const curatedlines = file
      .split("\r\n")
      .map(line => [...line.matchAll(new RegExp(/\d+|\*/, 'g'))])
      .map((line, i) => line.map(match => {
          idCounter += 1
          return {id: idCounter, v: match[0], x: match.index, y: i}
      }))
      .flat()

const symregex = new RegExp(/\*/)
const numregex = new RegExp(/\d+/)

let gearRatios = []

for (let curr of curatedlines) {
    const currentIsSymbol = symregex.test(curr.v)
    if (currentIsSymbol) {
        let gear = [curr, []]

        for (let neighbor of curatedlines) {
            const neighborIsNumber = numregex.test(neighbor.v)
            if (neighborIsNumber) {
                const hasLeftSide = neighbor.y == curr.y && curr.x == neighbor.x + neighbor.v.length
                const hasRightSide = neighbor.y == curr.y && curr.x == neighbor.x - 1
                const hasBelow = neighbor.y - 1 == curr.y && (curr.x >= neighbor.x - 1 && curr.x <= neighbor.x + neighbor.v.length)
                const hasAbove = neighbor.y + 1 == curr.y && (curr.x >= neighbor.x - 1 && curr.x <= neighbor.x + neighbor.v.length)

                if (hasLeftSide || hasRightSide || hasBelow || hasAbove)
                    gear[1].push(neighbor.v)
            }
        }

        gearRatios.push(gear)
    }
}

let result = gearRatios
    .filter(v => v[1].length == 2)
    .map(v => Number(v[1][0]) * Number(v[1][1]))
    .reduce((acc, curr) => acc += curr, 0)

console.log(result)
