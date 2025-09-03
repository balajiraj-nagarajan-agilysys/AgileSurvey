import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ParticipantService } from '../../services/participant.service';
import { SkillSummary, SkillDistribution } from '../../models/participant.model';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent implements OnInit {
  totalParticipants = 0;
  avgPythonSkill = 0;
  avgAngularSkill = 0;
  avgJavaScriptSkill = 0;
  
  skillSummaries: SkillSummary[] = [];
  selectedSkill = '';
  skillDistribution: SkillDistribution | null = null;
  uniqueSkills: string[] = [];

  constructor(private participantService: ParticipantService) {}

  ngOnInit(): void {
    this.loadDashboardData();
    this.participantService.getParticipants().subscribe(() => {
      this.loadDashboardData();
    });
  }

  private loadDashboardData(): void {
    this.totalParticipants = this.participantService.getTotalParticipants();
    this.avgPythonSkill = this.participantService.getAverageSkillScore('Python');
    this.avgAngularSkill = this.participantService.getAverageSkillScore('Angular');
    this.avgJavaScriptSkill = this.participantService.getAverageSkillScore('JavaScript');
    
    this.skillSummaries = this.participantService.getSkillSummaries();
    this.uniqueSkills = this.participantService.getUniqueSkillNames();
    
    if (this.selectedSkill) {
      this.updateSkillDistribution();
    }
  }

  onSkillChange(): void {
    this.updateSkillDistribution();
  }

  private updateSkillDistribution(): void {
    if (this.selectedSkill) {
      this.skillDistribution = this.participantService.getSkillDistribution(this.selectedSkill);
    }
  }

  getSkillBarWidth(average: number): string {
    return (average * 10) + '%';
  }
}
