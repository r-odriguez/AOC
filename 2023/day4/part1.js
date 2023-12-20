const fs = require("node:fs")
const file = fs.readFileSync("input1.txt", "utf8")

const result = file
      .split("\r\n")
      .map(line => line.split("|"))
      .map(line => line.map(ch => ch.split(" ").filter(v => v.length != 0 && Number(v))))
      .map(line => line[0].filter(num => line[1].includes(num)))
      .map(matches => matches.length <= 2 ? matches.length : Math.pow(2, matches.length -1))
      .reduce((acc, curr) => acc += Number(curr), 0)

console.log(result)
