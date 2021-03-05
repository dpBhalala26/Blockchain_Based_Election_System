import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptorService implements HttpInterceptor {

  constructor(private regSnakeBar: MatSnackBar,private router:Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe( catchError(this.openSnakeBar));
  }

  private openSnakeBar = (res: HttpErrorResponse): Observable<any> => {
    const msg = `Couldnt connect to server\nContact system administration at admin.s@securelect.com \n\nError Message : ${res.message}`;
    if(msg){
      this.regSnakeBar.open(msg, "Close", { duration: 10000 });
      this.router.navigate(["/page-not-found"])
    }
    return throwError(res);
  };
}
