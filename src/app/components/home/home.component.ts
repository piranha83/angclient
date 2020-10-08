import { Component } from '@angular/core';
import { User } from '@app/domains/User';
import { IdentityService } from '@app/services/identity.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  user: User;

  constructor(private identityService: IdentityService) {
    this.user = this.identityService.getUser;
  }
}