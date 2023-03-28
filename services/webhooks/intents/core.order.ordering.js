// Copyright 2022 The Bot Ran Pa Team
//
// This software is licensed under the MIT License. See the LICENSE file at
// the root of the repository for more information.
import FlexMenuBubbleBuilder from "../utils/confirm-order-flex.js";

export default async function ordering({ body, extractor }) {
  let menu = body.queryResult.queryText;
  const menuMatch = extractor.match(menu);
  if (menuMatch.length === 0) {
    return {
      fulfillmentMessages: [
        {
          text: {
            text: [
              "❌ ไม่พบรายการอาหารที่คุณต้องการค่ะ\n\n" +
                "📝 ลองพิมพ์เมนูอีกครั้งนะคะ",
            ],
          },
        },
      ],
      outputContexts: [],
    };
  }
  const checkNotAvailable = extractor.checkAndReturnNotAvailable(menu);
  if (checkNotAvailable.length > 0) {
    return {
      fulfillmentMessages: [
        {
          text: {
            text: [
              "❌ ขออภัยค่ะ รายการอาหารดังต่อไปนี้ไม่ได้ขายวันนี้ค่ะ\n\n" +
                checkNotAvailable.join("\n") +
                "\n\n📝 กรุณาพิมพ์รายการอาหารใหม่นะคะ",
            ],
          },
        },
      ],
      outputContexts: [],
    };
  }

  let extracted = extractor.extract(menu);
  let menuSplited = extractor.splitMenuParts(menu);
  let menuListNormalized = extracted.map((menu, i) => {
    return (
      `\n${i + 1}. ${menu.name}` +
      menu.options
        .map(
          (option) =>
            `\n  - ${
              option.type === "add"
                ? "เพิ่ม"
                : option.type === "remove"
                ? "ไม่ใส่"
                : ""
            }${option.name}`
        )
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
    outputContexts: [
      {
        lifespanCount: 1,
        name: "projects/botranpa-2f9a0/agent/sessions/0c0b0b1b-1b1b-1b1b-1b1b-1b1b1b1b1b1b/contexts/ordering",
        parameters: {
          menu: JSON.stringify(extracted),
          menuSplited: JSON.stringify(menuSplited),
        },
      },
    ],
  };
}
