import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ElectionComponent } from './election/election.component';
import { HomeComponent } from './home/home.component';
import { ManageVotersComponent } from './manage-voters/manage-voters.component';

const routes: Routes = [
  {
    path: 'home',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'election',
    pathMatch: 'full',
    component: ElectionComponent,
  },
  {
    path: 'manage-voters',
    pathMatch: 'full',
    component: ManageVotersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ElectionAdminRoutingModule { }
