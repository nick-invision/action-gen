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
   * OPTIONAL: An array of inputs that action accepts. Inputs allow you to specify data that the action expects to use during runtime. GitHub stores input parameters as environment variables. Input ids with uppercase letters are converted to lowercase during runtime. We recommended using lowercase input ids
   * Used By: action.yml, README.md
   */
  inputs: [
    {
      /**
       * REQUIRED: ID of the input.  Must be unique to the action
       */
      id: 'input1',
      /**
       * REQUIRED: Description of the input
       */
      description: {
        /**
         * REQUIRED: Used in action.yml, and optionally (if detailed is omitted) in README as well
         * Used By: action.yml and optionally README.md
         */
        short: 'Short description of input1',
        /**
         * OPTIONAL: Detailed description of what this input is for
         * Used By: README.md
         */
        detailed: undefined,
      },
      /**
       * REQUIRED: Specify whether this input is required.
       */
      required: true,
      /**
       * OPTIONAL: Default value to assign to this input.
       */
      default: 'input1 default',
    },
    {
      /**
       * REQUIRED: ID of the input.  Must be unique to the action
       */
      id: 'input2',
      /**
       * REQUIRED: Description of the input
       */
      description: {
        /**
         * REQUIRED: Used in action.yml, and optionally (if detailed is omitted) in README as well
         * Used By: action.yml and optionally README.md
         */
        short: 'Short description of input2',
        /**
         * OPTIONAL: Detailed description of what this input is for
         * Used By: README.md
         */
        detailed: undefined,
      },
      /**
       * REQUIRED: Specify whether this input is required.
       */
      required: true,
    },
    {
      /**
       * REQUIRED: ID of the input.  Must be unique to the action
       */
      id: 'input3',
      /**
       * REQUIRED: Description of the input
       */
      description: {
        /**
         * REQUIRED: Used in action.yml, and optionally (if detailed is omitted) in README as well
         * Used By: action.yml and optionally README.md
         */
        short: 'Short description of input3',
        /**
         * OPTIONAL: Detailed description of what this input is for
         * Used By: README.md
         */
        detailed: undefined,
      },
      /**
       * REQUIRED: Specify whether this input is required.
       */
      required: false,
      /**
       * OPTIONAL: Default value to assign to this input.
       */
      default: 'input3 default',
    },
    {
      /**
       * REQUIRED: ID of the input.  Must be unique to the action
       */
      id: 'input4',
      /**
       * REQUIRED: Description of the input
       */
      description: {
        /**
         * REQUIRED: Used in action.yml, and optionally (if detailed is omitted) in README as well
         * Used By: action.yml and optionally README.md
         */
        short: 'Short description of input4',
        /**
         * OPTIONAL: Detailed description of what this input is for
         * Used By: README.md
         */
        detailed: undefined,
      },
      /**
       * REQUIRED: Specify whether this input is required.
       */
      required: false,
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
      id: 'output1',
      /**
       * REQUIRED: Description of the output
       */
      description: {
        /**
         * REQUIRED: Used in action.yml, and optionally (if detailed is omitted) in README as well
         * Used By: action.yml and optionally README.md
         */
        short: 'Short description of output',
        /**
         * OPTIONAL: Detailed description of what this input is for
         * Used By: README.md
         */
        detailed: undefined,
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
     * */
    color: 'green',
    /**
     * REQUIRED: Feather icon to use.  See https://feathericons.com/ for full list
     */
    icon: 'lock',
  },
};
