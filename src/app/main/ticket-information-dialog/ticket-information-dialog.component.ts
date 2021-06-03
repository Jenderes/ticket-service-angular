import {Component, Inject, OnInit} from '@angular/core';
import {TicketService} from '../../_service/ticket.service';
import {DictionaryService} from '../../_service/dictionary.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../_service/token-storage.service';
import {AuthenticationService} from '../../_service/authentication.service';
interface Ticket {
  ticketId: string;
  name: string;
  description: string;
  userAssigneeId;
  status: string;
  category: string;
  createDate: string;
  updateDate: string;
  userFullName: string;
}
interface DialogData {
  idTicket: number;
  isManager: boolean;
  isNewTicketManager: boolean;
}
@Component({
  selector: 'app-ticket-information-dialog',
  templateUrl: './ticket-information-dialog.component.html',
  styleUrls: ['./ticket-information-dialog.component.css']
})
export class TicketInformationDialogComponent implements OnInit {
  currentTicket: Ticket = {
    ticketId: '',
    name: '',
    description: '',
    userAssigneeId: '',
    status: '',
    category: '',
    createDate: '',
    updateDate: '',
    userFullName: ''
  };
  currentTicketId: number;
  isComplete = false;
  isManager = false;
  isNewTicketManager = false;
  isChangeName = false;
  isChangeDescription = false;
  isAllChanged = false;
  constructor(private ticketService: TicketService, private dictionaryService: DictionaryService,
              public dialogRef: MatDialogRef<TicketInformationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData, private authenticationService: AuthenticationService) {
    this.currentTicketId = data.idTicket;
    this.isManager = data.isManager;
    this.isNewTicketManager = data.isNewTicketManager;
  }

  ngOnInit(): void {
    this.ticketService.getTicketById(this.currentTicketId).subscribe(
      ticket => {
        this.initialTicket(ticket);
      },
        error => {
        console.log(error);
      }
    );
  }
  initialTicket(ticket: Ticket): void{
    this.currentTicket = ticket;
    if (ticket != null){
      if (this.currentTicket.userAssigneeId != null){
        this.authenticationService.findUserById(this.currentTicket.userAssigneeId).subscribe(
          user => {
            this.currentTicket.userAssigneeId = user.firstName + ' ' + user.lastName;
          }, error => {
            this.currentTicket.userAssigneeId = 'Не назначен';
            console.log(error);
          }
        );
      } else {
        this.currentTicket.userAssigneeId = 'Не назначен';
      }
      if (this.currentTicket.status === 'COMPLETE' || this.currentTicket.status === 'REJECTED'){
        this.isComplete = true;
      }
      this.dictionaryService.getStatusByName(this.currentTicket.status).subscribe(
        status => {
          this.currentTicket.status = status.displayName;
        }
      );
      this.dictionaryService.getCategoryByName(this.currentTicket.category).subscribe(
        category => {
          this.currentTicket.category = category.displayName;
        }
      );
    }
  }

  cancelTicket(ticketId: string): void {
    this.ticketService.cancelTicketById(ticketId).subscribe(
      res => {
        console.log(res);
        this.dialogRef.close();
      }
    );
  }

  closed(): void {
    this.dialogRef.close();
  }

  assigneeTicket(ticketId: string): void {
    this.ticketService.changeStatusTicketAndAssignee(ticketId, 'ASSIGNED').subscribe(
      res => {
        console.log(res);
        this.dialogRef.close();
      }
    );
  }

  completeTicket(ticketId: string): void {
    this.ticketService.changeStatusTicketAndAssignee(ticketId, 'COMPLETE').subscribe(
      res => {
        console.log(res);
        this.dialogRef.close();
      }
    );
  }

  changeDesc(): void {
    this.isAllChanged = true;
    this.isChangeDescription = !this.isChangeDescription;
  }
  changeName(): void {
    this.isAllChanged = true;
    this.isChangeName = !this.isChangeName;
  }

  changeTicket(ticketId: string, name: string, description: string): void {
    this.ticketService.changeInfoTicket(ticketId, name, description).subscribe(
      res => {
        console.log(res);
        this.dialogRef.close();
      }
    );
  }
}
