#!/usr/bin/env node
const { IntentsClient } = require('@google-cloud/dialogflow').v2;
const dialogflowClient = new IntentsClient();

const { writeFileSync } = require('fs');
const { join } = require('path');

const _intentId = 'dbe73aa6-8f3d-4fdc-a732-4069e2839724'
const _projectId = 'patsagonesite'

async function getTrainingPhrases({
  projectId = _projectId,
  intentId = _intentId,
}) {
  const name = `projects/${projectId}/agent/intents/${intentId}`;
  let [response, ..._a] = await dialogflowClient.getIntent({
    name,
    languageCode: 'th',
    intentView: 'INTENT_VIEW_FULL',
    fallback: 'rest'
  });
  console.log(response)
  const trainingPhrases = response.trainingPhrases.map((phrase) => {
    return phrase.parts.map((part) => part.text).join('');
  });

  return [trainingPhrases, response.displayName];
}

getTrainingPhrases({
  projectId: 'patsagonesite',
  intentId: 'dbe73aa6-8f3d-4fdc-a732-4069e2839724'
}).then(([response, displayName]) => {
  console.log(response)
  console.log(displayName)
  writeFileSync(
    join(__dirname, `./output/002-1-order-${displayName}.txt`),
    response.join('\n'),
    {
      encoding: 'utf8',
      flag: 'w',
    }
  );
})