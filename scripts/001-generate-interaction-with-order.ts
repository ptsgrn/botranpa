#!/usr/bin/env -S deno run --allow-read --allow-write
const { readTextFile, writeTextFile } = Deno

const menus = (await readTextFile('./input/001-1-order-foodlist.txt')).split('\n')
const orders = (await readTextFile('./input/001-2-order.txt'))
  .split('\n')
  // unique the array
  .filter((value, index, list) => list.indexOf(value) == index)
  
const falsePositives = (await readTextFile('./input/001-3-false-positive.txt')).split('\n')
// deno-lint-ignore prefer-const
let textInteraction: string[] = []

for (const menu of menus) {
  for (const order of orders) {
    textInteraction.push(order.replace('<menu>', menu))
  }
}

// randomly add false positve to random index of textInteraction
for (const falsePositive of falsePositives) {
  textInteraction.splice(Math.floor(Math.random() * textInteraction.length), 0, falsePositive)
}

textInteraction = textInteraction.filter((value, index, list) => list.indexOf(value) == index)
// get random item and limit it to 500 textInteraction
textInteraction = textInteraction.sort(() => Math.random() - 0.5).slice(0, 500)

await writeTextFile('./output/001-interaction.txt', textInteraction.join('\n'), {
  create: true
})