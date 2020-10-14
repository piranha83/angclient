import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from './interceptors';

import { AppComponent } from './app.component';
import { HomeComponent, LoginComponent, UserComponent } from './components';
import {NgxPaginationModule} from 'ngx-pagination';
import { PaginatorComponent } from './components/common/paginator/paginator.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxPaginationModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    LoginComponent,
    PaginatorComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
