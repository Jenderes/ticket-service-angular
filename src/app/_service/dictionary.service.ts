import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalVariable} from '../_helpers/variable.service';
import {Observable} from 'rxjs';
import {delay, map, take} from 'rxjs/operators';

const API_URL_DICTIONARY = GlobalVariable.API_URL + 'dictionary';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  constructor(private http: HttpClient) { }

  getAllStatus(): Observable<any> {
    return this.http.get(API_URL_DICTIONARY + '/status');
  }
  getAllCategory(): Observable<any> {
    return this.http.get(API_URL_DICTIONARY + '/category');
  }
  gerAllStatusTransition(): Observable<any> {
    return this.http.get(API_URL_DICTIONARY + '/statusTransition');
  }
  getStatusByName(statusName: string): Observable<any> {
    return this.http.get(API_URL_DICTIONARY + '/status/' + statusName);
  }
  getCategoryByName(categoryName: string): Observable<any> {
    return this.http.get(API_URL_DICTIONARY + '/category/' + categoryName);
  }
  getStatusTransitionByFromStatusAndCategory(fromStatus: string, category: string): Observable<any> {
    return this.http.get(API_URL_DICTIONARY + '/fromStatus/' + fromStatus + '/category/' + category);
  }
}
