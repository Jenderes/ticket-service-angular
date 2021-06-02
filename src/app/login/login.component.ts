import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../_service/token-storage.service';
import {AuthenticationService} from '../_service/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: any = {};
  errorMessage = '';

  isLoggedIn = false;
  isLoginFailed = false;

  constructor(private tokenStorageService: TokenStorageService, public route: Router,
              private authService: AuthenticationService) { }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
    }
  }
  login(): void {
    this.authService.login(this.loginForm).subscribe(
      loginData => {
        this.tokenStorageService.saveToken(loginData.token);
        this.tokenStorageService.saveUser(loginData);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.route.navigate(['/']);
      },
      err => {
        this.errorMessage = 'Неправильный логин или пароль';
        this.isLoginFailed = true;
      }
    );
  }
}
