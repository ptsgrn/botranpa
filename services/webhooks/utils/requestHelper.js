// Copyright (c) 2023 Patsagorn Y.
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/**
 *
 * @param {string[]} fields request body fields to check
 * @returns
 */
export function requiredField(fields) {
  return (req, res, next) => {
    const missingFields = fields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `ช่องข้อมูลที่จำเป็นหายไป: ${missingFields.join(", ")}`,
      });
    }
    next();
  };
}

export function checkField(fields, checkFn, message) {
  return (req, res, next) => {
    const notPass = fields.filter((field) => !checkFn(req.body[field]));
    if (notPass.length > 0) {
      return res.status(400).json({
        error: `${message ?? "ช่องข้อมูลไม่ผ่านการตรวจสอบ"}: ${notPass.join(
          ", "
        )}`,
      });
    }
    next();
  };
}
