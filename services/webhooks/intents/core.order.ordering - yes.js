// Copyright 2022 The Bot Ran Pa Team
//
// This software is licensed under the MIT License. See the LICENSE file at
// the root of the repository for more information.

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function orderingYes({ body, extractor }) {
  const orderingContext = body.queryResult.outputContexts.filter((contexts) =>
    contexts.name.includes("/contexts/ordering")
  )[0];
  if (!orderingContext) {
    return {
      fulfillmentText: "ไม่พบรายการอาหารที่คุณต้องการค่ะ",
    };
  }
  const menu = JSON.parse(orderingContext.parameters?.menu);
  console.log(JSON.stringify(menu, " ", 2));
  await prisma.order.create({
    data: {
      menu: menu.map((item) => ({
        name: item.name,
        options: item.options.map((option) => ({
          name: option.name,
          type: option.type,
        })),
      })),
      time: new Date(),
    },
  });

  return {};
}
