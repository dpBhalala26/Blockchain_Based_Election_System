import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class VerificationGuard implements CanActivate {
  path: ActivatedRouteSnapshot;
  route: ActivatedRouteSnapshot;
  
  constructor(private authService: AuthService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let user:User;
      this.authService.redirectUrl = state.url;
      return this.authService.isUserVerified;
  }
}
