import { Component, OnInit, ViewChild } from '@angular/core';
import { delay, first } from 'rxjs/operators';

import { IdentityService } from '@app/services';
import { Observable, of } from 'rxjs';
import { User } from '@app/domains/User';
import { PaginatorComponent } from '../common/paginator/paginator.component'

interface IServerResponse {
  items: string[];
  count: number;
}

function serverCall(meals: any[], page: number, pageSize: number): Observable<IServerResponse> {
  const perPage = pageSize;
  const start = (page - 1) * perPage;
  const end = start + perPage;

  return of({
    items: meals.slice(start, end),
    count: meals.length
  }).pipe(delay(1000));
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @ViewChild(PaginatorComponent, { static: true }) paginator: PaginatorComponent;

  users = [];

  constructor(private identityService: IdentityService) { }

  ngOnInit() {
    this.retrieve();
  }

  retrieve() {

    const params = {
      title: '',
      page: this.paginator.page,
      size: this.paginator.pageSize
    };
    //this.identityService.getAll(params)
    serverCall([
      { login: '1' },
      { login: '2' },
      { login: '3' },
      { login: '4' },
      { login: '5' }], params.page, params.size)
      .subscribe(
        response => {
          const { items, count } = response;
          this.users = items;
          this.paginator.count = count;
        },
        error => {
          console.log(error);
        });
  }
}
