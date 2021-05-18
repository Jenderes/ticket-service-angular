import { HttpHeaders } from '@angular/common/http';

export const GlobalVariable = Object.freeze({
  API_URL: 'http://localhost:8083/api/',
  httpOptions: {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
});
