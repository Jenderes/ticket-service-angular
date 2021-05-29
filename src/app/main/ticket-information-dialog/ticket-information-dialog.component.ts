import {Component, Inject, OnInit} from '@angular/core';
import {TicketService} from '../../_service/ticket.service';
import {DictionaryService} from '../../_service/dictionary.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
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
  constructor(private ticketService: TicketService, private dictionaryService: DictionaryService,
              public dialogRef: MatDialogRef<TicketInformationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData, private route: Router) {
    this.currentTicketId = data.idTicket;
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
        this.ticketService.findUserById(this.currentTicket.userAssigneeId).subscribe(
          user => {
            this.currentTicket.userAssigneeId = user.firstName + user.lastName;
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
}
