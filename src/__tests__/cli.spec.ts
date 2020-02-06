import { readFileSync, existsSync } from 'fs';
import { join, parse } from 'path';
import { render } from '../index';
import { execSync } from 'child_process';
import * as mkdirp from 'mkdirp';
import * as rimraf from 'rimraf';

// const CONFIG_TEMPLATE = './templates/.actiongenrc.js.mustache';
const ACTION_TEMPLATE = './templates/action.yml.mustache';
const README_TEMPLATE = './templates/README.md.mustache';

const BASE_CLI_CMD = 'ts-node ./src/cli';

async function genExec(config: string, directory: string): Promise<void> {
  const cmd = `${BASE_CLI_CMD} 'generate' '${config}' '-a' '${directory}'`;
  await execSync(cmd, {
    stdio: 'inherit',
  });
}

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
      // join(TEST_DIR, '.actiongenrc.json'),
      join(subDir, '.actiongenrc.js'),
      // join(TEST_DIR, '.actiongenrc.ts'),
    ],
    CLI_ACTION_DIR: GEN_OUTPUT_DIR, // CLI handles setting cwd
  };
}

describe('cli', () => {
  const testData = getTestOpts('src/__tests__/data/pal');

  beforeAll(async () => {
    rimraf.sync(testData.GEN_OUTPUT_DIR);
    if (!existsSync(testData.GEN_OUTPUT_DIR)) {
      mkdirp.sync(testData.GEN_OUTPUT_DIR);
    }
  });

  describe('private-action-loader', () => {
    for (const config of testData.CONFIGS) {
      test('action.yml', async () => {
        genExec(config, testData.CLI_ACTION_DIR);

        const generated = await readFileSync(testData.GEN_OUTPUT_ACTION_PATH, 'utf8').toString();

        expect(generated).toBe(testData.EXPECTED_ACTION);
      }, 3000);
    }
  });

  xdescribe('init template', () => {
    const testData = getTestOpts('src/__tests__/data/template', [
      join(process.cwd(), './templates/.actiongenrc.js'),
    ]);

    // beforeAll(() => {
    //   sync(testData.GEN_OUTPUT_DIR);
    //   if (!existsSync(testData.GEN_OUTPUT_DIR)) {
    //     mkdirSync(testData.GEN_OUTPUT_DIR);
    //   }
    // });

    for (const config of testData.CONFIGS) {
      describe(`from ${parse(config).ext} config`, () => {
        test('action.yml', () => {
          const rendered = render(ACTION_TEMPLATE, config, testData.GEN_OUTPUT_ACTION_PATH);
          expect(rendered).toBe(testData.EXPECTED_ACTION);
        });

        test('README.md', () => {
          const rendered = render(README_TEMPLATE, config, testData.GEN_OUTPUT_README_PATH);

          expect(rendered).toBe(testData.EXPECTED_README);
        });
      });
    }
  });
});
