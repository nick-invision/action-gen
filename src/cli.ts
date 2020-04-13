#!/usr/bin/env node
import * as figlet from 'figlet';
import program = require('commander');
import { join } from 'path';
import { render, initConfigFromAction } from './index';
import { mkdirSync, writeFileSync, readFileSync } from 'fs';
import { america } from 'colors';

const DEFAULT_DIR = process.cwd();
const DEFAULT_CONFIG = '.actiongenrc.js';
const DEFAULT_ACTION = 'action.yml';
const DEFAULT_README = 'README.md';

const ACTION_TEMPLATE = join(__dirname, '..', `templates/action.yml.mustache`);
const README_TEMPLATE = join(__dirname, '..', 'templates/README.md.mustache');
const CONFIG_TEMPLATE = join(__dirname, '..', `templates/${DEFAULT_CONFIG}`);

console.log(america(figlet.textSync('ACTION-GEN', { horizontalLayout: 'default' })));

program
  .command('generate')
  .option(
    '-a, --actionDirectory <actionDirectory>',
    `Directory containing action.yml, README.md and .actiongenrc.<ts|js|json> (default: ${DEFAULT_DIR})`
  )
  .action(async opts => {
    const actionDirectory = opts.actionDirectory
      ? join(process.cwd(), opts.actionDirectory)
      : DEFAULT_DIR;
    const actionPath = `${join(actionDirectory, DEFAULT_ACTION)}`;
    const readmePath = `${join(actionDirectory, DEFAULT_README)}`;
    const configPath = `${join(actionDirectory, DEFAULT_CONFIG)}`;

    // render action.yml
    render(ACTION_TEMPLATE, configPath, actionPath);
    // render README.md
    render(README_TEMPLATE, configPath, readmePath);
  });

program
  .command('init')
  .option(
    '-a, --actionDirectory <actionDirectory>',
    `Directory where .actiongenrc.js will be created (default: ./)`
  )
  .option(
    '-f, --fromAction <fromAction>',
    `action.yml that should be used to initialize .actiongenrc.js config`
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

    console.log(america('DEBUG'));
    console.log('fromAction', opts.fromAction);

    if (opts.fromAction) {
      initConfigFromAction(CONFIG_TEMPLATE, join(process.cwd(), opts.fromAction), defaultConfig);
    } else {
      mkdirSync(actionDirectory, { recursive: true });
      writeFileSync(configPath, readFileSync(CONFIG_TEMPLATE, 'utf8'));
    }
    // render action.yml
    render(ACTION_TEMPLATE, configPath, actionPath);
    // render README.md
    render(README_TEMPLATE, configPath, readmePath);
  });

program.parse(process.argv);
