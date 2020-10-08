import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { IdentityService } from '@app/Services';

@Injectable({ providedIn: 'root' })
export class ActiveIdentityService implements CanActivate {
    constructor(
        private router: Router,
        private identityService: IdentityService
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.identityService.getUser == null) {
            this.router.navigate(['/identity/logout'], { queryParams: { returnUrl: state.url } });
            return false;
        }
        return true;
    }
}