import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthHtppInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Si tiene token agregar a la cabecera
    if (sessionStorage.getItem('email') && sessionStorage.getItem('token')) {
      let token = String(sessionStorage.getItem('token'));
      req = req.clone({headers: req.headers.set('Authorization', token)});
    }
    return next.handle(req);
  }
}
