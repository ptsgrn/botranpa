#!/usr/bin/env -S deno run --allow-read --allow-write
// Copyright (c) 2023 Patsagorn Y.
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const { readTextFile, writeTextFile } = Deno;

import { Logger } from "./utils/logger.js";

interface LigthTagExample {
  content: string;
  seen_by: Seenby[];
  comments: unknown[];
  metadata: Metadata;
  example_id: string;
  annotations: Annotation[];
  classifications: Classification[];
}

interface Classification {
  correct?: unknown;
  class_id: string;
  reviewed: boolean;
  classname: string;
  example_id: string;
  classified_by: Annotatedby[];
  definition_id: string;
}

interface Annotation {
  end: number;
  tag: string;
  start: number;
  value: string;
  tag_id: string;
  correct?: unknown;
  reviewed: boolean;
  example_id: string;
  annotated_by: Annotatedby[];
  definition_id: string;
  tagged_token_id: string;
}

interface Annotatedby {
  annotator: string;
  timestamp: string;
  annotator_id: number;
}

interface Metadata {
  index: number;
}

interface Seenby {
  annotator: string;
  annotator_id: number;
}

interface SpacyFormat {
  text: string;
  entities: Entity[];
}

interface Entity {
  start: number;
  end: number;
  label: string;
}

const logger = new Logger("006", Deno.args);
const lightTagOutput: LigthTagExample[] = JSON.parse(
  await readTextFile("./input/006-lighttag-annotations.json").catch(() => {
    logger.error("Failed to read input file");
    Deno.exit(1);
  })
).examples;

const spacyOutput: SpacyFormat[] = lightTagOutput.map((example) => {
  const entities: Entity[] = example.annotations.map((annotation) => {
    return {
      start: annotation.start,
      end: annotation.end,
      label: annotation.tag,
    };
  });
  return {
    text: example.content,
    entities: entities,
  };
});
console.log(spacyOutput);
await writeTextFile(
  "./output/006-spacy-format.json",
  JSON.stringify(spacyOutput)
).catch(() => {
  logger.error("Failed to write output file");
  Deno.exit(1);
});
