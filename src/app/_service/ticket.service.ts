import { Injectable } from '@angular/core';
import {GlobalVariable} from '../_helpers/variable.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const API_URL = GlobalVariable.API_URL + 'request/';
const httpOptions = GlobalVariable.httpOptions;

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) { }

  getUserTicket(): Observable<any> {
    return this.http.get(API_URL + 'get');
  }
  createTicket(ticket): Observable<any> {
    return this.http.post(API_URL + 'create', {
      requestId: ticket.requestId,
      header: ticket.header,
      description: ticket.description,
      work: ticket.work
    }, httpOptions);
  }
  changeStatusTicket(ticketId: number, status: string): Observable<any>{
    return this.http.put(API_URL + 'change/' + ticketId + '/' + status, {
    }, httpOptions);
  }
  getWorkList(): Observable<any> {
    return this.http.get(API_URL + 'work');
  }
  getStatusList(): Observable<any> {
    return this.http.get(API_URL + 'status');
  }
}
