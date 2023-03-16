#!/usr/bin/env -S deno run --allow-read --allow-write

/**
 * สคริปต์สำหรับการคลีนข้อมูลโดยทำการ
 * 1. อ่านข้อมูลจากไฟล์ input/005-raw-user-history.txt
 * 2. ลบข้อความที่ซ้ำกันออก
 * 3. แปลงข้อมูลให้เป็นรูปแบบ CSV และเขียนลงไฟล์ output/005-cleaned-user-history.csv
 *
 */
import { Logger } from "./utils/logger.js";
const { readTextFile, writeTextFile } = Deno;
const logger = new Logger("005", Deno.args);
logger.empasize("Cleaning raw user history");
logger.log("Reading raw user history");
const rawUserHistory = (
  await readTextFile("./input/005-raw-user-history.txt").catch(logger.error)
).split("\n");
logger.log("Readed raw user history. Total lines: " + rawUserHistory.length);

const cleanedUserHistory = rawUserHistory
  // filter only unique lines
  .filter((l, i, a) => a.indexOf(l) === i)
  // create list of object with dummy property
  .map((l, index) => ({ text: l, index: index + 1 }));
logger.log(
  "Cleaned user history. Total lines: " + cleanedUserHistory.length,
  `(${rawUserHistory.length - cleanedUserHistory.length} lines removed)`
);

await writeTextFile(
  "./output/005-cleaned-user-history.json",
  JSON.stringify(cleanedUserHistory, null, 2)
)
  .catch(logger.error)
  .then(() => logger.log("Wrote cleaned user history to file"));
await writeTextFile(
  "./output/005-cleaned-user-history.txt",
  cleanedUserHistory
    .map((l) => l.text)
    .sort((a, b) => {
      // longer words first
      if (a.length > b.length) return -1;
      if (a.length < b.length) return 1;
      // then sort alphabetically
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    })
    .join("\n")
);
