// Copyright 2022 The Bot Ran Pa Team
//
// This software is licensed under the MIT License. See the LICENSE file at
// the root of the repository for more information.
import { Schema, model } from "mongoose";

const AvailableMenuSchema = new Schema({
  type: String,
  group: String,
  name: String,
  available: Boolean,
  alias: [String],
});

export default model("AvailableMenu", AvailableMenuSchema);
