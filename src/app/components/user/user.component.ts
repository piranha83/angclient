import { Component, OnInit } from '@angular/core';
import { delay, first } from 'rxjs/operators';

import { IdentityService } from '@app/services';
import { Observable, of } from 'rxjs';
import { User } from '@app/domains/User';

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
  users = [];
  currentTutorial = null;
  currentIndex = -1;
  title = '';

  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];

  constructor(private identityService: IdentityService) { }

  ngOnInit() {
    this.retrieve();
  }

  getRequestParams(searchTitle, page, pageSize) {
    return {
      title: searchTitle,
      page: page - 1,
      size: pageSize
    };
  }

  retrieve() {

    const params = this.getRequestParams(this.title, this.page, this.pageSize);

    //this.identityService.getAll(params)
    serverCall([
      { login: '1' }, 
      { login: '2' }, 
      { login: '3' },
      { login: '4' },
      { login: '5' }], this.page, this.pageSize)
      .subscribe(
        response => {
          const { items, count } = response;
          this.users = items;
          this.count = count;
        },
        error => {
          console.log(error);
        });
  }

  handlePageChange(event) {
    this.page = event;
    this.retrieve();
  }

  handlePageSizeChange(event) {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieve();
  }
}
