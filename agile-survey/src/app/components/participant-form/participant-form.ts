import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ParticipantService } from '../../services/participant.service';
import { Participant, Skill } from '../../models/participant.model';

@Component({
  selector: 'app-participant-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './participant-form.html',
  styleUrl: './participant-form.scss'
})
export class ParticipantFormComponent implements OnInit, OnChanges {
  @Input() participant: Participant | null = null;
  @Input() show: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();

  errorMessage = '';
  isSubmitting = false;

  formData = {
    name: '',
    email: '',
    whatsapp: '',
    linkedin: '',
    github: '',
    created: new Date(),
    skills: [] as Skill[]
  };

  get createdDateString(): string {
    return this.formData.created.toISOString().split('T')[0];
  }

  set createdDateString(value: string) {
    this.formData.created = new Date(value);
  }

  get skillOptions(): string[] {
    return this.participantService.getSkillOptions();
  }

  constructor(private participantService: ParticipantService) {}

  ngOnInit(): void {
    if (this.participant) {
      this.formData = {
        name: this.participant.name,
        email: this.participant.email,
        whatsapp: this.participant.whatsapp,
        linkedin: this.participant.linkedin,
        github: this.participant.github,
        created: this.participant.created,
        skills: [...this.participant.skills]
      };
    } else {
      this.formData.skills = [
        { name: '', weightage: 0 },
        { name: '', weightage: 0 },
        { name: '', weightage: 0 },
        { name: '', weightage: 0 },
        { name: '', weightage: 0 }
      ];
    }
  }

  ngOnChanges(): void {
    // Clear error message when modal opens
    if (this.show) {
      this.errorMessage = '';
    }
    
    if (this.participant) {
      this.formData = {
        name: this.participant.name,
        email: this.participant.email,
        whatsapp: this.participant.whatsapp,
        linkedin: this.participant.linkedin,
        github: this.participant.github,
        created: this.participant.created,
        skills: [...this.participant.skills]
      };
    } else if (this.show) {
      this.formData = {
        name: '',
        email: '',
        whatsapp: '',
        linkedin: '',
        github: '',
        created: new Date(),
        skills: [
          { name: '', weightage: 0 },
          { name: '', weightage: 0 },
          { name: '', weightage: 0 },
          { name: '', weightage: 0 },
          { name: '', weightage: 0 }
        ]
      };
    }
  }

  addSkill(): void {
    this.formData.skills.push({ name: '', weightage: 0 });
  }

  removeSkill(index: number): void {
    this.formData.skills.splice(index, 1);
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.isSubmitting = true;

    try {
      if (this.participant) {
        this.participantService.updateParticipant(this.participant.id, this.formData);
      } else {
        this.participantService.addParticipant(this.formData);
      }
      this.save.emit();
    } catch (error: any) {
      this.errorMessage = error.message || 'An error occurred while saving the participant';
    } finally {
      this.isSubmitting = false;
    }
  }

  onCancel(): void {
    this.close.emit();
  }
}
