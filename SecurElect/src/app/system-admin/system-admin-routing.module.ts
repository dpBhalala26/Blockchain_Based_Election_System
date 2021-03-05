import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './../home/home.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserRequestsComponent } from './user-requests/user-requests.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'home',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'user-requests',
    pathMatch: 'full',
    component: UserRequestsComponent,
  },
  {
    path: 'user-details/:userId',
    pathMatch: 'full',
    component: UserDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemAdminRoutingModule { }
