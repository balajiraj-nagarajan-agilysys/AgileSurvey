export interface Skill {
  name: string;
  weightage: number;
}

export interface Participant {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  linkedin: string;
  github: string;
  created: Date;
  skills: Skill[];
}

export interface SkillSummary {
  name: string;
  average: number;
  totalParticipants: number;
}

export interface SkillDistribution {
  skill: string;
  low: number;    // 1-3
  medium: number; // 4-6
  high: number;   // 7-10
}
