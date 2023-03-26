// Copyright 2022 The Bot Ran Pa Team
//
// This software is licensed under the MIT License. See the LICENSE file at
// the root of the repository for more information.
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
            // color: "#FFDAD6ff",
          },
          {
            type: "text",
            text: "ตรวจสอบเมนู หากถูกต้องแล้วให้กดยืนยัน",
            wrap: true,
            // color: "#FFDAD6ff",
          },
        ],
        position: "relative",
        spacing: "xs",
      },
      body: {
        type: "box",
        layout: "vertical",
        contents: [],
        backgroundColor: "#e5e5e5ff",
        cornerRadius: "md",
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
      },
      styles: {
        hero: {
          separator: false,
        },
        body: {
          backgroundColor: "#e5e5e5ff",
        },
      },
    };
  }

  addMenu({ name, options = [] }) {
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
      .map((menu, i) => {
        return {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "text",
              text: `${i + 1}. ${menu.name}`,
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
                    },
                    {
                      type: "text",
                      text: option[1],
                      wrap: true,
                      color: "#666666",
                      size: "sm",
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
    this.bubble.body.contents.push(
      {
        type: "separator",
        color: "#a2a9b1FF",
        margin: "md",
      },
      {
        type: "text",
        text: `รวม ${this.menus.length} รายการ`,
        margin: "lg",
        align: "end",
        size: "md",
      }
    );
    return this.bubble;
  }
}

export default MenuBuilder;
