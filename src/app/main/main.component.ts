import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../_service/token-storage.service';
import {Router} from '@angular/router';
interface UserData {
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  token: string;
}
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  nameBlock;
  userEmail: string;
  userFullName: string;
  isManager: boolean;
  constructor(private tokenStorageService: TokenStorageService, private route: Router) { }

  ngOnInit(): void {
    if (!this.tokenStorageService.getToken()) {
      this.route.navigate(['/#/login']).then();
    }
    const userData: UserData = this.tokenStorageService.getUser();
    this.userEmail = userData.email;
    this.userFullName = userData.firstname + ' ' + userData.lastname;
    if (!this.tokenStorageService.checkRole('MANAGER')){
      this.route.navigate(['/manager']).then();
    } else {
      this.route.navigate(['/user']).then();
    }
  }
}
