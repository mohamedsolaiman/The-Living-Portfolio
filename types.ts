
export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  problem: string;
  role: string;
  stack: string[];
  challenges: string;
  liveUrl?: string;
  codeUrl?: string;
}

export interface Skill {
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}
