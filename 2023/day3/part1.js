const fs = require("node:fs")
const file = fs.readFileSync("input1.txt", "utf8")

const curatedlines = file
      .split("\r\n")
      .map(line => [...line.matchAll(new RegExp(/\d+|[^\.0-9A-Za-z]/, 'g'))])
      .map((line, i) => line.map(match => ({v: match[0], pos: match.index, line: i})))
      .flat()

const symregex = new RegExp(/[^\.0-9A-Za-z]/)
const numregex = new RegExp(/\d+/)

let result = []

curatedlines.map(curr => curatedlines.map(neighbor => {
    const neighborIsSymbol = symregex.test(neighbor.v)
    const currentIsNumber = numregex.test(curr.v)
    const hasLeftSide = curr.line == neighbor.line && neighbor.pos == curr.pos + curr.v.length
    const hasRightSide = curr.line == neighbor.line && neighbor.pos == curr.pos - 1
    const hasAbove = curr.line - 1 == neighbor.line && (neighbor.pos >= curr.pos - 1 && neighbor.pos <= curr.pos + curr.v.length)
    const hasBelow = curr.line + 1 == neighbor.line && (neighbor.pos >= curr.pos - 1 && neighbor.pos <= curr.pos + curr.v.length)
    if ((neighborIsSymbol && currentIsNumber) && (hasLeftSide || hasRightSide || hasBelow || hasAbove))
        result.push(curr)
}))

result = result.reduce((acc, curr) => acc += Number(curr.v), 0)
console.log(result)
