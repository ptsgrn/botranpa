import Trie from "./trie.js";

export default class Extractor extends Trie {
  constructor(initialWords) {
    super(initialWords);
    this.add_tokens = [];
    this.not_add_tokens = [];
    this.and_tokens = [];
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
      this.import(add);
    }
    if (not_add) {
      this.not_add_tokens.push(...not_add);
      this.import(not_add);
    }
    if (and) {
      this.and_tokens.push(...and);
      this.import(and);
    }

    return this;
  }

  /**
   * @param {string} text
   * @returns parsed menu data
   */
  extract(text) {
    const match = this.match(text);
    const add_tokens = this.add_tokens;
    const not_add_tokens = this.not_add_tokens;
    const and_tokens = this.and_tokens;

    const menuParts = this._extractMenuParts(match, and_tokens);
    let menuData = {};
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
  _extractMenuParts(match, and_tokens) {
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
      return "not_add";
    }
    return "unknown";
  }
}
