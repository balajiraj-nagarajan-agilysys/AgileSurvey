import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ParticipantService } from '../../services/participant.service';
import { Participant } from '../../models/participant.model';
import { ParticipantFormComponent } from '../../components/participant-form/participant-form';

@Component({
  selector: 'app-participants',
  imports: [CommonModule, FormsModule, ParticipantFormComponent],
  templateUrl: './participants.html',
  styleUrl: './participants.scss'
})
export class ParticipantsComponent implements OnInit {
  participants: Participant[] = [];
  filteredParticipants: Participant[] = [];
  searchTerm: string = '';
  showForm: boolean = false;
  editingParticipant: Participant | null = null;

  constructor(private participantService: ParticipantService) {}

  ngOnInit(): void {
    this.participantService.getParticipants().subscribe(participants => {
      this.participants = participants;
      this.filteredParticipants = participants;
    });
  }

  onSearch(): void {
    if (!this.searchTerm.trim()) {
      this.filteredParticipants = this.participants;
    } else {
      this.filteredParticipants = this.participants.filter(p =>
        p.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        p.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        p.whatsapp.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  addParticipant(): void {
    this.editingParticipant = null;
    this.showForm = true;
  }

  editParticipant(participant: Participant): void {
    this.editingParticipant = participant;
    this.showForm = true;
  }

  deleteParticipant(id: string): void {
    if (confirm('Are you sure you want to delete this participant?')) {
      this.participantService.deleteParticipant(id);
    }
  }

  onFormClose(): void {
    this.showForm = false;
    this.editingParticipant = null;
  }

  onFormSave(): void {
    this.showForm = false;
    this.editingParticipant = null;
  }
}
