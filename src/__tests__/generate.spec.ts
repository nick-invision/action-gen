import { readFileSync, mkdirSync, existsSync } from 'fs';
import { join, parse } from 'path';
import { render } from '../index';

const PAL_ACTION_TEMPLATE = './templates/action.yml.mustache';
const PAL_README_TEMPLATE = './templates/README.md.mustache';

const EXPECTED_PAL_ACTION = readFileSync('./src/__tests__/data/action.yml').toString();
const EXPECTED_PAL_README = readFileSync('./src/__tests__/data/README.md').toString();

const GEN_OUTPUT_DIR = join(process.cwd(), 'gen');
const ACTUAL_PAL_ACTION_PATH = `${GEN_OUTPUT_DIR}/action.yml`;
const ACTUAL_PAL_README_PATH = `${GEN_OUTPUT_DIR}/README.md`;

const TEST_CONFIG_TS = join(process.cwd(), 'src/__tests__/data/.actiongenrc.ts');
const TEST_CONFIG_JS = join(process.cwd(), 'src/__tests__/data/.actiongenrc.js');
const TEST_CONFIG_JSON = join(process.cwd(), 'src/__tests__/data/.actiongenrc.json');

const TEST_CONFIGS = [TEST_CONFIG_TS, TEST_CONFIG_JS, TEST_CONFIG_JSON];

describe('generate', () => {
  beforeAll(() => {
    if (!existsSync(GEN_OUTPUT_DIR)) {
      mkdirSync(GEN_OUTPUT_DIR);
    }
  });

  for (const config of TEST_CONFIGS) {
    describe(`from ${parse(config).ext} config`, () => {
      describe('action.yml', () => {
        test('private-action-loader test', async () => {
          const rendered = render(PAL_ACTION_TEMPLATE, config, ACTUAL_PAL_ACTION_PATH);

          expect(rendered).toBe(EXPECTED_PAL_ACTION);
        });
      });

      describe('README.md', () => {
        test('private-action-loader test', async () => {
          const rendered = render(PAL_README_TEMPLATE, config, ACTUAL_PAL_README_PATH);

          expect(rendered).toBe(EXPECTED_PAL_README);
        });
      });
    });
  }
});
