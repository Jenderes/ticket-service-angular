import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {AuthenticationService} from '../_service/authentication.service';
import {Router} from '@angular/router';
import {match} from '../validators/match.validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage = '';

  isRegister = false;
  isRegisterFailed = false;

  constructor(private authService: AuthenticationService, private router: Router) {
    this.registerForm = new FormGroup({
      login: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [Validators.required]),
      passwordsForm: new FormGroup({
        password: new FormControl('', [Validators.required, Validators.min(8)]),
        passwordConfirm: new FormControl('', [Validators.required]),
      }, match('password', 'passwordConfirm'))
    });
  }

  ngOnInit(): void {
  }
  register(): any {
    this.authService.register(this.registerForm).subscribe(
      data => {
        this.isRegisterFailed = false;
        this.isRegister = true;
        this.router.navigate(['/login']);
      }, err => {
        this.errorMessage = err.error;
        this.isRegisterFailed = true;
      }
    );
  }
}
