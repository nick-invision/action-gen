import { readFileSync, mkdirSync, existsSync } from 'fs';
import { join, parse } from 'path';
import { sync } from 'rimraf';
import { render } from '../index';

const ACTION_TEMPLATE = './templates/action.yml.mustache';
const README_TEMPLATE = './templates/README.md.mustache';

function getTestOpts(
  subDir: string,
  configOverrides?: string[]
): {
  GEN_OUTPUT_DIR: string;
  GEN_OUTPUT_ACTION_PATH: string;
  GEN_OUTPUT_README_PATH: string;
  EXPECTED_ACTION: string;
  EXPECTED_README: string;
  CONFIGS: string[];
} {
  const TEST_DIR = join(process.cwd(), subDir);
  const GEN_OUTPUT_DIR = join(TEST_DIR, 'gen');

  return {
    GEN_OUTPUT_DIR,
    GEN_OUTPUT_ACTION_PATH: join(GEN_OUTPUT_DIR, 'action.yml'),
    GEN_OUTPUT_README_PATH: join(GEN_OUTPUT_DIR, 'README.md'),
    EXPECTED_ACTION: readFileSync(join(TEST_DIR, 'action.yml')).toString(),
    EXPECTED_README: readFileSync(join(TEST_DIR, 'README.md')).toString(),
    CONFIGS: configOverrides ?? [
      join(TEST_DIR, '.actiongenrc.json'),
      join(TEST_DIR, '.actiongenrc.js'),
      join(TEST_DIR, '.actiongenrc.ts'),
    ],
  };
}

describe('generate', () => {
  const testData = getTestOpts('src/__tests__/data/pal');

  beforeAll(() => {
    sync(testData.GEN_OUTPUT_DIR);
    if (!existsSync(testData.GEN_OUTPUT_DIR)) {
      mkdirSync(testData.GEN_OUTPUT_DIR);
    }
  });

  describe('private-action-loader', () => {
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

  describe('--init template', () => {
    const testData = getTestOpts('src/__tests__/data/template', [
      join(process.cwd(), './templates/.actiongenrc.js'),
    ]);

    beforeAll(() => {
      sync(testData.GEN_OUTPUT_DIR);
      if (!existsSync(testData.GEN_OUTPUT_DIR)) {
        mkdirSync(testData.GEN_OUTPUT_DIR);
      }
    });

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
