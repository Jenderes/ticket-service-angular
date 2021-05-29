import { Component, OnInit } from '@angular/core';
import {TicketService} from '../../_service/ticket.service';
import {TokenStorageService} from '../../_service/token-storage.service';
import {Router} from '@angular/router';
import {DictionaryService} from '../../_service/dictionary.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {TicketInformationDialogComponent} from '../ticket-information-dialog/ticket-information-dialog.component';
interface TicketData {
  ticketId: number;
  name: string;
  description: string;
  category: string;
  status: string;
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
  categories: Category[];
  public isTicket = false;
  constructor(private ticketService: TicketService, private tokenStorageService: TokenStorageService,
              private  router: Router, private dictionaryService: DictionaryService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()){
      this.ticketService.getUserTicket().subscribe(
        data => {
          this.getTicketList(data);
        }
      );
    }
  }
  getTicketList(data: TicketData[]): void {
    if (data != null && data.length > 0){
      this.isTicket = true;
      this.dataTicket = data;
      for (const ticket of this.dataTicket){
        this.dictionaryService.getCategoryByName(ticket.category).subscribe(
          category => {
            ticket.category = category.displayName;
          });
        this.dictionaryService.getStatusByName(ticket.status).subscribe(
          status => {
            ticket.status = status.displayName;
          });
      }
    } else {
      this.isTicket = false;
    }
  }
  createTicket(): void {
    this.router.navigate(['/create']).then();
  }
  getCategoryList(categories: Category[]): void{
    this.categories = categories;
  }

  allInformationTicket(id: number): void {
    console.log(id);
  }
  openDialog(ticketId: number): void {
    const dialogRef = this.dialog.open(TicketInformationDialogComponent, {
      width: '600px',
      data: {idTicket: ticketId}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/user']).then();
    });
  }
}
