import { Component, OnInit } from '@angular/core';
import {TicketService} from '../../_service/ticket.service';
import {TokenStorageService} from '../../_service/token-storage.service';
import {Router} from '@angular/router';
interface TicketData {
  requestId: number;
  header: string;
  description: string;
  work: string;
}
interface Work {
  name: string;
  value: string;
}
@Component({
  selector: 'app-user-ticket-list',
  templateUrl: './user-ticket-list.component.html',
  styleUrls: ['./user-ticket-list.component.css']
})
export class UserTicketListComponent implements OnInit {
  dataSource: TicketData[];
  work: Work[];
  public isTicket = false;
  constructor(private ticketService: TicketService, private tokenStorageService: TokenStorageService,
              private  router: Router) {
    this.ticketService.getWorkList().subscribe(
      data => {
        this.getWorks(data);
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
      this.dataSource = data;
      for (const elem of this.dataSource){
        for (const el of this.work){
          if (elem.work === el.value){
            elem.work = el.name;
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
  getWorks(works: Work[]): void{
    this.work = works;
  }
  changeDateFormat(dateTask: string): string {
    return dateTask.split('-').reverse().join('.');
  }
}
