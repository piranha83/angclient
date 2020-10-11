import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/domains/User';

@Injectable({ providedIn: 'root' })
export class IdentityService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;
    private localStorage: Storage;

    constructor(       
        private router: Router,
        private http: HttpClient
    ) {
        this.localStorage = localStorage;
        this.userSubject = new BehaviorSubject<User>(JSON.parse(this.localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get getUser(): User {
        return this.userSubject.value;
    }

    login(login, password) {
        return this.http.post<User>(`${environment.apiUrl}/identity/authenticate`, { login, password })
            .pipe(map(user => {
                this.localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }

    logout() {
        this.localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/identity/logout']);
    }

    getAll(params? :any) {
        return this.http.get<User[]>(`${environment.apiUrl}/identity`);
    }
}