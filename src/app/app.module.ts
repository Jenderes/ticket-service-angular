import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { MainComponent } from './main/main.component';
import { TicketCreateComponent } from './main/ticket-create/ticket-create.component';
import { UserTicketListComponent } from './main/user-ticket-list/user-ticket-list.component';
import { ManagerTicketListComponent } from './main/manager-tikcet-list/manager-ticket-list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ErrorComponent } from './error/error.component';
import { HeaderComponent } from './header/header.component';
import {authInterceptorProviders} from './_helpers/auth.interceptor';
import {DatePipe, HashLocationStrategy, LocationStrategy} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { TicketListWithoutUserassigneeComponent } from './main/ticket-list-without-userassignee/ticket-list-without-userassignee.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    MainComponent,
    TicketCreateComponent,
    UserTicketListComponent,
    ManagerTicketListComponent,
    NotFoundComponent,
    ErrorComponent,
    HeaderComponent,
    TicketListWithoutUserassigneeComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatButtonModule
    ],
  providers: [DatePipe, authInterceptorProviders, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
