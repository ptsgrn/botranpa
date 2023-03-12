// Copyright (c) 2023 Patsagorn Y.
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

class Comp {
  static seperator() {
    return {
      type: "separator",
      margin: "xl",
      color: "#a2a9b1FF",
    };
  }
  /**
   * @static
   * @param {string} param0.menuTitle ชื่อเมนู
   * @param {{[x: string]: string}} param0.feature คุณสมบัติของเมนู
   */
  static menu({ menuTitle = "ไม่มีชื่อเมนู", feature = [] }) {
    let contents = [];
    feature.forEach(([prop, value]) => {
      contents.push({
        type: "box",
        layout: "baseline",
        spacing: "sm",
        contents: [
          {
            type: "text",
            text: prop,
            color: "#aaaaaa",
            size: "sm",
            flex: 1,
          },
          {
            type: "text",
            text: value,
            wrap: true,
            color: "#666666",
            size: "sm",
            flex: 5,
          },
        ],
      });
    });
    return {
      type: "box",
      layout: "vertical",
      contents: [
        {
          type: "text",
          text: menuTitle,
          weight: "bold",
          size: "xl",
        },
        {
          type: "box",
          layout: "vertical",
          margin: "lg",
          spacing: "sm",
          contents: contents,
        },
      ],
      margin: "lg",
    };
  }
}

let base = {
  type: "bubble",
  header: {
    type: "box",
    layout: "vertical",
    contents: [
      {
        type: "text",
        text: "ยืนยันเมนูหรือไม่",
        size: "xxl",
        weight: "bold",
        position: "relative",
        align: "start",
      },
      {
        type: "text",
        text: "ตรวจสอบเมนู หากถูกต้องแล้วให้กดยืนยัน",
      },
    ],
    position: "relative",
    spacing: "xs",
  },
  body: {
    type: "box",
    layout: "vertical",
    contents: [
      Comp.menu(),
      Comp.seperator(),
      Comp.menu(),
      Comp.seperator(),
      {
        type: "text",
        text: "รวมทั้งสิ้น 2 รายการ",
        size: "md",
        align: "end",
        margin: "md",
      },
    ],
    margin: "none",
  },
  footer: {
    type: "box",
    layout: "vertical",
    spacing: "sm",
    contents: [
      {
        type: "button",
        style: "primary",
        height: "sm",
        action: {
          type: "message",
          label: "ยืนยัน",
          text: "ยืนยัน",
        },
        margin: "sm",
      },
      {
        type: "text",
        text: "(หมายเหตุ: การกดยืนยันไม่ได้เป็นการสั่งอาหารจริง)",
        align: "center",
        margin: "none",
        size: "xs",
        color: "#DD3333FF",
        decoration: "underline",
      },
      {
        type: "button",
        style: "link",
        height: "sm",
        action: {
          type: "message",
          label: "ยกเลิก",
          text: "ยกเลิก",
        },
      },
      {
        type: "box",
        layout: "vertical",
        contents: [],
        margin: "sm",
      },
    ],
    flex: 0,
  },
  size: "mega",
  styles: {
    hero: {
      separator: false,
    },
  },
};

console.log(base);
