import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { NgMaterialModule } from './ng-material-module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ElectionDetailsComponent } from './election-details/election-details.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { VotingBallotComponent } from './voting-ballot/voting-ballot.component';


@NgModule({
  declarations: [PageNotFoundComponent,ElectionDetailsComponent, VotingBallotComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    NgMaterialModule,
    FlexLayoutModule
  ],
  exports:[
    NgMaterialModule,
    ElectionDetailsComponent,
    VotingBallotComponent
  ]

})
export class SharedModule { }