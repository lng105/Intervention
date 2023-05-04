import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { ITypeProbleme } from './probleme';


@Injectable({
  providedIn: 'root'
})
export class ProblemeService {
  private baseUrl = 'https://localhost:7144/v1/probleme';
  constructor(private http: HttpClient) { }

  obtenirTypesProbleme(): Observable<ITypeProbleme[]> {
    return this.http.get<ITypeProbleme[]>(this.baseUrl).pipe(
        tap(data => console.log('obtenirTypesProbleme: ' + JSON.stringify(data))),
        catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
