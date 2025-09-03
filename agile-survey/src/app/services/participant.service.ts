import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { Participant, Skill, SkillSummary, SkillDistribution } from '../models/participant.model';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {
  private readonly STORAGE_KEY = 'agile-survey-participants';
  private participantsSubject = new BehaviorSubject<Participant[]>([]);
  public participants$ = this.participantsSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.loadParticipants();
    // Add default participants if none exist
    if (this.participantsSubject.value.length === 0) {
      this.addDefaultParticipants();
    }
  }

  private addDefaultParticipants(): void {
    const defaultParticipants = [
      {
        name: 'John Smith',
        email: 'john.smith@example.com',
        whatsapp: '+1234567890',
        linkedin: 'https://linkedin.com/in/johnsmith',
        github: 'https://github.com/johnsmith',
        created: new Date('2025-01-15'),
        skills: [
          { name: 'Angular', weightage: 8 },
          { name: 'Node.js', weightage: 7 },
          { name: 'Python', weightage: 6 },
          { name: 'JavaScript', weightage: 8 }
        ]
      },
      {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@example.com',
        whatsapp: '+1987654321',
        linkedin: 'https://linkedin.com/in/sarahjohnson',
        github: 'https://github.com/sarahjohnson',
        created: new Date('2025-02-10'),
        skills: [
          { name: 'React', weightage: 9 },
          { name: 'JavaScript', weightage: 8 },
          { name: 'Python', weightage: 8 },
          { name: 'Machine Learning', weightage: 7 }
        ]
      },
      {
        name: 'Michael Davis',
        email: 'michael.davis@example.com',
        whatsapp: '+1555123456',
        linkedin: 'https://linkedin.com/in/michaeldavis',
        github: 'https://github.com/michaeldavis',
        created: new Date('2025-03-05'),
        skills: [
          { name: 'Java', weightage: 9 },
          { name: '.NET Core', weightage: 7 },
          { name: 'SQL', weightage: 8 },
          { name: 'DevOps', weightage: 6 },
          { name: 'Cloud (Azure/AWS)', weightage: 7 }
        ]
      }
    ];

    defaultParticipants.forEach(participant => {
      this.addParticipant(participant);
    });
  }

  private loadParticipants(): void {
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const participants = JSON.parse(stored).map((p: any) => ({
          ...p,
          created: new Date(p.created)
        }));
        this.participantsSubject.next(participants);
      }
    }
  }

  private saveParticipants(participants: Participant[]): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(participants));
    }
    this.participantsSubject.next(participants);
  }

  getParticipants(): Observable<Participant[]> {
    return this.participants$;
  }

  addParticipant(participant: Omit<Participant, 'id'>): boolean {
    // Check for duplicates
    if (this.isDuplicateEmail(participant.email)) {
      throw new Error('A participant with this email already exists');
    }
    if (this.isDuplicateMobile(participant.whatsapp)) {
      throw new Error('A participant with this mobile number already exists');
    }

    const participants = this.participantsSubject.value;
    const newParticipant: Participant = {
      ...participant,
      id: this.generateId()
    };
    this.saveParticipants([...participants, newParticipant]);
    return true;
  }

  isDuplicateEmail(email: string, excludeId?: string): boolean {
    const participants = this.participantsSubject.value;
    return participants.some(p => 
      p.email.toLowerCase() === email.toLowerCase() && 
      p.id !== excludeId
    );
  }

  isDuplicateMobile(mobile: string, excludeId?: string): boolean {
    const participants = this.participantsSubject.value;
    return participants.some(p => 
      p.whatsapp === mobile && 
      p.id !== excludeId
    );
  }

  updateParticipant(id: string, updates: Partial<Participant>): boolean {
    // Check for duplicates if email or mobile is being updated
    if (updates.email && this.isDuplicateEmail(updates.email, id)) {
      throw new Error('A participant with this email already exists');
    }
    if (updates.whatsapp && this.isDuplicateMobile(updates.whatsapp, id)) {
      throw new Error('A participant with this mobile number already exists');
    }

    const participants = this.participantsSubject.value;
    const index = participants.findIndex(p => p.id === id);
    if (index !== -1) {
      participants[index] = { ...participants[index], ...updates };
      this.saveParticipants([...participants]);
      return true;
    }
    return false;
  }

  deleteParticipant(id: string): void {
    const participants = this.participantsSubject.value;
    const filtered = participants.filter(p => p.id !== id);
    this.saveParticipants(filtered);
  }

  getParticipantById(id: string): Participant | undefined {
    return this.participantsSubject.value.find(p => p.id === id);
  }

  getDefaultSkills(): Skill[] {
    return [
      { name: 'Angular', weightage: 0 },
      { name: 'React', weightage: 0 },
      { name: 'Node.js', weightage: 0 },
      { name: '.NET Core', weightage: 0 },
      { name: 'Java', weightage: 0 },
      { name: 'Python', weightage: 0 },
      { name: 'SQL', weightage: 0 },
      { name: 'DevOps', weightage: 0 },
      { name: 'Cloud (Azure/AWS)', weightage: 0 },
      { name: 'Machine Learning', weightage: 0 },
      { name: 'JavaScript', weightage: 0 },
      { name: 'Vue.js', weightage: 0 },
      { name: 'MongoDB', weightage: 0 },
      { name: 'Express.js', weightage: 0 },
      { name: 'TypeScript', weightage: 0 },
      { name: 'Spring Boot', weightage: 0 },
      { name: 'AWS', weightage: 0 },
      { name: 'Git', weightage: 0 },
      { name: 'Agile', weightage: 0 },
      { name: 'Scrum', weightage: 0 }
    ];
  }

  getTotalParticipants(): number {
    return this.participantsSubject.value.length;
  }

  getAverageSkillScore(skillName: string): number {
    const participants = this.participantsSubject.value;
    const skillScores = participants
      .map(p => p.skills.find(s => s.name === skillName)?.weightage || 0)
      .filter(score => score > 0);
    
    if (skillScores.length === 0) return 0;
    return skillScores.reduce((sum, score) => sum + score, 0) / skillScores.length;
  }

  getSkillSummaries(): SkillSummary[] {
    const participants = this.participantsSubject.value;
    const skillMap = new Map<string, number[]>();

    participants.forEach(participant => {
      participant.skills.forEach(skill => {
        if (skill.weightage > 0) {
          if (!skillMap.has(skill.name)) {
            skillMap.set(skill.name, []);
          }
          skillMap.get(skill.name)!.push(skill.weightage);
        }
      });
    });

    return Array.from(skillMap.entries()).map(([name, scores]) => ({
      name,
      average: scores.reduce((sum, score) => sum + score, 0) / scores.length,
      totalParticipants: scores.length
    }));
  }

  getSkillDistribution(skillName: string): SkillDistribution {
    const participants = this.participantsSubject.value;
    const scores = participants
      .map(p => p.skills.find(s => s.name === skillName)?.weightage || 0)
      .filter(score => score > 0);

    const low = scores.filter(score => score >= 1 && score <= 3).length;
    const medium = scores.filter(score => score >= 4 && score <= 6).length;
    const high = scores.filter(score => score >= 7 && score <= 10).length;

    return {
      skill: skillName,
      low,
      medium,
      high
    };
  }

  getUniqueSkillNames(): string[] {
    const participants = this.participantsSubject.value;
    const skillNames = new Set<string>();
    
    participants.forEach(participant => {
      participant.skills.forEach(skill => {
        if (skill.weightage > 0) {
          skillNames.add(skill.name);
        }
      });
    });

    return Array.from(skillNames).sort();
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}
