import extractor from "../utils/extractor.js";

export default async function ordering(body) {
  let menu = body.queryResult.queryText;
  let extracted = extractor.extract(menu);
  let menuListNormalized = extracted.map((menu, i) => {
    return (
      `\n${i + 1}. ${menu.name}` +
      menu.options
        .map((option) => `\n  - ${option.type}${option.name}`)
        .join("")
    );
  });
  return {
    fulfillmentMessages: [
      {
        text: {
          text: ["รับเป็นดังนี้นะคะ" + menuListNormalized.join("")],
        },
      },
      {
        line: {},
      },
    ],
  };
}
