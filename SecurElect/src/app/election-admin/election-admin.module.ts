import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElectionAdminRoutingModule } from './election-admin-routing.module';
import { HomeComponent } from './home/home.component';
import { ElectionComponent } from './election/election.component';
import { ManageVotersComponent } from './manage-voters/manage-voters.component';
import { SharedModule } from '../shared/shared.module';
import { SetElectionComponent } from './set-election/set-election.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [HomeComponent, ElectionComponent, ManageVotersComponent, SetElectionComponent],
  imports: [
    CommonModule,
    ElectionAdminRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ElectionAdminModule { }
