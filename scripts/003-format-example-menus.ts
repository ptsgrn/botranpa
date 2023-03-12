#!/usr/bin/env -S deno run --allow-read --allow-write
const { readTextFile, writeTextFile } = Deno;

// read csv file that have 2 columns: menu1, menu2 
const menus = (await readTextFile('./input/003-1-menus.csv')).split('\n').map((row) => row.split(','))

// write to csv file with "menu1","menu2" format
await writeTextFile('./output/003-menus.csv', menus.map((row) => '"'+row.join('","')+'"').join('\n'), {
  create: true
})