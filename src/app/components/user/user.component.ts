import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { IdentityService } from '@app/services';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})export class UserComponent implements OnInit {
    users = null;

    constructor(private identityService: IdentityService) {}

    ngOnInit() {
        this.identityService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
    }    
}
