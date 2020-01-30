#!/usr/bin/env node
import * as figlet from 'figlet';
import program = require('commander');
import * as colors from 'colors';
import { join } from 'path';
import { render } from './index';
import { mkdirSync, writeFileSync, readFileSync } from 'fs';

const DEFAULT_DIR = process.cwd();
const DEFAULT_CONFIG = '.actiongenrc.js';
const DEFAULT_ACTION = 'action.yml';
const DEFAULT_README = 'README.md';

const ACTION_TEMPLATE = join(__dirname, '..', `templates/action.yml.mustache`);
const README_TEMPLATE = join(__dirname, '..', 'templates/README.md.mustache');
const CONFIG_TEMPLATE = join(__dirname, '..', `templates/${DEFAULT_CONFIG}`);

console.log(colors.america(figlet.textSync('ACTION-DOC-GEN', { horizontalLayout: 'default' })));

program
  .option(
    '-a, --actionDirectory <directory>',
    `Directory containing action.yml, README.md and .actionrc.<ts|js|json> (default: ${DEFAULT_DIR})`
  )
  .option('-c, --config <config>', `Path to config object (default: ${DEFAULT_CONFIG}`)
  .option(
    '-i, --init',
    'Initializes a starter configuration in default directory (or in directory passed to -a flag)'
  )
  .action(opts => {
    const actionDirectory = opts.actionDirectory
      ? join(process.cwd(), opts.actionDirectory)
      : DEFAULT_DIR;
    const actionPath = `${join(actionDirectory, DEFAULT_ACTION)}`;
    const readmePath = `${join(actionDirectory, DEFAULT_README)}`;
    const defaultConfig = `${join(actionDirectory, DEFAULT_CONFIG)}`;
    const configPath = opts.init
      ? defaultConfig
      : opts.config
      ? `${join(process.cwd(), opts.config)}`
      : defaultConfig;

    if (opts.init) {
      mkdirSync(actionDirectory, { recursive: true });
      writeFileSync(configPath, readFileSync(CONFIG_TEMPLATE, 'utf8'));
    }
    // render action.yml
    render(ACTION_TEMPLATE, configPath, actionPath);
    // render README.md
    render(README_TEMPLATE, configPath, readmePath);
  });

program.parse(process.argv);
