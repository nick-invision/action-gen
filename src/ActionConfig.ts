interface Description {
  /**
   * Description of what the action does
   * Used By: action.yml, README.md
   */
  short: string;
  /**
   * Detailed description of what this action does
   * Used By: README.md
   */
  detailed?: string;
}
interface Input {
  /**
   * ID of the input.  Must be unique to the action
   */
  id: string;
  /**
   * ID of the input.  Must be unique to the action
   */
  description: Description;
  /**
   * Specify whether this input is required.
   */
  required?: boolean;
  /**
   * Default value to assign to this input.
   */
  default?: string;
}
interface Output {
  /**
   * ID of the output.  Must be unique to the action
   */
  id: string;
  /**
   * Description of the output
   */
  description: Description;
}
interface Example {
  /**
   * Title of example
   */
  title: string;
  description?: string;
  /**
   * Code to show example of
   */
  codeBlock: string;
  /**
   * Language that example is written in.  Typically  yaml
   */
  codeLanguage: string;
}
interface Badge {
  /**
   * Text to display on badge
   */
  displayedText: string;
  /**
   * URL to svg icon for badge
   */
  badgeUrl: string;
  /**
   * Text to display on badge
   */
  link: string;
}

export interface ActionConfig {
  /**
   * The name of your action. GitHub displays the name in the Actions tab to help visually identify actions in each job.
   * Used By: action.yml, README.md
   * */
  name: string;
  /**
   * Description of what the action does
   * Used By: action.yml, README.md
   */
  description: Description;
  /**
   * The command to run  when the action executes
   * Used By: action.yml
   */
  runs: {
    /**
     * The application to use to execute code specified in main.
     */
    using: string;
    /**
     * The code file that contains action code.
     */
    main: string;
  };
  /**
   * An array of inputs that action accepts. Inputs allow you to specify data that the action expects to use during runtime. GitHub stores input parameters as environment variables. Input ids with uppercase letters are converted to lowercase during runtime. We recommended using lowercase input ids
   * Used By: action.yml, README.md
   */
  inputs?: Input[];
  /**
   * An array of outputs. Output parameters allow you to declare data that an action sets. Actions that run later in a workflow can use the output data set in previously run actions
   * Used By: action.yml, README.md
   */
  outputs?: Output[];
  author?: string;
  /**
   * You can use a color and Feather icon to create a badge to personalize and distinguish your action in GitHub Marketplace
   * Used By: action.yml
   */
  branding?: {
    /**
     * Feather icon to use.  See https://feathericons.com/ for full list
     */
    icon: string;
    /**
     *  The background color of the badge. Can be one of: white, yellow, blue, green, orange, red, purple, or gray-dark.
     */
    color: string;
  };
  /**
   * Explain how to use action, with examples
   * Used By: README.md
   */
  usage?: {
    description?: string;
    /**
     * Array of example usages
     */
    examples: Example[];
  };
  licenses?: string[];
  /**
   * Badges to include in header of README
   * Used By: README.md
   */
  badges?: Badge[];
  whatsNew?: string[];
  contributing?: string;
  limitations?: string[];
}
