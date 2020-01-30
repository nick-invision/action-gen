#!/usr/bin/env node
import * as figlet from 'figlet';
import program = require('commander');
import * as colors from 'colors';
import { join } from 'path';
import { render } from './index';

const DEFAULT_DIR = process.cwd();
const DEFAULT_CONFIG = '.actiongenrc.js';
const DEFAULT_ACTION = 'action.yml';
const DEFAULT_README = 'README.md';

const ACTION_TEMPLATE = join(__dirname, '..', `templates/action.yml.mustache`);
const README_TEMPLATE = join(__dirname, '..', 'templates/README.md.mustache');

console.log(colors.america(figlet.textSync('ACTION-DOC-GEN', { horizontalLayout: 'default' })));

program
  .option(
    '-a, --actionDirectory <directory>',
    `Directory containing action.yml, README.md and .actionrc.<ts|js|json> (default: ${DEFAULT_DIR})`
  )
  .option('-c, --config <config>', `Path to config object (default: ${DEFAULT_CONFIG}`)
  .action(opts => {
    const actionDirectory = join(process.cwd(), opts.actionDirectory ?? DEFAULT_DIR);
    const actionPath = `${join(actionDirectory, DEFAULT_ACTION)}`;
    const readmePath = `${join(actionDirectory, DEFAULT_README)}`;
    const configPath = `${join(actionDirectory, opts.config ?? DEFAULT_CONFIG)}`;
    // render action.yml
    render(ACTION_TEMPLATE, configPath, actionPath);
    // render README.md
    render(README_TEMPLATE, configPath, readmePath);
  });

program.parse(process.argv);
