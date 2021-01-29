import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NgMaterialModule } from './ng-material-module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ElectionDetailsComponent } from './election-details/election-details.component';


@NgModule({
  declarations: [PageNotFoundComponent,ElectionDetailsComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    NgMaterialModule
  ],
  exports:[
    NgMaterialModule,
    ElectionDetailsComponent
  ]

})
export class SharedModule { }
