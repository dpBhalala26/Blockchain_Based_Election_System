import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ElectionDetailsComponent } from '../shared/election-details/election-details.component';
import { ElectionsComponent } from './elections/elections.component';
import { HomeComponent } from './home/home.component';
import { ManageVotersComponent } from './manage-voters/manage-voters.component';
import { SetElectionComponent } from './set-election/set-election.component';
import { ViewElectionComponent } from './view-election/view-election.component';
import { VoterDetailsComponent } from './voter-details/voter-details.component';

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
    path: 'elections',
    pathMatch: 'full',
    component: ElectionsComponent,
  },
  {
    path: 'view-election/:election_id',
    pathMatch: 'full',
    component: ViewElectionComponent,
  },
  {
    path: 'set-election',
    pathMatch: 'full',
    component: SetElectionComponent,
  },
  {
    path: 'manage-voters',
    pathMatch: 'full',
    component: ManageVotersComponent,
  },
  {
    path: 'voter-details/:voter_id',
    pathMatch: 'full',
    component: VoterDetailsComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    loadChildren: () => import('../shared/shared.module').then((m) => m.SharedModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ElectionAdminRoutingModule { }