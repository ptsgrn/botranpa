// Copyright (c) 2023 Patsagorn Y.
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Extractor from "../../../packages/extractor/extractor.js";
import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";
import { setInterval } from "timers/promises";

const prisma = new PrismaClient();

const availableEntry = await prisma.availableMenu.findMany({
  select: {
    name: true,
    available: true,
    alias: true,
  },
});

const words = availableEntry
  .map((entry) => [entry.name, ...entry.alias])
  .flat();

const extractor = new Extractor(words);

extractor.addToken({
  add: ["เพิ่ม", "ใส่", "และใส่"],
  not_add: ["ไม่", "ไม่ใส่", "ไม่เพิ่ม", "แต่ไม่ใส่"],
  and: ["และ", "และเอา", "กับ", "แล้วก็"],
});

await prisma.$disconnect();

export default extractor;
