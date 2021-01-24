import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElectionAdminRoutingModule } from './election-admin-routing.module';
import { HomeComponent } from './home/home.component';
import { ElectionsComponent } from './elections/elections.component';
import { ManageVotersComponent } from './manage-voters/manage-voters.component';
import { SharedModule } from '../shared/shared.module';
import { VoterDetailsComponent } from './voter-details/voter-details.component';
import { ElectionDetailsComponent } from './election-details/election-details.component';


@NgModule({
  declarations: [HomeComponent, ElectionsComponent, ManageVotersComponent, VoterDetailsComponent, ElectionDetailsComponent],
  imports: [
    CommonModule,
    ElectionAdminRoutingModule,
    SharedModule
  ]
})
export class ElectionAdminModule { }
