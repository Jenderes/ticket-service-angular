import { Injectable } from '@angular/core';
import {GlobalVariable} from '../_helpers/variable.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, Subscription, } from 'rxjs';
import {DictionaryService} from './dictionary.service';
import {TokenStorageService} from './token-storage.service';

interface Category {
  displayName: string;
  name: string;
  initialStatus: string;
}

const API_URL_TICKET = GlobalVariable.API_URL + 'troubleTicket';
const httpOptions = GlobalVariable.httpOptions;

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  constructor(private http: HttpClient,
              private dictionaryService: DictionaryService,
              private tokenStorageService: TokenStorageService) {
  }
  getUserTicket(): Observable<any> {
    return this.http.get(API_URL_TICKET, {
    params: {
      createById: this.tokenStorageService.getCurrentId()
    }
    });
  }

  getUserAssigneeTicket(): Observable<any> {
    return this.http.get(API_URL_TICKET, {
      params: {
        userAssigneeId: this.tokenStorageService.getCurrentId(),
        status: 'ASSIGNED'
      }
    });
  }
  getTicketByCategoryAndStatus(category: Category): Observable<any>{
    return this.http.get(API_URL_TICKET, {
      params: {
        category: category.name,
        status: category.initialStatus
      }
    });
  }
  createTicket(ticket): Observable<any> {
    return this.http.post(API_URL_TICKET, {
      name: ticket.name,
      description: ticket.description,
      category: ticket.category,
    }, httpOptions);
  }
  changeStatusTicketAndAssignee(ticketId: number | string, statusValue: string): Observable<any>{
    const userId = this.tokenStorageService.getCurrentId();
    return this.http.patch(API_URL_TICKET + '/' + ticketId, {
      userAssigneeId: userId,
      status: statusValue
    }, httpOptions);
  }
  getTicketById(ticketId: number): Observable<any> {
    return this.http.get(API_URL_TICKET + '/' + ticketId);
  }
  cancelTicketById(ticketId: string): Observable<any> {
    return this.http.patch(API_URL_TICKET + '/' + ticketId, {
      status: 'REJECTED'
    });
  }
  changeInfoTicket(ticketId: string | number, nameTicket: string, descriptionTicket: string): Observable<any>{
    return this.http.patch(API_URL_TICKET + '/' + ticketId, {
      name: nameTicket,
      description: descriptionTicket
    });
  }
}
