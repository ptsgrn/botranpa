import Extractor from "./extractor.js";
import { readFileSync } from "fs";

const testwords = readFileSync("testwords.txt", "utf8").split("\n");

const extractor = new Extractor(testwords);

test("testImport", () => {
  expect(testwords).toBeTruthy();
  expect(extractor).toBeTruthy();
});

test("import", () => {
  extractor.import(testwords);
  expect(extractor.pattern()).toBe(
    "(?:กระเทียมเจียว|งอก|ชูรส|ต(?:ก|ับ|้มยำ)|ถั่วงอก|น้ำ(?:ตก|แห้ง|ใส)|บะหมี่(?:เหลือง)?|ผ(?:งชูรส|ัก)|พิเศษ|มาม่า|ลูกชิ้น|วุ้น(?:เส้น)?|หมี่(?:ขาว|เหลือง)|เ(?:กี้ยว|จียว|นื้อ(?:วัว)?|ยอะๆ|ล็ก|ส้น(?:บะหมี่(?:กึ่งสำเร็จรูป|เหลือง)|หมี่|เล็ก)|อฟเอฟ)|แห้ง|ใส|ไก่ตุ๋น)"
  );
});

test("test match", () => {
  const text = "หมี่เหลือง";
  const match = extractor.match(text);
  expect(match).toBeTruthy();
  expect(match[0]).toBe("หมี่เหลือง");

  const text2 = "หมี่เหลืองเกี้ยว";
  const match2 = extractor.match(text2);
  expect(match2).toBeTruthy();
  expect(match2[0]).toBe("หมี่เหลือง");

  const text3 = "ตก";
  const match3 = extractor.match(text3);
  expect(match3).toBeTruthy();
  expect(match3[0]).toBe("ตก");
});

test("test match 2", () => {
  const text = "ขอเป็นบะหมี่เหลืองตกบะหมี่เหลืองค่ะ";
  const match = extractor.match(text);
  expect(match).toBeTruthy();
  expect(match[0]).toBe("บะหมี่เหลือง");
  expect(match[1]).toBe("ตก");
  expect(match[2]).toBe("บะหมี่เหลือง");

  const text2 = "เล็กแห้งต้มยำ";
  const match2 = extractor.match(text2);
  expect(match2).toBeTruthy();
  expect(match2[0]).toBe("เล็ก");
  expect(match2[1]).toBe("แห้ง");
  expect(match2[2]).toBe("ต้มยำ");
});

test("test match 3", () => {
  extractor.add("ไม่");
  extractor.add("กระเทียม");
  expect(extractor.match("เล็กไก่ตุ๋นต้มยำไม่ผักไม่กระเทียม")).toEqual([
    "เล็ก",
    "ไก่ตุ๋น",
    "ต้มยำ",
    "ไม่",
    "ผัก",
    "ไม่",
    "กระเทียม",
  ]);

  extractor.remove("กระเทียม");
  expect(extractor.match("เล็กไก่ตุ๋นต้มยำไม่ผักไม่กระเทียม")).toEqual([
    "เล็ก",
    "ไก่ตุ๋น",
    "ต้มยำ",
    "ไม่",
    "ผัก",
    "ไม่",
  ]);
});

test("test extract", () => {
  extractor.addToken({
    add: ["เพิ่ม", "ใส่"],
    not_add: ["ไม่ใส่", "ไม่เอา", "ไม่"],
    and: ["กับ", "และ", "แล้วก็"],
  });
  expect(extractor.extract("เล็กไก่ตุ๋นต้มยำไม่ผักไม่เจียว")).toEqual({
    0: {
      name: "เล็กไก่ตุ๋นต้มยำ",
      count: 1,
      note: "",
      options: [
        {
          name: "ผัก",
          type: "not_add",
        },
        {
          name: "เจียว",
          type: "not_add",
        },
      ],
    },
  });
});
