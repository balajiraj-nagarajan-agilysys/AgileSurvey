import { TestBed } from '@angular/core/testing';
import { ParticipantService } from './participant.service';

describe('ParticipantService', () => {
  let service: ParticipantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParticipantService);
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return default skills', () => {
    const defaultSkills = service.getDefaultSkills();
    expect(defaultSkills.length).toBe(20);
    expect(defaultSkills[0].name).toBe('Angular');
    expect(defaultSkills[5].name).toBe('Python');
  });

  it('should add a participant', () => {
    const participant = {
      name: 'John Doe',
      email: 'john@example.com',
      whatsapp: '1234567890',
      linkedin: 'https://linkedin.com/in/johndoe',
      github: 'https://github.com/johndoe',
      created: new Date(),
      skills: [{ name: 'Angular', weightage: 8 }]
    };

    service.addParticipant(participant);
    expect(service.getTotalParticipants()).toBe(1);
  });

  it('should calculate average skill score', () => {
    const participant1 = {
      name: 'John Doe',
      email: 'john@example.com',
      whatsapp: '',
      linkedin: '',
      github: '',
      created: new Date(),
      skills: [{ name: 'Angular', weightage: 8 }]
    };

    const participant2 = {
      name: 'Jane Smith',
      email: 'jane@example.com',
      whatsapp: '',
      linkedin: '',
      github: '',
      created: new Date(),
      skills: [{ name: 'Angular', weightage: 6 }]
    };

    service.addParticipant(participant1);
    service.addParticipant(participant2);

    const avgScore = service.getAverageSkillScore('Angular');
    expect(avgScore).toBe(7); // (8 + 6) / 2
  });

  it('should delete a participant', () => {
    const participant = {
      name: 'John Doe',
      email: 'john@example.com',
      whatsapp: '',
      linkedin: '',
      github: '',
      created: new Date(),
      skills: []
    };

    service.addParticipant(participant);
    expect(service.getTotalParticipants()).toBe(1);

    // Get the participant to get its ID
    service.getParticipants().subscribe(participants => {
      const addedParticipant = participants[0];
      service.deleteParticipant(addedParticipant.id);
      expect(service.getTotalParticipants()).toBe(0);
    });
  });

  it('should detect duplicate email', () => {
    const participant1 = {
      name: 'John Doe',
      email: 'john@example.com',
      whatsapp: '1234567890',
      linkedin: '',
      github: '',
      created: new Date(),
      skills: []
    };

    service.addParticipant(participant1);
    
    const participant2 = {
      name: 'Jane Doe',
      email: 'john@example.com', // Same email
      whatsapp: '0987654321',
      linkedin: '',
      github: '',
      created: new Date(),
      skills: []
    };

    expect(() => service.addParticipant(participant2)).toThrow('A participant with this email already exists');
  });

  it('should detect duplicate mobile number', () => {
    const participant1 = {
      name: 'John Doe',
      email: 'john@example.com',
      whatsapp: '1234567890',
      linkedin: '',
      github: '',
      created: new Date(),
      skills: []
    };

    service.addParticipant(participant1);
    
    const participant2 = {
      name: 'Jane Doe',
      email: 'jane@example.com',
      whatsapp: '1234567890', // Same mobile
      linkedin: '',
      github: '',
      created: new Date(),
      skills: []
    };

    expect(() => service.addParticipant(participant2)).toThrow('A participant with this mobile number already exists');
  });

  it('should allow updating participant with same email/mobile', () => {
    const participant = {
      name: 'John Doe',
      email: 'john@example.com',
      whatsapp: '1234567890',
      linkedin: '',
      github: '',
      created: new Date(),
      skills: []
    };

    service.addParticipant(participant);
    
    service.getParticipants().subscribe(participants => {
      const addedParticipant = participants[0];
      // Should allow updating with same email/mobile
      expect(() => service.updateParticipant(addedParticipant.id, { 
        name: 'John Smith',
        email: 'john@example.com', // Same email
        whatsapp: '1234567890' // Same mobile
      })).not.toThrow();
    });
  });
});
