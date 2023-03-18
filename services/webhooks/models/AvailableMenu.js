// Copyright (c) 2023 Patsagorn Y.
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Schema, model } from "mongoose";

const AvailableMenuSchema = new Schema({
  type: String,
  group: String,
  name: String,
  available: Boolean,
  alias: [String],
});

export default model("AvailableMenu", AvailableMenuSchema);
