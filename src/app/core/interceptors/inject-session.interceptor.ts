import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

// export const injectSessionInterceptor: HttpInterceptorFn = (req, next) => {
//   return next(req);
// };

@Injectable()
export class InjectSessionInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    try {
      const token = this.cookieService.get('token')
      let newRequest = request
      newRequest = request.clone(
        {
          setHeaders: {
            authorization: `Bearer ${token}`,
            CUSTOM_HEADER: 'HOLA'
          }
        }
      )

      return next.handle(newRequest);

    } catch (e) {
      console.log('🔴🔴🔴 Ojito error', e)
      return next.handle(request);
    }
  }
}