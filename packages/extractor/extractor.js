// Copyright 2022 The Bot Ran Pa Team
//
// This software is licensed under the MIT License. See the LICENSE file at
// the root of the repository for more information.
import Trie from "./trie.js";

export default class Extractor extends Trie {
  constructor(initialWords) {
    super(initialWords);
    this.add_tokens = [];
    this.not_add_tokens = [];
    this.and_tokens = [];
    this.aliasMap = new Map();
    this.not_available = [];
  }

  /**
   *
   * @param {string} text
   * @returns
   */
  match(text) {
    const pattern = `${this.pattern()}`;
    const re = new RegExp(pattern, "gmi");
    let match;
    let matches = [];
    while ((match = re.exec(text)) !== null) {
      matches.push(match[0]);
    }
    return matches;
  }

  /**
   * @param {string[]} dictionary.add - add_token words
   * @param {string[]} dictionary.not_add - not_add_token words
   * @param {string[]} dictionary.and - and_token words
   */
  addToken({ add, not_add, and }) {
    if (add) {
      this.add_tokens.push(...add);
    }
    if (not_add) {
      this.not_add_tokens.push(...not_add);
    }
    if (and) {
      this.and_tokens.push(...and);
    }

    this.import([...this.add_tokens, ...this.not_add_tokens, ...this.and_tokens]);
    return this;
  }

  /**
   * @param {string} text
   * @returns parsed menu data
   */
  extract(text) {
    console.log("match", this.match(text));
    const match = this.match(text).map((entry) => this._replaceAlias(entry));
    console.log("match",match);
    const add_tokens = this.add_tokens;
    const not_add_tokens = this.not_add_tokens;
    const and_tokens = this.and_tokens;

    const menuParts = this._splitMenuParts(match, and_tokens);
    let menuData = [];
    for (let i = 0; i < menuParts.length; i++) {
      const menuPart = menuParts[i];
      const menuPartTokens = this._extractMenuPartTokens({
        menuPart,
        add_tokens,
        not_add_tokens,
      });
      menuData[i] = menuPartTokens;
    }

    return menuData;
  }

  /**
   * @private
   * @param {string[]} match
   * @param {string[]} and_tokens
   */
  _splitMenuParts(match, and_tokens) {
    let menuParts = [];
    let menuPart = [];
    for (let i = 0; i < match.length; i++) {
      const word = match[i];
      if (and_tokens.includes(word)) {
        menuParts.push(menuPart);
        menuPart = [];
      } else {
        menuPart.push(word);
      }
    }
    menuParts.push(menuPart);
    return menuParts;
  }

  splitMenuParts(text) {
    return this._splitMenuParts(this.match(text), this.and_tokens);
  }

  /**
   * @private
   * @param {string[]} menuPart
   * @param {string[]} add_tokens
   * @param {string[]} not_add_tokens
   * @returns
   * @memberof Extractor
   */
  _extractMenuPartTokens({ menuPart, add_tokens, not_add_tokens }) {
    // find menu part, which is all text that exist before add_tokens and not_add_tokens
    /**
     * @type {{
     * name: string,
     * count: number,
     * note: string,
     * options: {
     * name: string,
     * type: "add" | "remove"
     * }[]
     * }}
     */
    let ret = {
      name: "",
      count: 1,
      note: "",
      options: [],
    };
    let menu = "";
    let lastMenuIndex = 0;
    for (let i = 0; i < menuPart.length; i++) {
      lastMenuIndex = i;
      const word = menuPart[i];
      if (add_tokens.includes(word) || not_add_tokens.includes(word)) {
        break;
      }
      menu += word;
    }
    ret.name = menu;
    let type = "unknown";
    for (let i = lastMenuIndex; i < menuPart.length; i++) {
      const word = menuPart[i];
      if (this._optionsType(word) !== "unknown") {
        type = this._optionsType(word);
        continue;
      }
      if (type === "unknown") continue;
      ret.options.push({
        name: menuPart[i],
        type,
      });
    }
    return ret;
  }

  /**
   *
   * @param {string} word
   * @returns
   */
  _optionsType(word) {
    if (this.add_tokens.includes(word)) {
      return "add";
    }
    if (this.not_add_tokens.includes(word)) {
      return "remove";
    }
    return "unknown";
  }

  /**
   *
   * @param {string} word คำหลักที่ต้องการแทนที่เป็น
   * @param {string[]} alias คำที่ต้องการแทนที่
   * @returns {Extractor}
   */
  addAlias(word, alias) {
    for (let i = 0; i < alias.length; i++) {
      this.aliasMap.set(alias[i], word);
    }
    return this;
  }

  _replaceAlias(text) {
    return this.aliasMap.get(text) || text;
  }

  /**
   *
   * @param {string[]} entry
   * @returns {Extractor}
   */
  addNotAvailable(entry) {
    this.not_available.push(...entry);
    return this;
  }

  checkAndReturnNotAvailable(text) {
    const match = this.match(text).map((word) => this._replaceAlias(word));
    const not_available = this.not_available;
    if (not_available.length === 0) return [];
    let unavailable = [];
    for (let i = 0; i < match.length; i++) {
      const word = match[i];
      if (not_available.includes(word)) {
        unavailable.push(word);
      }
    }
    return unavailable;
  }

  flush() {
    this.data = {};
    this.aliasMap = new Map();
    this.not_available = [];
    return this;
  }
}
