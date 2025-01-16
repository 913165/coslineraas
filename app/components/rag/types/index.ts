export interface LLMOption {
  id: string;
  name: string;
  models: string[];
  description: string;
}

export interface Implementation {
  title: string;
  description: string;
  component?: React.ReactNode;
  code?: string;
}

export interface Step {
  title: string;
  description: string;
  icon: any;
  content: {
    overview: string;
    implementation: Implementation[];
  };
}