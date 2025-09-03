import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard';
import { ParticipantService } from '../../services/participant.service';
import { of } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockParticipantService: jasmine.SpyObj<ParticipantService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ParticipantService', [
      'getParticipants',
      'getTotalParticipants',
      'getAverageSkillScore',
      'getSkillSummaries',
      'getUniqueSkillNames',
      'getSkillDistribution'
    ]);

    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        { provide: ParticipantService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    mockParticipantService = TestBed.inject(ParticipantService) as jasmine.SpyObj<ParticipantService>;
    
    // Setup default return values
    mockParticipantService.getParticipants.and.returnValue(of([]));
    mockParticipantService.getTotalParticipants.and.returnValue(0);
    mockParticipantService.getAverageSkillScore.and.returnValue(0);
    mockParticipantService.getSkillSummaries.and.returnValue([]);
    mockParticipantService.getUniqueSkillNames.and.returnValue([]);
    mockParticipantService.getSkillDistribution.and.returnValue({
      skill: 'Angular',
      low: 0,
      medium: 0,
      high: 0
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load dashboard data on init', () => {
    mockParticipantService.getTotalParticipants.and.returnValue(5);
    mockParticipantService.getAverageSkillScore.and.returnValue(7.5);

    component.ngOnInit();

    expect(component.totalParticipants).toBe(5);
    expect(mockParticipantService.getAverageSkillScore).toHaveBeenCalledWith('Python');
    expect(mockParticipantService.getAverageSkillScore).toHaveBeenCalledWith('Angular');
    expect(mockParticipantService.getAverageSkillScore).toHaveBeenCalledWith('JavaScript');
  });

  it('should calculate skill bar width correctly', () => {
    const width = component.getSkillBarWidth(7.5);
    expect(width).toBe('75%');
  });

  it('should update skill distribution when skill changes', () => {
    const mockDistribution = {
      skill: 'Angular',
      low: 2,
      medium: 3,
      high: 5
    };
    
    mockParticipantService.getSkillDistribution.and.returnValue(mockDistribution);
    component.selectedSkill = 'Angular';
    
    component.onSkillChange();
    
    expect(component.skillDistribution).toEqual(mockDistribution);
    expect(mockParticipantService.getSkillDistribution).toHaveBeenCalledWith('Angular');
  });
});
