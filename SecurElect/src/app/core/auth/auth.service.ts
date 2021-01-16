import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, of, Subject, throwError } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { LogService } from '../utils/log.service';
import { User } from '../user';
import { TokenStorageService } from './token-storage.service';


interface userNtoken {
  user: User;
  token: string;
}


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private user$ = new BehaviorSubject<User>(null);

  get user() {
    return this.user$.asObservable();
  }
  private setUser(user) {
    //this.user$.next(user);
    if (user) {
      const newUser = { ...user, id: user._id };
      this.user$.next(newUser);
      this.logService.log(`User is logged in : `, user);
    } else {
      this.user$.next(null);
    }

  }

  private baseApiUrl = '/api/auth/';
  private redierctUrlPostLogin = '';

  set redirectUrl(url: string) {
    this.redierctUrlPostLogin = url;
  }


  constructor(private httpClient: HttpClient, private tokenStorageService: TokenStorageService, private logService: LogService) { }

  get isUserLoggedIn() {
    return this.user$.value !== null;
  }
  get currentUser(){
    return this.user$.value;
  }

  auth_login(email: string, pwd: string) {
    const loginCred = { email, pwd };
    return this.httpClient.post<userNtoken>(`${this.baseApiUrl}login`, loginCred).pipe(
      switchMap(({ user, token }) => {
        this.setUserAfterFound(user, token);
        return of(this.redierctUrlPostLogin);
      }),
      catchError(err => {
        this.logService.log(err.error.message);
        return throwError(`Login Failed, Please try again.`);
      })
    );
  }

  auth_register(inputUser: any) {
    // Make an API call to save user in DB and update the user subject 
    return this.httpClient.post<userNtoken>(`${this.baseApiUrl}register`, inputUser).pipe(
      switchMap(({ user, token }) => { // Happy path
        this.setUserAfterFound(user, token);
        return of(this.redierctUrlPostLogin);
      }),
      catchError(err => {
        this.logService.log(err.error.message);
        return throwError(`Registration Failed, Please try again.`);
      })
    );

    // this.setUser(user);
    // this.logService.log(`Registered ${this.user$} successfully.`);
    // return of(user);
  }

  findJWT() {
    const token = this.tokenStorageService.getToken();
    if (!token) {
      return EMPTY;
    }
    return this.httpClient.get<userNtoken>(`${this.baseApiUrl}findJWT`).pipe(
      switchMap(({ user, token }) => { // Happy path
        this.setUserAfterFound(user, token);
        return of(user);
      }),
      catchError(err => {
        this.logService.log(err.error.message);
        return throwError(`Login Failed, Please Contact to admin department.`);
      })
    );
  }

  private setUserAfterFound(user: User, token: string) {
    this.setUser(user);
    this.tokenStorageService.setToken(token);
    this.logService.log('User found : ', user);
  }

  auth_logout() {
    // Remove User from subject.
    this.tokenStorageService.removeToken();
    this.setUser(null);
    this.logService.log('User has been logged out.');
  }

  auth_old_pwd_validate(email: string, oldpwd: string) {
    const oldPwdEmailCred = { email, oldpwd };
    return this.httpClient.post<userNtoken>(`${this.baseApiUrl}old_pwd_vaidate`, oldPwdEmailCred).pipe(
      switchMap(({ user, token }) => {
        this.logService.log(token);
        this.logService.log("in auth_old_pwd_vali of authService and user is :: ", user);
        return of(user);
      }),
      catchError(err => {
        this.logService.log(err.error.message);
        return throwError(`Old Password Verification Failed, Please try again.`);
      })
    );
  }

  auth_update( inputUser: any){
    return this.httpClient.put<userNtoken>(`${this.baseApiUrl}update/${inputUser.email}`, inputUser).pipe(
      switchMap(({ user, token }) => { // Happy path
        this.setUserAfterFound(user, token);
        return of(this.redierctUrlPostLogin);
      }),
      catchError(err => {
        this.logService.log(err.error.message);
        return throwError(`Registration Failed, Please try again.`);
      })
    );
  }

  auth_delete( email: String ){
    return this.httpClient.delete<userNtoken>(`${this.baseApiUrl}delete/${email}`).pipe(
      switchMap(({ user, token }) => { // Happy path
        return of(user);
      }),
      catchError(err => {
        this.logService.log(err.error.message);
        return throwError(`Registration Failed, Please try again.`);
      })
    );
  }

  auth_get_user( email: string ){
    const email_str = email;
    this.logService.log(`Sending request : ${this.baseApiUrl}getuser/${email}`);
    return this.httpClient.get<any>(`${this.baseApiUrl}getuser/${email}`);
  }

}
