import { Component, OnInit } from '@angular/core';
import {TicketService} from '../../_service/ticket.service';
import {DictionaryService} from '../../_service/dictionary.service';
import {TokenStorageService} from '../../_service/token-storage.service';
import {Router} from '@angular/router';
import {AssigneeTicketDialogComponent} from '../assignee-ticket-dialog/assignee-ticket-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {NewTicketDialogComponent} from '../new-ticket-dialog/new-ticket-dialog.component';
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
  selector: 'app-ticket-list-without-userassignee',
  templateUrl: './ticket-list-without-userassignee.component.html',
  styleUrls: ['./ticket-list-without-userassignee.component.css']
})
export class TicketListWithoutUserassigneeComponent implements OnInit {
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
      const userCategory = this.tokenStorageService.getUser().category;
      this.dictionaryService.getCategoryByName(userCategory).subscribe(
        category => {
          this.ticketService.getTicketByCategoryAndStatus(category).subscribe(
            tickets => {
              this.convertToTicketList(tickets);
            }
          );
        }
      );
    }
  }
  convertToTicketList(data: TicketData[]): void {
    if (data != null && data.length > 0){
      this.isTicket = true;
      this.dataTicket = data;
      for (const elem of this.dataTicket){
        for (const el of this.categories){
          if (elem.category === el.name){
            elem.category = el.displayName;
            break;
          }
        }
      }
    } else {
      this.isTicket = false;
    }
  }
  assigneeTicket(): void {
    this.router.navigate(['/manager']).then();
  }
  openDialog(ticketId: number): void {
    const dialogRef = this.dialog.open(NewTicketDialogComponent, {
      width: '600px',
      data: {idTicket: ticketId}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/manager']).then();
    });
  }
}
