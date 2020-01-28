module.exports = {
  plugins: [
    [
      {
        releaseRules: [
          { type: 'docs', scope: 'README', release: 'patch' },
          { type: 'minor', release: 'minor' },
          { type: 'major', release: 'major' },
          { type: 'patch', release: 'patch' },
          { scope: 'no-release', release: false },
        ],
      },
    ],
    '@semantic-release/release-notes-generator',
  ],
  branch: 'master',
};
