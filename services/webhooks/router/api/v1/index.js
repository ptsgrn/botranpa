// Copyright (c) 2023 Patsagorn Y.
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import AvailableMenu from "../../../models/AvailableMenu.js";
import { Router } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

const apiRouter = Router();

// get all menus
apiRouter.get("/menu", async (req, res) => {
  const menu = await AvailableMenu.find();
  return res.send(menu);
});

apiRouter.post("/menu", async (req, res) => {
  const menu = await AvailableMenu.create(req.body);
  return res.send(menu);
});

apiRouter.put("/menu", async (req, res) => {
  try {
    for (let i = 0; i < req.body.length; i++) {
      const { type, group, name, available, alias } = req.body[i];
      if (!type || !group || !name || !available) {
        return res.status(400).send("Bad Request");
      }
      const menu = await AvailableMenu.findOneAndUpdate(
        { type, group, name },
        {
          type,
          group,
          name,
          available,
          alias,
        }
      );
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

apiRouter.get("/menu/:id", async (req, res) => {
  const menu = await AvailableMenu.findById(req.params.id);
  return res.send(menu);
});

apiRouter.delete("/menu/:id", async (req, res) => {
  const menu = await AvailableMenu.findByIdAndDelete(req.params.id);
  return res.send(menu);
});

apiRouter.put("/menu/:id", async (req, res) => {
  const menu = await AvailableMenu.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  return res.send(menu);
});

export default apiRouter;
