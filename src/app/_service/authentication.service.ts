import { Injectable } from '@angular/core';
import {GlobalVariable} from '../_helpers/variable.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const AUTH_API = GlobalVariable.API_URL + 'authentication/';
const HttpOptions = GlobalVariable.httpOptions;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'login', {
      username: credentials.username,
      password: credentials.password
    }, HttpOptions);
  }
  register(user): Observable<any> {
    return this.http.post(AUTH_API + 'register', {
      login: user.value.login,
      email: user.value.email,
      password:  user.value.passwordsForm.password,
      firstName: user.value.firstName,
      lastName: user.value.lastName
    }, HttpOptions);
  }
}
