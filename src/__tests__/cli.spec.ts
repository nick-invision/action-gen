import { readFileSync } from 'fs';
import { join, parse } from 'path';
import { execSync } from 'child_process';
import * as mkdirp from 'mkdirp';
import rimraf = require('rimraf');

// const CONFIG_TEMPLATE = './templates/.actiongenrc.js.mustache';
// const ACTION_TEMPLATE = './templates/action.yml.mustache';
// const README_TEMPLATE = './templates/README.md.mustache';

const BASE_CLI_CMD = 'ts-node ./src/cli';

async function genExec(config: string, directory: string): Promise<void> {
  const cmd = `${BASE_CLI_CMD} 'generate' '${config}' '-a' '${directory}'`;
  await execSync(cmd);
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function getTestOpts(subDir: string, configOverrides?: string[]) {
  const TEST_DIR = subDir;
  const GEN_OUTPUT_DIR = join(subDir, 'gen', 'cli');

  return {
    GEN_OUTPUT_DIR,
    GEN_OUTPUT_ACTION_PATH: join(GEN_OUTPUT_DIR, 'action.yml'),
    GEN_OUTPUT_README_PATH: join(GEN_OUTPUT_DIR, 'README.md'),
    EXPECTED_ACTION: readFileSync(join(TEST_DIR, 'action.yml')).toString(),
    EXPECTED_README: readFileSync(join(TEST_DIR, 'README.md')).toString(),
    CONFIGS: configOverrides ?? [
      join(subDir, '.actiongenrc.json'),
      join(subDir, '.actiongenrc.js'),
      join(subDir, '.actiongenrc.ts'),
    ],
    CLI_ACTION_DIR: GEN_OUTPUT_DIR, // CLI handles setting cwd
  };
}

describe('cli', () => {
  const testData = getTestOpts('src/__tests__/data/pal');

  beforeAll(async () => {
    rimraf.sync(testData.GEN_OUTPUT_DIR);
    mkdirp.sync(testData.GEN_OUTPUT_DIR);
  });

  describe('generate', () => {
    describe('private-action-loader', () => {
      for (const config of testData.CONFIGS) {
        test(`action.yml from ${parse(config).ext}`, async () => {
          await genExec(config, testData.CLI_ACTION_DIR);

          const generated = readFileSync(testData.GEN_OUTPUT_ACTION_PATH, 'utf8').toString();

          expect(generated).toBe(testData.EXPECTED_ACTION);
        }, 3000);

        test('README.md', async () => {
          await genExec(config, testData.CLI_ACTION_DIR);

          const generated = readFileSync(testData.GEN_OUTPUT_README_PATH, 'utf8').toString();

          expect(generated).toBe(testData.EXPECTED_README);
        }, 3000);
      }
    });

    describe('template', () => {
      const testData = getTestOpts('src/__tests__/data/template', ['./templates/.actiongenrc.js']);

      beforeAll(async () => {
        rimraf.sync(testData.GEN_OUTPUT_DIR);
        mkdirp.sync(testData.GEN_OUTPUT_DIR);
      });

      for (const config of testData.CONFIGS) {
        test(`action.yml from ${parse(config).ext}`, async () => {
          await genExec(config, testData.CLI_ACTION_DIR);

          const generated = readFileSync(testData.GEN_OUTPUT_ACTION_PATH, 'utf8').toString();

          expect(generated).toBe(testData.EXPECTED_ACTION);
        }, 3000);

        test(`README.md from ${parse(config).ext}`, async () => {
          await genExec(config, testData.CLI_ACTION_DIR);

          const generated = readFileSync(testData.GEN_OUTPUT_README_PATH, 'utf8').toString();

          expect(generated).toBe(testData.EXPECTED_README);
        }, 3000);
      }
    });
  });
});
