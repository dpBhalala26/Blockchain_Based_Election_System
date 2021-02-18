import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VoterRoutingModule } from './voter-routing.module';
import { HomeComponent } from './home/home.component';
import { ElectionsJoinedComponent } from './elections-joined/elections-joined.component';
import { ViewElectionJoinedComponent } from './view-election-joined/view-election-joined.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [HomeComponent, ElectionsJoinedComponent, ViewElectionJoinedComponent],
  imports: [
    CommonModule,
    VoterRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class VoterModule { }
