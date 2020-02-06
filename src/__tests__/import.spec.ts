import { readFileSync } from 'fs';
import { join } from 'path';
import * as mkdirp from 'mkdirp';
import rimraf = require('rimraf');
import { initConfigFromAction, render } from '../index';

const CONFIG_TEMPLATE = './templates/.actiongenrc.js.mustache';
const ACTION_TEMPLATE = './templates/action.yml.mustache';
const README_TEMPLATE = './templates/README.md.mustache';
const TEST_BASE_DIR = 'src/__tests__/data/import';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function getTestOpts(subDir: string) {
  const testDirectory = join(process.cwd(), subDir);
  const generatedOutputDirectory = join(testDirectory, 'gen');

  return {
    GEN_OUTPUT_DIR: generatedOutputDirectory,
    GEN_OUTPUT_CONFIG_PATH: join(generatedOutputDirectory, '.actiongenrc.js'),
    GEN_OUTPUT_ACTION_PATH: join(generatedOutputDirectory, 'action.yml'),
    GEN_OUTPUT_README_PATH: join(generatedOutputDirectory, 'README.md'),
    EXPECTED_CONFIG: readFileSync(join(testDirectory, '.actiongenrc.js')).toString(),
    EXPECTED_README: readFileSync(join(testDirectory, 'README.md')).toString(),
    EXPECTED_ACTION: readFileSync(join(testDirectory, 'action.yml')).toString(),
    INPUT_ACTION: join(testDirectory, 'action.yml'),
  };
}

describe('import', () => {
  // const testDir = readdirSync(TEST_BASE_DIR);
  const testDir = ['bare_minimum', 'all_options'];

  testDir.forEach(testSubDir => {
    describe(testSubDir, () => {
      const testData = getTestOpts(join(TEST_BASE_DIR, testSubDir));

      beforeAll(async () => {
        rimraf.sync(testData.GEN_OUTPUT_DIR);
        mkdirp.sync(testData.GEN_OUTPUT_DIR);
      });

      test('generate config from action', async () => {
        const rendered = initConfigFromAction(
          CONFIG_TEMPLATE,
          testData.INPUT_ACTION,
          testData.GEN_OUTPUT_CONFIG_PATH
        );

        expect(rendered).toBe(testData.EXPECTED_CONFIG);
      });

      test('generate action from new config', async () => {
        const rendered = render(
          ACTION_TEMPLATE,
          testData.GEN_OUTPUT_CONFIG_PATH,
          testData.GEN_OUTPUT_ACTION_PATH
        );

        expect(rendered).toBe(testData.EXPECTED_ACTION);
      });

      test('generate readme from new config', async () => {
        const rendered = render(
          README_TEMPLATE,
          testData.GEN_OUTPUT_CONFIG_PATH,
          testData.GEN_OUTPUT_README_PATH
        );

        expect(rendered).toBe(testData.EXPECTED_README);
      });
    });
  });
});
