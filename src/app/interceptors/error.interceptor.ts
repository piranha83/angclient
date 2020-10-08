import { Injectable } from '@angular/core';
import { HttpHandler, HttpEvent, HttpRequest, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IdentityService } from '@app/services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private identityService: IdentityService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                this.identityService.logout();
            }
            
            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}