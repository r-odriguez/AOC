const fs = require("node:fs")
const file = fs.readFileSync("input2.txt", "utf8")

function getCopies(cards, card, sep) {
    if (card.length == 0 || cards[card.id - 1] == cards.length) return 1
    let subset = [...cards].splice(card.id, card.length)
    return subset.map(c => getCopies(cards, c, sep)).flat().reduce((acc, curr) => acc += curr, 0) + 1
}

const Cards = file
      .split("\r\n")
      .map(line => line.split("|"))
      .map(line => line.map(ch => ch.split(" ").filter(v => v.length != 0 && Number(v))))
      .map(line => line[0].filter(num => line[1].includes(num)))
      .map((matches, i) => ({ id: i+1, matches: matches, length: matches.length }))

let result = Cards.map(card => getCopies(Cards, card, "")).reduce((acc, curr) => acc += curr, 0)
console.log(result)
