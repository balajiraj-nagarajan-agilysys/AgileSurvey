import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ParticipantsComponent } from './participants';
import { ParticipantService } from '../../services/participant.service';
import { of } from 'rxjs';

describe('ParticipantsComponent', () => {
  let component: ParticipantsComponent;
  let fixture: ComponentFixture<ParticipantsComponent>;
  let mockParticipantService: jasmine.SpyObj<ParticipantService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ParticipantService', [
      'getParticipants',
      'addParticipant',
      'updateParticipant',
      'deleteParticipant'
    ]);

    await TestBed.configureTestingModule({
      imports: [ParticipantsComponent],
      providers: [
        { provide: ParticipantService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ParticipantsComponent);
    component = fixture.componentInstance;
    mockParticipantService = TestBed.inject(ParticipantService) as jasmine.SpyObj<ParticipantService>;
    
    // Setup default return values
    mockParticipantService.getParticipants.and.returnValue(of([]));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load participants on init', () => {
    const mockParticipants = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        whatsapp: '',
        linkedin: '',
        github: '',
        created: new Date(),
        skills: []
      }
    ];

    mockParticipantService.getParticipants.and.returnValue(of(mockParticipants));
    
    component.ngOnInit();
    
    expect(component.participants).toEqual(mockParticipants);
    expect(component.filteredParticipants).toEqual(mockParticipants);
  });

  it('should filter participants by search term', () => {
    component.participants = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        whatsapp: '',
        linkedin: '',
        github: '',
        created: new Date(),
        skills: []
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        whatsapp: '',
        linkedin: '',
        github: '',
        created: new Date(),
        skills: []
      }
    ];

    component.searchTerm = 'john';
    component.onSearch();

    expect(component.filteredParticipants.length).toBe(1);
    expect(component.filteredParticipants[0].name).toBe('John Doe');
  });

  it('should show form when adding participant', () => {
    component.addParticipant();
    
    expect(component.showForm).toBe(true);
    expect(component.editingParticipant).toBe(null);
  });

  it('should show form when editing participant', () => {
    const participant = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      whatsapp: '',
      linkedin: '',
      github: '',
      created: new Date(),
      skills: []
    };

    component.editParticipant(participant);
    
    expect(component.showForm).toBe(true);
    expect(component.editingParticipant).toBe(participant);
  });
});
