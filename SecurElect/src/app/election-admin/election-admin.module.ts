import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElectionAdminRoutingModule } from './election-admin-routing.module';
import { HomeComponent } from './home/home.component';
import { ElectionComponent } from './election/election.component';
import { ManageVotersComponent } from './manage-voters/manage-voters.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [HomeComponent, ElectionComponent, ManageVotersComponent],
  imports: [
    CommonModule,
    ElectionAdminRoutingModule,
    SharedModule
  ]
})
export class ElectionAdminModule { }
