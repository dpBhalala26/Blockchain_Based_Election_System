import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './core/auth/auth-guard.service';
import { VerificationGuard } from './core/auth/verification.guard';
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
    canActivate: [AuthGuardService]
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
    canActivate: [AuthGuardService,VerificationGuard]
  },
  {
    path: 'system-admin',
    pathMatch: 'prefix',
    loadChildren: () => import('./system-admin/system-admin.module').then((m) => m.SystemAdminModule),
    canActivate: [AuthGuardService,VerificationGuard]
  },
  {
    path: 'voter',
    pathMatch: 'prefix',
    loadChildren: () => import('./voter/voter.module').then((m) => m.VoterModule),
    canActivate: [AuthGuardService,VerificationGuard]
  },
  {
    path: 'page-not-found',
    loadChildren: () => import('./shared/shared.module').then((m) => m.SharedModule),
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