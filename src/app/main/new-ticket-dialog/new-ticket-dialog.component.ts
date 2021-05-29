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
  selector: 'app-new-ticket-dialog',
  templateUrl: './new-ticket-dialog.component.html',
  styleUrls: ['./new-ticket-dialog.component.css']
})
export class NewTicketDialogComponent implements OnInit {
  currentTicketId = 0;
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
  constructor(private ticketService: TicketService, private dictionaryService: DictionaryService,
              public dialogRef: MatDialogRef<NewTicketDialogComponent>,
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
            console.log(error);
          }
        );
      } else {
        this.currentTicket.userAssigneeId = 'Не назначен';
      }
      this.dictionaryService.getCategoryByName(this.currentTicket.category).subscribe(
        category => {
          this.currentTicket.category = category.displayName;
        }
      );
    }
  }
  closed(): void {
    this.dialogRef.close();
  }

  assigneeTicket(ticketId: any): void {
    this.ticketService.changeStatusTicketAndAssignee(ticketId, 'ASSIGNED').subscribe(
      res => {
        this.dialogRef.close();
      });
  }
}
