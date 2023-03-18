// Copyright (c) 2023 Patsagorn Y.
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// append file to log file
import { appendFile, open } from "fs/promises";

import { Router } from "express";
import apiRouterV1 from './api/v1/index.js';
import hooksRouter from "./hooks/index.js";

const router = Router();

// simple logger for this router's requests
// all requests to this router will first hit this middleware
router.use(async (req, res, next) => {
  // in format [time] [method] [url] req.body
  console.log(
    `[${new Date().toLocaleString()}] [${req.method}] [${req.url
    }] ${JSON.stringify(req.body)}`
  );
  next();
});

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.use("/hooks", hooksRouter);
router.get("/playground", (req, res) => {
  res.render("playground", {
    url: req.url,
    lang: req.headers["accept-language"],
  });
});

router.use('/api/v1', apiRouterV1);

router.use((req, res, next) => {
  if (req.method === "GET")
    return res.render("404", {
      url: req.url,
      lang: req.headers["accept-language"],
    });
  res.status(404).send("404 Not Found");
});

export default router;
