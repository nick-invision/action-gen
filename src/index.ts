import { render as mustacheRender } from 'mustache';
import { ActionConfig } from './ActionConfig';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import Mustache from 'mustache';
import importFresh from 'import-fresh';
import * as yaml from 'js-yaml';

// helpers
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function parseAction(actionObject: ActionConfig) {
  const inputs = [];
  const outputs = [];

  for (const input in actionObject.inputs) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    inputs.push(Object.assign(actionObject.inputs[input], { id: input }));
  }
  for (const output in actionObject.outputs) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    outputs.push(Object.assign(actionObject.outputs[output], { id: output }));
  }

  actionObject.inputs = inputs;
  actionObject.outputs = outputs;

  return actionObject;
}

// guts
function render(inputPath: string, configPath: string, outputPath: string): string {
  if (!existsSync(inputPath)) {
    throw `${inputPath} not found`;
  }
  if (!existsSync(configPath)) {
    throw `${configPath} not found`;
  }

  const template = readFileSync(inputPath, 'utf8').toString();
  const actionConfig = importFresh(configPath);

  // disable HTML escaping since we are not generating HTML
  Mustache.escape = (text: string): string => {
    return text;
  };

  const rendered = mustacheRender(template, actionConfig);

  writeFileSync(outputPath, rendered);

  return rendered;
}

function initConfigFromAction(
  configTemplate: string,
  actionInput: string,
  outputPath: string
): string {
  if (!existsSync(configTemplate)) {
    throw `${configTemplate} not found`;
  }

  const template = readFileSync(configTemplate, 'utf8').toString();
  const actionYml = yaml.safeLoad(readFileSync(actionInput, 'utf8').toString());

  // disable HTML escaping since we are not generating HTML
  Mustache.escape = (text: string): string => {
    return text;
  };

  const parsedAction = parseAction(actionYml);
  const rendered = mustacheRender(template, parsedAction);

  writeFileSync(outputPath, rendered);

  return rendered;
}

/**
 * Helper to make it easier to create a "typed" config from a vanilla js config
 * @param config
 */
function buildConfig(config: ActionConfig): ActionConfig {
  return config;
}

export { ActionConfig, render, initConfigFromAction, buildConfig };
