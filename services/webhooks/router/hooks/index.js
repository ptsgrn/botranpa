// Copyright 2022 The Bot Ran Pa Team
//
// This software is licensed under the MIT License. See the LICENSE file at
// the root of the repository for more information.
/**
 * @typedef {Object} ResponseObject
 * @property {string} responseId - The ID of the response.
 * @property {QueryResultObject} queryResult - The result of the query.
 * @property {Object} originalDetectIntentRequest - The original intent request object.
 * @property {Object} session - The session information.
 * @property {Array} alternativeQueryResults - An array of alternative query results.
 */

/**
 * @typedef {Object} QueryResultObject
 * @property {string} queryText - The text of the query.
 * @property {Object} parameters - An object containing parameters of the query.
 * @property {string[]} parameters.menu - An array of menu items.
 * @property {string} parameters.quantity - The quantity of the order.
 * @property {string} fulfillmentText - The text of the fulfillment.
 * @property {Object[]} fulfillmentMessages - An array of fulfillment messages.
 * @property {Object[]} outputContexts - An array of output contexts.
 * @property {Object} intent - The intent object of the query.
 * @property {string} intent.name - The name of the intent.
 * @property {string} intent.displayName - The display name of the intent.
 * @property {number} intentDetectionConfidence - The confidence score of the intent detection.
 * @property {string} languageCode - The language code of the query.
 */

import extractor, { loadExtractorData } from "../../utils/extractor.js";

import { Router } from "express";
import dotenv from "dotenv";

dotenv.config();

setInterval(() => {
  loadExtractorData();
}, 1000 * 60 * 2);

const hooksRouter = Router();

hooksRouter.get("/", (req, res) => {
  res.redirect("/");
});

hooksRouter.post("/", async (req, res) => {
  // basic auth
  if (
    req.headers.authorization !==
    "Basic " +
      Buffer.from(
        `${process.env.DIALOGFLOW_BASIC_AUTH_USERNAME}:${process.env.DIALOGFLOW_BASIC_AUTH_PASSWORD}`
      ).toString("base64")
  ) {
    res.status(401).send("Unauthorized");
    return;
  }
  /** @type {ResponseObject} */
  const body = req.body;
  // get display name of intent
  const intent = body.queryResult.intent.displayName;
  // run js file for intent from ../../intents/{displayName}.js
  // if not exist run default.js in ../../intents
  let response;
  try {
    console.log("importing intent: ", intent);
    response = await import(`../../intents/${intent}.js`);
  } catch (e) {
    console.log("importing default intent");

    response = await import("../../intents/default.js");
  }
  const reply = await response.default({ body, extractor });
  console.log("reply: ", JSON.stringify(reply, " ", 2));
  res.json(reply);
});

export default hooksRouter;
