import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CastVoteComponent } from './cast-vote/cast-vote.component';
import { ElectionsJoinedComponent } from './elections-joined/elections-joined.component';
import { HomeComponent } from './home/home.component';
import { ViewElectionJoinedComponent } from './view-election-joined/view-election-joined.component';

const routes: Routes = [
  {
    path: 'home',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'elections-joined',
    pathMatch: 'full',
    component: ElectionsJoinedComponent,
  },
  {
    path: 'view-election-joined/:election_id',
    pathMatch: 'full',
    component: ViewElectionJoinedComponent,
  },
  {
    path: 'home',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'cast-vote/:election_id',
    pathMatch: 'full',
    component: CastVoteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VoterRoutingModule { }
