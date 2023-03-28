// Copyright 2022 The Bot Ran Pa Team
//
// This software is licensed under the MIT License. See the LICENSE file at
// the root of the repository for more information.
// Copyright (c) 2023 Patsagorn Y.
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Extractor from "../../../packages/extractor/extractor.js";
import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";
import { setInterval } from "timers/promises";

const prisma = new PrismaClient();

const extractor = new Extractor();

loadExtractorData();

async function loadExtractorData() {
  console.log("Updating extractor");
  const availableEntry = await prisma.availableMenu.findMany({
    select: {
      name: true,
      available: true,
      alias: true,
    },
  });

  extractor.flush();

  extractor.addToken({
    add: ["เพิ่ม", "ใส่", "และใส่"],
    not_add: ["ไม่", "ไม่ใส่", "ไม่เพิ่ม", "แต่ไม่ใส่"],
    and: ["และ", "และเอา", "กับ", "แล้วก็"],
  });

  const wordsWithAlias = availableEntry.map((entry) => [
    entry.name,
    ...entry.alias,
  ]);

  extractor.import(wordsWithAlias.flat());
  for (const entry of availableEntry) {
    extractor.addAlias(entry.name, entry.alias);
  }
  extractor.addNotAvailable(
    availableEntry
      .filter((entry) => !entry.available)
      .map((entry) => entry.name)
  );

  await prisma.$disconnect();
}

export default extractor;
export { loadExtractorData };
