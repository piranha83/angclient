import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';
import { IdentityService } from '@app/services/identity.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private identityService: IdentityService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const user = this.identityService.getUser;
        if (user && user.token && request.url.startsWith(environment.apiUrl)) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${user.token}`
                }
            });
        }

        return next.handle(request);
    }
}