import { read, readFileSync } from "fs";

// import TrieNPM from "trie-prefix-tree";
import Trie from "./trie.js";

const testwords = readFileSync("testwords2.txt", "utf8")
  .split("\n")
  .filter((x) => x.length > 0);

const trie = new Trie(testwords);

test("testImport", () => {
  expect(testwords).toBeTruthy();
  expect(trie).toBeTruthy();
});

test("testAdd", () => {
  expect(trie.pattern()).toBe("(?:ba(?:r|z)|foo)");
  trie.add("qux");
  expect(trie.pattern()).toBe("(?:ba(?:r|z)|foo|qux)");
});

test("testDump", () => {
  const dumped = trie.dump();
  expect(dumped).toBeTruthy();
  expect(dumped["f"]["o"]["o"]).toBeTruthy();
  expect(dumped["b"]["a"]["r"]).toBeTruthy();
  expect(dumped["b"]["a"]["z"]).toBeTruthy();
  expect(dumped["q"]["u"]["x"]).toBeTruthy();
});

test("test is valid regex pattern", () => {
  const pattern = trie.pattern();
  expect(pattern).toBeTruthy();
  expect(() => new RegExp(pattern)).not.toThrow();
});

test("flush", () => {
  trie.flush();
  expect(trie.pattern()).toBe("");
  expect(trie.dump()).toEqual({});
  expect(trie.data).toEqual({});
});
