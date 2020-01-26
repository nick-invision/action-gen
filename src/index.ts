import { render as mustacheRender } from 'mustache';
import { ActionConfig } from './ActionConfig';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import Mustache from 'mustache';
import importFresh from 'import-fresh';

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
export { ActionConfig, render };
