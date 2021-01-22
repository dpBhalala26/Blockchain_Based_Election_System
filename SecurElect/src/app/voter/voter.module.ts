import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VoterRoutingModule } from './voter-routing.module';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    VoterRoutingModule
  ]
})
export class VoterModule { }
