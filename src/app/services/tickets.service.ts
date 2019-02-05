import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class TicketsService {
  constructor(private http: HttpClient) {}

  getTickets() {
    return this.http.get('/data/tickets.json').pipe(
      map(response => response),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
