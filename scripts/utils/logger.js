// Copyright 2022 The Bot Ran Pa Team
//
// This software is licensed under the MIT License. See the LICENSE file at
// the root of the repository for more information.
// Copyright (c) 2023 Patsagorn Y.
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const color = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  reset: '\x1b[0m',
  bold: '\x1b[1m',
}

export class Logger {
  constructor(logname, argv) {
    this.name = logname;
    this.argv = argv || [];
  }

  log(...args) {
    console.log(color.white, `[${this.name}]:`, ...args, color.reset);
    return ""
  }

  debug(...args) {
    if (this.argv.includes('--debug')) {
      console.log(color.blue, `[${this.name}]:`, ...args, color.reset);
    }
    return ""
  }

  error(...args) {
    console.error(color.red, `[${this.name}]:`, ...args, color.reset);
    return ""
  }

  empasize(...args) {
    console.log(color.yellow + color.bold, `[${this.name}]:`, ...args, color.reset);
  }
}

export class LoggerFactory {
  constructor(argv) {
    this.argv = argv || [];
  }

  static getLogger(name, args) {
    const logger = new Logger(name, args);
    return {
      emphasize: (...args) => logger.empasize(...args),
      log: logger.log,
      debug: logger.debug,
      error: logger.error,
    }
  }
}