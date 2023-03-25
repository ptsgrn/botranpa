// Copyright (c) 2023 Patsagorn Y.
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { checkField, requiredField } from "../../../utils/requestHelper.js";

import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import path from "path";

const apiV1Router = Router();
const prisma = new PrismaClient();

apiV1Router.get("/", (req, res) => {
  res.redirect("/");
});

apiV1Router.get("/available-menu", async (req, res) => {
  const availableMenu = await prisma.availableMenu
    .findMany({
      select: {
        id: true,
        name: true,
        available: true,
        alias: true,
        group: true,
        type: true,
      },
    })
    .catch((e) => {
      console.log(e);
      res.status(500).json({ error: e });
    });
  res.json(availableMenu);
});

apiV1Router.post(
  "/available-menu",
  requiredField(["name", "available", "alias"]),
  checkField(
    ["name", "available"],
    (field) => typeof field === "string",
    "ช่องข้อมูลไม่ใช่ string"
  ),
  checkField(
    ["alias"],
    (field) => Array.isArray(field),
    "ช่องข้อมูลไม่ใช่ array"
  ),
  checkField(
    ["alias"],
    (field) => field.every((a) => typeof a === "string"),
    "ค่าใน array ไม่ใช่ string"
  ),
  checkField(
    ["alias"],
    (field) => field.every((a) => a.length > 0),
    "ค่าใน array ว่าง"
  ),
  async (req, res) => {
    const { name, available, alias, group, type } = req.body;
    const availableMenu = await prisma.availableMenu.create({
      data: {
        name,
        group,
        type,
        available,
        alias,
      },
    });
    res.json(availableMenu);
  }
);

apiV1Router.put(
  "/available-menu/:id",
  requiredField(["name", "available", "alias", "group", "type"]),
  checkField(
    ["name", "available", "group", "type"],
    (field) => typeof field === "string",
    "ช่องข้อมูลไม่ใช่ string"
  ),
  checkField(
    ["alias"],
    (field) => Array.isArray(field),
    "ช่องข้อมูลไม่ใช่ array"
  ),
  checkField(
    ["alias"],
    (field) => field.every((a) => typeof a === "string"),
    "ค่าใน array ไม่ใช่ string"
  ),
  checkField(
    ["alias"],
    (field) => field.every((a) => a.length > 0),
    "ค่าใน array ว่าง"
  ),
  async (req, res) => {
    const { id } = req.params;
    const { name, available, alias, group, type } = req.body;
    try {
      const availableMenu = await prisma.availableMenu.update({
        where: {
          id,
        },
        data: {
          name,
          available,
          alias,
          group,
          type,
        },
      });
      res.json(availableMenu);
    } catch (e) {
      console.log(e);
      if (e.code === "P2025") {
        return res.status(404).json({ error: "Not found" });
      }
      res.status(500).json({ error: e });
    }
  }
);

apiV1Router.delete("/available-menu/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const availableMenu = await prisma.availableMenu.delete({
      where: {
        id,
      },
    });
    res.json(availableMenu);
  } catch (e) {
    console.log(e);
    if (e.code === "P2025") {
      return res.status(404).json({ error: "Not found" });
    }
    res.status(500).json({ error: e });
  }
});

apiV1Router.get("/available-menu/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const availableMenu = await prisma.availableMenu.findUniqueOrThrow({
      where: {
        id,
      },
    });
    res.json(availableMenu);
  } catch (e) {
    console.log(e);
    if (e.code === "P2025") {
      return res.status(404).json({ error: "Not found" });
    }
    res.status(500).json({ error: e });
  }
});

apiV1Router.get("/available-menu/:id/available", async (req, res) => {
  const { id } = req.params;
  try {
    const availableMenu = await prisma.availableMenu.findUniqueOrThrow({
      where: {
        id,
      },
      select: {
        available: true,
      },
    });
    res.json(availableMenu);
  } catch (e) {
    console.log(e);
    if (e.code === "P2025") {
      return res.status(404).json({ error: "Not found" });
    }
    res.status(500).json({ error: e });
  }
});

apiV1Router.get("/available-menu/:id/alias", async (req, res) => {
  const { id } = req.params;
  try {
    const availableMenu = await prisma.availableMenu.findUniqueOrThrow({
      where: {
        id,
      },
      select: {
        alias: true,
      },
    });
    res.json(availableMenu);
  } catch (e) {
    console.log(e);
    if (e.code === "P2025") {
      return res.status(404).json({ error: "Not found" });
    }
    res.status(500).json({ error: e });
  }
});

apiV1Router.post(
  "/available-menu/:id/alias",
  requiredField(["alias"]),
  checkField(
    ["alias"],
    (field) => Array.isArray(field),
    "ช่องข้อมูลไม่ใช่ array"
  ),
  checkField(
    ["alias"],
    (field) => field.every((a) => typeof a === "string"),
    "ค่าใน array ไม่ใช่ string"
  ),
  checkField(
    ["alias"],
    (field) => field.every((a) => a.length > 0),
    "ค่าใน array ว่าง"
  ),
  async (req, res) => {
    const { id } = req.params;
    const { alias } = req.body;
    try {
      const availableMenu = await prisma.availableMenu.update({
        where: {
          id,
        },
        data: {
          alias: {
            push: alias,
          },
        },
      });
      res.json(availableMenu);
    } catch (e) {
      console.log(e);
      if (e.code === "P2025") {
        return res.status(404).json({ error: "Not found" });
      }
      res.status(500).json({ error: e });
    }
  }
);

apiV1Router.get("/docs", (req, res) => {
  // send ./docs.html
  res.sendFile(
    path.join(import.meta.url.replace("file://", ""), "../docs.html")
  );
});

export default apiV1Router;
