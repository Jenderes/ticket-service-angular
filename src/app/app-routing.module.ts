import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from './main/main.component';
import {UserTicketListComponent} from './main/user-ticket-list/user-ticket-list.component';
import {TicketCreateComponent} from './main/ticket-create/ticket-create.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';

const routes: Routes = [
  { path: '', component:  MainComponent, children: [
      { path: 'user', component: UserTicketListComponent},
      { path: 'create', component: TicketCreateComponent},
    ]},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegistrationComponent},
  { path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
