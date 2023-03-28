// Copyright 2022 The Bot Ran Pa Team
//
// This software is licensed under the MIT License. See the LICENSE file at
// the root of the repository for more information.
// This code is translated to JS from Python in https://stackoverflow.com/a/42789508/1202830 on StackOverflow.
// Answered by Eric Duminil <https://stackoverflow.com/users/6419007/eric-duminil> on March 14, 2017
// Edited by Just a learner <https://stackoverflow.com/users/170931/just-a-learner> on April 29, 2019
// Translated to JS by @ptsgrn <https://www.github.com/ptsgrn>
// Released under CC BY-SA 4.0 <https://creativecommons.org/licenses/by-sa/4.0/>

/**
 * dumped trie data structure, as a nested object of objects and numbers
 * @typedef {Object.<string, TrieDumped | number>} TrieDumped
 * @example
 * {
 *  f: {
 *    o: {
 *      o: 1,
 *    },
 *  },
 *  b: {
 *    a: {
 *      r: 1,
 *    },
 *    a: {
 *      z: 1,
 *    },
 *  },
 * }
 */

/**
 * A trie data structure for building regular expressions to match a set of strings.
 * @see https://en.wikipedia.org/wiki/Trie
 */
class Trie {
  constructor(initialWords = []) {
    if (
      !Array.isArray(initialWords) ||
      initialWords.some((word) => typeof word !== "string")
    ) {
      throw new Error("initialWords must be an array of strings");
    }

    this.data = {};
    if (initialWords.length > 0) this.import(initialWords);
  }

  /**
   * Add a word to the trie.
   * @param {string} word word to add to the trie
   * @returns {void}
   */
  add(word) {
    let ref = this.data;
    for (const char of word) {
      if (/\s+/g.test(char)) continue;
      ref[char] = char in ref ? ref[char] : {};
      ref = ref[char];
    }
    ref[""] = 1;
  }

  /**
   * Add multiple words to the trie.
   * @param {string[]} words words to add to the trie
   * @returns {void}
   * @example
   * const trie = new Trie();
   * trie.import(["foo", "bar", "baz"]);
   * trie.pattern(); // => "(?:ba[rz]|fo[o])"
   */
  import(words) {
    for (const word of words) {
      this.add(word);
    }
  }

  /**
   * Dump the trie data structure.
   * @returns {TrieDumped} trie data structure
   */
  dump() {
    return this.data;
  }

  /**
   * Build a regular expression pattern from the trie.
   * @returns {string} regular expression pattern
   * @example
   * const trie = new Trie();
   * trie.add("foo");
   * trie.add("bar");
   * trie.add("baz");
   * trie.pattern(); // => "(?:ba[rz]|fo[o])"
   * new RegExp(trie.pattern()).test("foo"); // => true
   * new RegExp(trie.pattern()).test("qux"); // => false
   */
  quote(char) {
    return /[\\\^\$\.\*\+\?\(\)\[\]\{\}\|]/.test(char) ? `\\${char}` : char;
  }

  /**
   * @private
   * produce a pattern for a trie node
   * @param {TrieDumped} trieData
   * @returns {string}
   */
  _pattern(trieData) {
    const data = trieData;
    if ("" in data && Object.keys(data).length === 1) {
      return "";
    }

    const alt = [];
    const cc = [];
    let q = 0;
    for (const char of Object.keys(data).sort()) {
      if (typeof data[char] === "object") {
        try {
          const recurse = this._pattern(data[char]);
          alt.push(`${this.quote(char)}${recurse}`);
        } catch (e) {
          cc.push(this.quote(char));
        }
      } else {
        q = 1;
      }
    }
    const cconly = alt.length === 0;

    if (cc.length > 0) {
      if (cc.length === 1) {
        alt.push(cc[0]);
      } else {
        alt.push(`[${cc.join("")}]`);
      }
    }

    if (alt.length === 1) {
      var result = alt[0];
    } else {
      result = `(?:${alt.join("|")})`;
    }

    if (q) {
      if (cconly) {
        result += "?";
      } else {
        result = `(?:${result})?`;
      }
    }
    return result;
  }

  /**
   * Build a regular expression pattern from the trie.
   * @returns {string} regular expression pattern
   * @example
   * const trie = new Trie();
   * trie.add("foo");
   * trie.add("bar");
   * trie.add("baz");
   * trie.pattern(); // => "(?:ba[rz]|fo[o])"
   * new RegExp(trie.pattern()).test("foo"); // => true
   * new RegExp(trie.pattern()).test("qux"); // => false
   * @see https://stackoverflow.com/a/42789508/1202830
   */
  pattern() {
    if (Object.keys(this.data).length === 0) return "";
    return this._pattern(this.dump());
  }

  /**
   * Remove all words from the trie.
   * @returns {void}
   */
  flush() {
    this.data = {};
  }

  /**
   * Remove a word from the trie.
   * @param {string} word word to remove from the trie
   * @returns {void}
   */
  remove(word) {
    let ref = this.data;
    for (const char of word) {
      if (char in ref) {
        ref = ref[char];
      } else {
        return;
      }
    }
    delete ref[""];
  }
}

export default Trie;
