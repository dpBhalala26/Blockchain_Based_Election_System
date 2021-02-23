import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElectionAdminRoutingModule } from './election-admin-routing.module';
import { HomeComponent } from './home/home.component';
import { ElectionsComponent } from './elections/elections.component';
import { ManageVotersComponent } from './manage-voters/manage-voters.component';
import { SharedModule } from '../shared/shared.module';
import { VoterDetailsComponent } from './voter-details/voter-details.component';
import { SetElectionComponent } from './set-election/set-election.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewElectionComponent } from './view-election/view-election.component';
import { VotingDashboardComponent } from './voting-dashboard/voting-dashboard.component';

@NgModule({
  declarations: [HomeComponent, ElectionsComponent, ManageVotersComponent, VoterDetailsComponent,SetElectionComponent, ViewElectionComponent, VotingDashboardComponent],
  
  imports: [
    CommonModule,
    ElectionAdminRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ElectionAdminModule { }
