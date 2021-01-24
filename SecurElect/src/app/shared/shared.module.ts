import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NgMaterialModule } from './ng-material-module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    NgMaterialModule
  ],
  exports:[
    NgMaterialModule
  ]

})
export class SharedModule { }
