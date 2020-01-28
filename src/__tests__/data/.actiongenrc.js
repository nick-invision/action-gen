module.exports = {
  name: 'Private Action Loader',
  description: {
    short: 'Enables private Actions to be easily reused across repositories.',
    detailed:
      'This action loads and executes a private Action. This allows private actions to be reused in other private repositories. All inputs are passed down into the private action. All outputs of the private actions are passed back to the loader action.',
  },
  inputs: [
    {
      id: 'pal-repo-token',
      description: {
        short: 'Access token with read access to the repo containing action',
        detailed:
          'An access token with the [repo](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line) scope to the repository containing the action. **This should be stored as a [repo secret](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/creating-and-using-encrypted-secrets)**.',
      },
      required: true,
    },
    {
      id: 'pal-repo-name',
      description: {
        short: 'The organization/user and repo where action is stored, with support for @ref',
        detailed:
          'The repository containing the action. A ref can also be appended to specify an exact commit of the action (SHA, tag, or branch). Must be in the format of `{owner}/{repo}` or `{owner}/{repo}@{sha}`.',
      },
      required: true,
    },
    {
      id: 'pal-action-directory',
      description: {
        short:
          'The optional path to directory containing action.  Useful when multiple private actions are stored in the same repo',
        detailed:
          'Directory containing the `action.yml` that you would like to execute in repo. If omitted, the root directory is assumed to be the location of `action.yml`.',
      },
      required: false,
    },
  ],
  runs: {
    using: 'node12',
    main: 'dist/index.js',
  },
  branding: {
    color: 'green',
    icon: 'lock',
  },
  badges: [
    {
      displayedText: 'Actions Status',
      badgeUrl:
        'https://github.com/invisionapp/private-action-loader/workflows/ci/badge.svg?branch=develop',
      link: 'https://github.com/invisionapp/private-action-loader/actions',
    },
    {
      displayedText: 'License: MIT',
      badgeUrl: 'https://img.shields.io/badge/license-MIT-brightgreen.svg',
      link: 'https://opensource.org/licenses/MIT',
    },
    {
      displayedText: 'JavaScript Style Guide',
      badgeUrl: 'https://img.shields.io/badge/code_style-standard-brightgreen.svg',
      link: 'https://standardjs.com',
    },
    {
      displayedText: 'Dependency Status',
      badgeUrl: 'https://david-dm.org/InVisionApp/private-action-loader.svg',
      link: 'https://david-dm.org/InVisionApp/private-action-loader',
    },
    {
      displayedText: 'devDependency Status',
      badgeUrl: 'https://david-dm.org/InVisionApp/private-action-loader/dev-status.svg',
      link: 'https://david-dm.org/InVisionApp/private-action-loader#info=devDependencies',
    },
    {
      displayedText: 'Maintainability',
      badgeUrl: 'https://api.codeclimate.com/v1/badges/42214051e003ca757d60/maintainability',
      link: 'https://codeclimate.com/github/InVisionApp/private-action-loader/maintainability',
    },
    {
      displayedText: 'Test Coverage',
      badgeUrl: 'https://api.codeclimate.com/v1/badges/42214051e003ca757d60/test_coverage',
      link: 'https://codeclimate.com/github/InVisionApp/private-action-loader/test_coverage',
    },
  ],
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
      {
        title: 'Example usage w/ additional parameters',
        codeLanguage: 'yaml',
        codeBlock: `
- uses: invisionapp/private-action-loader@v3
  with:
    pal-repo-token: \${{ secrets.REPO_TOKEN }}
    pal-repo-name: some-org/super-secret-action
    # the following input gets passed to the private action
    input-used-by-other-action: this will be passed to super-secret-action
`.trim(),
      },
      {
        title: 'Example usage w/o additional parameters',
        codeLanguage: 'yaml',
        codeBlock: `
- uses: invisionapp/private-action-loader@v3
  with:
    pal-repo-token: \${{ secrets.REPO_TOKEN }}
    pal-repo-name: some-org/super-secret-action
`.trim(),
      },
      {
        title: 'Example usage w/ SHA',
        codeLanguage: 'yaml',
        codeBlock: `
- uses: invisionapp/private-action-loader@v3
  with:
    pal-repo-token: \${{ secrets.REPO_TOKEN }}
    pal-repo-name: some-org/super-secret-action@b8a83a0
`.trim(),
      },
      {
        title: 'Example usage w/ Branch',
        codeLanguage: 'yaml',
        codeBlock: `
- uses: invisionapp/private-action-loader@v3
  with:
    pal-repo-token: \${{ secrets.REPO_TOKEN }}
    pal-repo-name: some-org/super-secret-action@master
`.trim(),
      },
      {
        title: 'Example usage w/ Tag',
        codeLanguage: 'yaml',
        codeBlock: `
- uses: invisionapp/private-action-loader@v3
  with:
    pal-repo-token: \${{ secrets.REPO_TOKEN }}
    pal-repo-name: some-org/super-secret-action@v1
`.trim(),
      },
      {
        title: 'Example usage w/ Output',
        codeLanguage: 'yaml',
        codeBlock: `
- uses: invisionapp/private-action-loader@v3
  id: output_example
  with:
    pal-repo-token: \${{ secrets.REPO_TOKEN }}
    pal-repo-name: some-org/super-secret-action@v1
- name: Get the previous output
  run: echo "The previous output was \${{ steps.output_example.outputs.<name of output> }}"
`.trim(),
      },
    ],
  },
  limitations: ['Only supports javascript actions', 'There is very little error handling so far'],
};
