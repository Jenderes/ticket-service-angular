import { Component, OnInit } from '@angular/core';
import {TicketService} from '../../_service/ticket.service';
import {TokenStorageService} from '../../_service/token-storage.service';
import {Router} from '@angular/router';
import {DictionaryService} from '../../_service/dictionary.service';
import {TicketInformationDialogComponent} from '../ticket-information-dialog/ticket-information-dialog.component';
import {AssigneeTicketDialogComponent} from '../assignee-ticket-dialog/assignee-ticket-dialog.component';
import {MatDialog} from '@angular/material/dialog';
interface TicketData {
  ticketId: number;
  name: string;
  description: string;
  category: string;
  userFullName: string;
}
interface Category {
  displayName: string;
  name: string;
  initialStatus: string;
}
@Component({
  selector: 'app-manager-tikcet-list',
  templateUrl: './manager-ticket-list.component.html',
  styleUrls: ['./manager-ticket-list.component.css']
})
export class ManagerTicketListComponent implements OnInit {
  dataTicket: TicketData[];
  categories: Category[];
  public isTicket = false;
  constructor(private ticketService: TicketService, private dictionaryService: DictionaryService,
              private tokenStorageService: TokenStorageService,
              private  router: Router, public dialog: MatDialog) {
    this.dictionaryService.getAllCategory().subscribe(
      data => {
        this.categories = data;
      }
    );
  }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()){
      this.ticketService.getUserAssigneeTicket().subscribe(
        tickets => {
          this.convertToTicketList(tickets);
        }
      );
    }
  }
  convertToTicketList(data: TicketData[]): void {
    if (data != null && data.length > 0){
      this.isTicket = true;
      this.dataTicket = data;
    } else {
      this.isTicket = false;
    }
  }
  newTicket(): void {
    this.router.navigate(['./new_ticket']).then();
  }
  openDialog(ticketId: number): void {
    const dialogRef = this.dialog.open(AssigneeTicketDialogComponent, {
      width: '600px',
      data: {idTicket: ticketId}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/manager']).then();
    });
  }
}
