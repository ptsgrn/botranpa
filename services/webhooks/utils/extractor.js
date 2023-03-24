// Copyright (c) 2023 Patsagorn Y.
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Extractor from "../../../packages/extractor/extractor.js";
import { readFileSync } from "fs";
const testwords = readFileSync(
  "/home/mose/schools/nsc-botranpa/packages/extractor/testwords.txt",
  "utf-8"
)
  .split("\n")
  .map((word) => word.trim());

const extractor = new Extractor(testwords);
extractor.addToken({
  add: ["เพิ่ม", "ใส่", "และใส่"],
  not_add: ["ไม่", "ไม่ใส่", "ไม่เพิ่ม", "แต่ไม่ใส่"],
  and: ["และ", "และเอา", "กับ", "แล้วก็"],
});

export default extractor;
