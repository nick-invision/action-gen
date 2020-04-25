import { parse, join } from 'path';
import { render as mustacheRender } from 'mustache';
import { ActionConfig } from './ActionConfig';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import Mustache from 'mustache';
import importFresh from 'import-fresh';
import * as yaml from 'js-yaml';
import camelcase = require('camelcase');
import mkdirp = require('mkdirp');

const DEFAULT_DIR = process.cwd();
const DEFAULT_CONFIG = '.actiongenrc.js';
const DEFAULT_INDEX = 'index.ts';
const DEFAULT_SOURCE = 'src/index.ts';

const INDEX_TEMPLATE = join(__dirname, '..', `templates/index.ts.mustache`);
const SOURCE_TEMPLATE = join(__dirname, '..', `templates/src-index.ts.mustache`);

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
function renderEntryPoint(inputPath: string, configPath: string, outputPath: string): string {
  const outDir = parse(outputPath).dir;

  if (!existsSync(inputPath)) {
    throw `${inputPath} not found`;
  }
  if (!existsSync(configPath)) {
    throw `${configPath} not found`;
  }

  const template = JSON.parse(readFileSync(inputPath, 'utf8').toString());
  const actionConfig = importFresh(configPath);

  // disable HTML escaping since we are not generating HTML
  Mustache.escape = (text: string): string => {
    return text;
  };

  template.inputs?.forEach((input: any) => {
    input['camelCaseName'] = camelcase(input.id);
  });

  template.outputs?.forEach((output: any) => {
    output['camelCaseName'] = camelcase(output.id);
  });

  const rendered = mustacheRender(template.toString(), actionConfig);

  if (!existsSync(outDir)) {
    mkdirp.sync(outDir);
  }

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

// cli commands
async function initEntry(opts: { actionDirectory: string }) {
  const actionDirectory = opts.actionDirectory
    ? join(process.cwd(), opts.actionDirectory)
    : DEFAULT_DIR;

  const indexPath = `${join(actionDirectory, DEFAULT_INDEX)}`;
  const sourcePath = `${join(actionDirectory, DEFAULT_SOURCE)}`;
  const configPath = `${join(actionDirectory, DEFAULT_CONFIG)}`;

  // render index.ts
  renderEntryPoint(INDEX_TEMPLATE, configPath, indexPath);

  // render src/index.ts
  renderEntryPoint(SOURCE_TEMPLATE, configPath, sourcePath);
}

export { ActionConfig, render, initConfigFromAction, renderEntryPoint, initEntry };
