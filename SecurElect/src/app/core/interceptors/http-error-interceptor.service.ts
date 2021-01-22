import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptorService implements HttpInterceptor {

  constructor(private regSnakeBar: MatSnackBar) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe( catchError(this.openSnakeBar));
  }

  private openSnakeBar = (res: HttpErrorResponse): Observable<any> => {
    const msg = `Error Message : ${res.message}`;
    if(msg){
      this.regSnakeBar.open(msg, "Close", { duration: 4000 });
    }
    return throwError(res);
  };
}
