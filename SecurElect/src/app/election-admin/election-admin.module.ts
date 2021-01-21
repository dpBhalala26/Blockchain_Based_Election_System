import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElectionAdminRoutingModule } from './election-admin-routing.module';
import { HomeComponent } from './home/home.component';
import { ElectionComponent } from './election/election.component';
import { ManageVotersComponent } from './manage-voters/manage-voters.component';


@NgModule({
  declarations: [HomeComponent, ElectionComponent, ManageVotersComponent],
  imports: [
    CommonModule,
    ElectionAdminRoutingModule
  ]
})
export class ElectionAdminModule { }
