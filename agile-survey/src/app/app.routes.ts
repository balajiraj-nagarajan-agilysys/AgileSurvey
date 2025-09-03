import { Routes } from '@angular/router';
import { ParticipantsComponent } from './pages/participants/participants';
import { DashboardComponent } from './pages/dashboard/dashboard';

export const routes: Routes = [
  { path: '', redirectTo: '/participants', pathMatch: 'full' },
  { path: 'participants', component: ParticipantsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', redirectTo: '/participants' }
];
