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
              private  router: Router, private dictionaryService: DictionaryService) {
    this.dictionaryService.getAllCategory().subscribe(
      data => {
        this.getCategoryList(data);
      }
    );
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
  createTicket(): void {
    this.router.navigate(['/create']).then();
  }
  getCategoryList(categories: Category[]): void{
    this.categories = categories;
  }

  allInformationTicket(id: number): void {
    console.log(id);
  }
}
