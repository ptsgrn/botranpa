import FlexMenuBubbleBuilder from "../utils/confirm-order-flex.js";
import extractor from "../utils/extractor.js";

export default async function ordering(body) {
  let menu = body.queryResult.queryText;
  let extracted = extractor.extract(menu);
  let menuSplited = extractor.splitMenuParts(menu);
  console.log(menuSplited);
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
          text: [
            "✨ รับเป็นดังนี้นะคะ\n__________________\n" +
              menuListNormalized.join("") +
              "\n__________________\n\n" +
              "❓ ยืนยันหรือไม่คะ?",
          ],
        },
      },
      {
        platform: "LINE",
        payload: {
          line: {
            altText: "ยืนยันรายการอาหาร",
            type: "flex",
            contents: (() => {
              const builder = new FlexMenuBubbleBuilder();
              extracted.forEach((menu) => {
                builder.addMenu(menu);
              });
              return builder.build();
            })(),
          },
        },
      },
      {
        platform: "LINE",
        text: {
          text: ["ยืนยันรายการอาหารโดยกดที่ปุ่มด้านบนได้เลยค่ะ"],
        },
      },
    ],
  };
}
