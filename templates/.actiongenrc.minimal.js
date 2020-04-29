module.exports = {
  name: 'Hello World',
  description: {
    short: 'short description',
  },
  inputs: [
    {
      id: 'pal-repo-token',
      description: {
        short: 'Access token with read access to the repo containing action',
      },
      required: true,
      default: true,
    },
  ],
  outputs: [
    {
      id: 'pal-repo-token',
      description: {
        short: 'Access token with read access to the repo containing action',
      },
    },
  ],
  runs: {
    using: 'node12',
    main: 'dist/index.js',
  },
  usage: {
    examples: [
      {
        title: 'Example usage w/ pal-action-directory',
        codeLanguage: 'yaml',
        codeBlock: `
- uses: invisionapp/private-action-loader@v3
  with:
    pal-repo-token: \${{ secrets.REPO_TOKEN }}
    pal-repo-name: some-org/super-secret-action
    pal-action-directory: src/super-secret-nested-action
`.trim(),
      },
    ],
  },
  limitations: ['Only supports javascript actions', 'There is very little error handling so far'],
};
