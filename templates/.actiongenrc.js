module.exports = {
  /**
   * REQUIRED: The name of your action. GitHub displays the name in the Actions tab to help visually identify actions in each job.
   * Used By: action.yml, README.md
   * */
  name: 'Hello World',
  /**
   * REQUIRED: Description of what the action does
   * Used By: action.yml, README.md
   */
  description: {
    /**
     * REQUIRED: Used in action.yml, and optionally (if detailed is omitted) in README as well
     * Used By: action.yml and optionally README.md
     */
    short: 'short description',
    /**
     * OPTIONAL: Detailed description of what this action does
     * Used By: README.md
     */
    detailed:
      'This action loads and executes a private Action. This allows private actions to be reused in other private repositories. All inputs are passed down into the private action. All outputs of the private actions are passed back to the loader action.',
  },
  /**
   * OPTIONAL: An array of inputs that action accepts. Inputs allow you to specify data that the action expects to use during runtime. GitHub stores input parameters as environment variables. Input ids with uppercase letters are converted to lowercase during runtime. We recommended using lowercase input ids
   * Used By: action.yml, README.md
   */
  inputs: [
    {
      /**
       * REQUIRED: ID of the input.  Must be unique to the action
       */
      id: 'pal-repo-token',
      /**
       * REQUIRED: Description of the input
       */
      description: {
        /**
         * REQUIRED: Used in action.yml, and optionally (if detailed is omitted) in README as well
         * Used By: action.yml and optionally README.md
         */
        short: 'Access token with read access to the repo containing action',
        /**
         * OPTIONAL: Detailed description of what this input is for
         * Used By: README.md
         */
        detailed:
          'An access token with the [repo](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line) scope to the repository containing the action. **This should be stored as a [repo secret](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/creating-and-using-encrypted-secrets)**.',
      },
      /**
       * REQUIRED: Specify whether this input is required.
       */
      required: true,
      /**
       * OPTIONAL: Default value to assign to this input.
       */
      default: true,
    },
  ],
  /**
   * OPTIONAL: An array of outputs. Output parameters allow you to declare data that an action sets. Actions that run later in a workflow can use the output data set in previously run actions
   * Used By: action.yml, README.md
   */
  outputs: [
    {
      /**
       * REQUIRED: ID of the output.  Must be unique to the action
       */
      id: 'pal-repo-token',
      /**
       * REQUIRED: Description of the output
       */
      description: {
        /**
         * REQUIRED: Used in action.yml, and optionally (if detailed is omitted) in README as well
         * Used By: action.yml and optionally README.md
         */
        short: 'Access token with read access to the repo containing action',
        /**
         * OPTIONAL: Detailed description of what this input is for
         * Used By: README.md
         */
        detailed:
          'An access token with the [repo](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line) scope to the repository containing the action. **This should be stored as a [repo secret](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/creating-and-using-encrypted-secrets)**.',
      },
    },
  ],
  /**
   * REQUIRED: The command to run  when the action executes
   * Used By: action.yml
   */
  runs: {
    /**
     * REQUIRED: The application to use to execute code specified in main.
     */
    using: 'node12',
    /**
     * REQUIRED: The code file that contains action code.
     */
    main: 'dist/index.js',
  },
  /**
   * OPTIONAL: You can use a color and Feather icon to create a badge to personalize and distinguish your action in GitHub Marketplace
   * Used By: action.yml
   */
  branding: {
    /**
     *  REQUIRED: The background color of the badge. Can be one of: white, yellow, blue, green, orange, red, purple, or gray-dark.
     */
    color: 'green',
    /**
     * REQUIRED: Feather icon to use.  See https://feathericons.com/ for full list
     */
    icon: 'lock',
  },
  /**
   * OPTIONAL: Badges to include in header of README
   * Used By: README.md
   */
  badges: [
    {
      /**
       * REQUIRED: Text to display on badge
       */
      displayedText: 'License: MIT',
      /**
       * REQUIRED: URL to svg icon for badge
       */
      badgeUrl: 'https://img.shields.io/badge/license-MIT-brightgreen.svg',
      /**
       * REQUIRED: URL that will be navigated to if badge is clicked
       */
      link: 'https://opensource.org/licenses/MIT',
    },
  ],
  /**
   * OPTIONAL: Explain how to use action, with examples
   * Used By: README.md
   */
  usage: {
    /**
     * REQUIRED: Array of example usages
     */
    examples: [
      /**
       * REQUIRED: An example usage
       */
      {
        /**
         * REQUIRED: Title of example
         */
        title: 'Example usage w/ pal-action-directory',
        /**
         * REQUIRED: Language that example is written in.  Typically  yaml
         */
        codeLanguage: 'yaml',
        /**
         * Code to show example of
         */
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
  /**
   * OPTIONAL: Array of strings describing limitations of action.
   * Used By: README.md
   */
  limitations: ['Only supports javascript actions', 'There is very little error handling so far'],
};
