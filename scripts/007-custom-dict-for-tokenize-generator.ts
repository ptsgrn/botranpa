#!/usr/bin/env -S deno run --allow-read --allow-write
const { readTextFile, writeTextFile } = Deno;

import { Logger } from "./utils/logger.js";

const logger = new Logger("007");

const words = (await readTextFile("data/new_text_tokenised-ref.txt"))
  .split("\n")
  .map((line) => line.replace(/(\s+|[0-9]+)/gi, "").split("|"))
  .flat()
  .filter((line) => line.length > 1)
  .filter((v, i, a) => a.indexOf(v) === i)
  .sort();

await writeTextFile("output/007-new-tokenized-words.txt", words.join("\n"));
