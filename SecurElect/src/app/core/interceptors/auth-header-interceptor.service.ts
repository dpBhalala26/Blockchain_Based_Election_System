import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../auth/token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthHeaderInterceptorService implements HttpInterceptor {
  constructor(private tokenStorageService: TokenStorageService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.tokenStorageService.getToken();
    const reqClone = req.clone({
      headers: req.headers.set('Authorization', token ? `bearer ${token}` : ''),
    });
    console.log('requestClone ', reqClone);
    return next.handle(reqClone);
  }
}
