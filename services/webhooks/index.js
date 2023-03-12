// Copyright (c) 2023 Patsagorn Y.
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import express, { json, urlencoded } from "express";

import morgan from "morgan";
import router from "./router/index.js";

const app = express();
const PORT = process.argv[2] || 3000;

app.use(morgan("dev"));
app.use(express.static("static"));
app.use(express.static("public"));
app.use(json());
app.use(urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
