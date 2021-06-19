import { Component, OnInit } from '@angular/core';
import {TicketService} from '../../_service/ticket.service';
import {TokenStorageService} from '../../_service/token-storage.service';
import {Router} from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {TicketInformationDialogComponent} from '../ticket-information-dialog/ticket-information-dialog.component';
import {DictionaryService} from '../../_service/dictionary.service';
import {AuthenticationService} from '../../_service/authentication.service';
interface TicketData {
  ticketId: number;
  name: string;
  description: string;
  category: string;
  status: string;
  userFullName: string;
  userAssigneeId: number;
  managerFullName: string;
}
interface Category {
  displayName: string;
  name: string;
  initialStatus: string;
}
@Component({
  selector: 'app-user-ticket-list',
  templateUrl: './user-ticket-list.component.html',
  styleUrls: ['./user-ticket-list.component.css']
})
export class UserTicketListComponent implements OnInit {
  dataTicket: TicketData[];
  isManager = false;
  isNewTicketManager = false;
  public isTicket = false;
  constructor(private ticketService: TicketService, private tokenStorageService: TokenStorageService,
              private  router: Router, private dictionaryService: DictionaryService,
              public dialog: MatDialog, private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.isManager = this.tokenStorageService.checkRole('ROLE_MANAGER');
    if (this.tokenStorageService.getToken()){
      if (!this.isManager){
        this.ticketService.getUserTicket().subscribe(
          data => {
            this.getTicketList(data);
          }
        );
      } else {
        this.ticketService.getUserAssigneeTicket().subscribe(
          tickets => {
            this.getTicketList(tickets);
          }
        );
      }
    }
  }
  getTicketList(data: TicketData[]): void {
    if (data != null && data.length > 0){
      this.isTicket = true;
      this.dataTicket = data;
      for (const ticket of this.dataTicket){
        if (!this.isManager) {
          if (ticket.userAssigneeId != null) {
            this.authenticationService.findUserById(ticket.userAssigneeId).subscribe(
              user => {
                ticket.managerFullName = user.lastName + ' ' + user.firstName;
              }
            );
          } else {
            ticket.managerFullName = 'менеджера нет';
          }
        }
      }
    } else {
      this.isTicket = false;
    }
  }
  createTicket(): void {
    this.router.navigate(['/create']).then();
  }
  openDialog(ticketId: number): void {
    const dialogRef = this.dialog.open(TicketInformationDialogComponent, {
      width: '700px',
      data: {idTicket: ticketId, isManager: this.isManager, isNewTicketManager: this.isNewTicketManager}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/user']).then();
      if (result === true) {
        location.reload();
      }
    });
  }

  userAssigneeTicket(): void {
    this.isNewTicketManager = false;
    this.ticketService.getUserAssigneeTicket().subscribe(
      tickets => {
        this.getTicketList(tickets);
      }
    );
  }

  newTicket(): void {
    this.isNewTicketManager = true;
    const userCategory = this.tokenStorageService.getUser().category;
    this.dictionaryService.getCategoryByName(userCategory).subscribe(
      category => {
        this.ticketService.getTicketByCategoryAndStatus(category).subscribe(
          tickets => {
            this.getTicketList(tickets);
          }
        );
      }
    );
  }
}
