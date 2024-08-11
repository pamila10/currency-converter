import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, retry, throwError } from "rxjs";
import { ICurrency } from "../models/currency";

@Injectable({
  providedIn: 'root'
})

export class CurrencyService {
  constructor(
    private http: HttpClient,
  ) {}
  
  apikey: string = environment.apikey
  apiUrl: string = environment.apiUrl

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something went wrong. Please try again later.'));
  }

  getApiData(): Observable<ICurrency> {
    return this.http.get<ICurrency>(this.apiUrl,
      {headers: new HttpHeaders({
          apikey: this.apikey
        })
    }).pipe(
      retry(2),
      catchError(this.handleError)
    )
  }
}