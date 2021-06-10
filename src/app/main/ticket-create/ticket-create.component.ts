import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TicketService} from '../../_service/ticket.service';
import {DictionaryService} from '../../_service/dictionary.service';
import {Router} from '@angular/router';

interface Category {
  name: string;
  displayName: string;
}
interface TroubleTicket {
  name: string;
  description: string;
  category: string;
}

@Component({
  selector: 'app-ticket-create',
  templateUrl: './ticket-create.component.html',
  styleUrls: ['./ticket-create.component.css']
})
export class TicketCreateComponent implements OnInit {
  ticket: TroubleTicket;
  ticketForm: FormGroup;
  arrayCategory: Category[];
  constructor(public ticketService: TicketService, public dictionaryService: DictionaryService,
              public route: Router, private formBuilder: FormBuilder) {
    this.ticket = {
      category: '',
      name: '',
      description: ''
    };
  }

  ngOnInit(): void {
    this.dictionaryService.getAllCategory().subscribe(
      categories => {
        this.setCategory(categories);
      }
    );
  }
  setCategory(categories: Category[]): void {
    this.arrayCategory = categories;
  }
  createTicket(): void{
   this.ticketService.createTicket(this.ticket).subscribe(
     data => {
       console.log(data);
     },
     error => {
       console.log(error);
     }
   );
   this.route.navigate(['/user']).then();
  }

  onSubmit(): void{

  }
}
