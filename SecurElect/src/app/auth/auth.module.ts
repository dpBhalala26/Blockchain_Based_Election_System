import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {HttpClientModule } from '@angular/common/http';
import { NgMaterialModule } from '../shared/ng-material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserprofileComponent } from './userprofile/userprofile.component';


@NgModule({
  declarations: [LoginComponent, RegisterComponent, UserprofileComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    HttpClientModule,
    NgMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
