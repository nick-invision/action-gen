interface Description {
  short: string;
  detailed?: string;
}
interface Input {
  id: string;
  description: Description;
  required?: boolean;
  default?: string;
  camelCaseId?: string;
}
interface Output {
  id: string;
  description: Description;
  camelCaseId?: string;
}
interface Example {
  title: string;
  description?: string;
  codeBlock: string;
  codeLanguage: string;
}
interface Badge {
  displayedText: string;
  badgeUrl: string;
  link: string;
}

export interface ActionConfig {
  name: string;
  description: Description;
  runs: {
    using: string;
    main: string;
  };
  inputs?: Input[];
  outputs?: Output[];
  author?: string;
  branding?: {
    icon: string;
    color: string;
  };
  usage?: {
    description?: string;
    examples: Example[];
  };
  licenses?: string[];
  badges?: Badge[];
  whatsNew?: string[];
  contributing?: string;
  limitations?: string[];
}
