module.exports = {
  /**
   * REQUIRED: The name of your action. GitHub displays the name in the Actions tab to help visually identify actions in each job.
   * Used By: action.yml, README.md
   * */
  name: 'Name of the action',
  /**
   * REQUIRED: Description of what the action does
   * Used By: action.yml, README.md
   */
  description: {
    /**
     * REQUIRED: Used in action.yml, and optionally (if detailed is omitted) in README as well
     * Used By: action.yml and optionally README.md
     */
    short: 'Short description of action',
    /**
     * OPTIONAL: Detailed description of what this action does
     * Used By: README.md
     */
    detailed: undefined,
  },
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
};
