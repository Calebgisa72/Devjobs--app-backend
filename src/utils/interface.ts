export interface jobProps {
    logo: string;
    posted: Date;
    jobType: string;
    title: string;
    company: string;
    country: string;
    description?: string;
    webLink: string;
    requirements: {
      description: string;
      items: string[];
    };
    whatToDo: {
      description: string;
      items: string[];
    };
  }
  