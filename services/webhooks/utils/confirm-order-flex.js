// Copyright (c) 2023 Patsagorn Y.
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

class MenuBuilder {
  constructor() {
    this.menus = [];
    this.bubble = {
      type: "bubble",
      size: "mega",
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
            wrap: true,
          },
        ],
        position: "relative",
        spacing: "xs",
      },
      body: {
        type: "box",
        layout: "vertical",
        contents: [],
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
            margin: "md",
            size: "xs",
            color: "#DD3333FF",
            decoration: "underline",
            weight: "regular",
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
            color: "#DD3333FF",
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
      styles: {
        hero: {
          separator: false,
        },
      },
    };
  }

  addMenu({ name, options }) {
    this.menus.push({
      name,
      options: this._formatOption(options),
    });
    return this;
  }

  _formatOption(options) {
    return options.map(({ name, type }) => {
      return [type, name];
    });
  }

  build() {
    this.bubble.body.contents = this.menus
      .map((menu) => {
        return {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "text",
              text: menu.name,
              weight: "bold",
              size: "xl",
            },
            {
              type: "box",
              layout: "vertical",
              margin: "lg",
              spacing: "sm",
              contents: menu.options.map((option) => {
                return {
                  type: "box",
                  layout: "baseline",
                  spacing: "sm",
                  contents: [
                    {
                      type: "text",
                      text: option[0],
                      color: "#aaaaaa",
                      size: "sm",
                      flex: 1,
                    },
                    {
                      type: "text",
                      text: option[1],
                      wrap: true,
                      color: "#666666",
                      size: "sm",
                      flex: 5,
                    },
                  ],
                };
              }),
            },
          ],
          margin: "lg",
        };
      })
      .reduce((acc, cur, index) => {
        if (index > 0) {
          acc.push({
            type: "separator",
            margin: "xl",
            color: "#a2a9b1FF",
          });
        }
        acc.push(cur);
        return acc;
      }, []);
    return this.bubble;
  }
}

console.log(
  JSON.stringify(
    new MenuBuilder()
      .addMenu({
        name: "ข้าวผัดไข่เจียว",
        options: [
          { name: "เล็ก", type: "ขนาด" },
          { name: "ไข่ 1 ฟอง", type: "เพิ่ม" },
          { name: "ไข่ดาว 1 ฟอง", type: "เพิ่ม" },
        ],
      })
      .addMenu({
        name: "ข้าวผัดไข่เจียว",
        options: [
          { name: "เล็ก", type: "ขนาด" },
          { name: "ไข่ 1 ฟอง", type: "เพิ่ม" },
          { name: "ไข่ดาว 1 ฟอง", type: "เพิ่ม" },
        ],
      })
      .build()
  )
);
