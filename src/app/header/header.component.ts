import {Component, DoCheck, OnInit} from '@angular/core';
import {TokenStorageService} from '../_service/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {
  isLoggedIn = false;
  isManager = false;
  username = '';
  role = 'ПОЛЬЗОВАТЕЛЬ';
  constructor(private tokenStorageService: TokenStorageService,
              private route: Router) {
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.isManager = this.tokenStorageService.checkRole('ROLE_MANAGER');
    if (this.isManager){
      this.role = 'МЕНЕДЖЕР';
    }
  }
  ngDoCheck(): void {
    this.username = this.tokenStorageService.getUser().username;
  }
  signOut(): void {
    this.isLoggedIn = false;
    this.tokenStorageService.signOut();
  }

  resend(): void {
    if (this.tokenStorageService.checkRole('MANAGER')){
      this.role = 'МЕНЕДЖЕР';
      this.route.navigate(['/manager']).then();
    } else {
      this.role = 'ПОЛЬЗОВАТЕЛЬ';
      this.route.navigate(['/user']).then();
    }
  }
}
