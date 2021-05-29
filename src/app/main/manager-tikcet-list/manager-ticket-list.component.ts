import { Component, OnInit } from '@angular/core';
import {TicketService} from '../../_service/ticket.service';
import {TokenStorageService} from '../../_service/token-storage.service';
import {Router} from '@angular/router';
import {DictionaryService} from '../../_service/dictionary.service';
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
              private  router: Router) {
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
  createTicket(): void {
    this.router.navigate(['/create']).then();
  }
  allInformationTicket(id: number): void {
    console.log(id);
  }

  completeTicket(requestId: number): void {
    this.ticketService.changeStatusTicket(requestId, 'complete');
  }

  rejectTicket(requestId: number): void {
    this.ticketService.changeStatusTicket(requestId, 'rejected');
  }

  newTicket(): void {
    this.router.navigate(['./new_ticket']).then();
  }
}
