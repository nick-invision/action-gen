module.exports = {
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'angular',
        releaseRules: [
          { type: 'docs', scope: 'README', release: 'patch' },
          { type: 'refactor', scope: 'core-*', release: 'minor' },
          { type: 'refactor', release: 'patch' },
          { scope: 'no-release', release: false },
        ],
      },
    ],
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/github',
      {
        assets: [
          { path: 'dist/*', label: 'JS distribution' },
          { path: 'Templates/*', label: 'Mustache Templates' },
        ],
      },
    ],
  ],
  branch: 'master',
};
