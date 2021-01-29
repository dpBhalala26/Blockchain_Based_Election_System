import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './core/auth/auth-guard.service';
import { HomeComponent } from './home/home.component';

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
    path: 'auth',
    pathMatch: 'prefix',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'election-admin',
    pathMatch: 'prefix',
    loadChildren: () => import('./election-admin/election-admin.module').then((m) => m.ElectionAdminModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'system-admin',
    pathMatch: 'prefix',
    loadChildren: () => import('./system-admin/system-admin.module').then((m) => m.SystemAdminModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'voter',
    pathMatch: 'prefix',
    loadChildren: () => import('./voter/voter.module').then((m) => m.VoterModule),
    canActivate: [AuthGuardService]
  },
  {
    path: '**',
    loadChildren: () => import('./shared/shared.module').then((m) => m.SharedModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}