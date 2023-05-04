import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IProbleme } from "./declarerProbleme";
import { Observable, catchError, tap, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
  })

  export class ProblemeService1{
    private baseUrl = 'https://localhost:7144/v1/probleme';
    constructor(private http: HttpClient) { }
    
saveProbleme(probleme: IProbleme): Observable<IProbleme> {
    return this.createProbleme(probleme);
  }

   /** POST: add a new problem to the server */
private createProbleme(probleme: IProbleme): Observable<IProbleme> {
  return this.http.post<IProbleme>(this.baseUrl, probleme, this.httpOptions).pipe(
    tap((probleme: IProbleme) => console.log('added problem w/ id=${probleme.id}')),
    catchError(this.handleError)
  );
}
private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

     private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(err.error);
    //return Observable.throw(err.message);
    //return throwError(err.message); PÉRIMÉ
    return throwError(() => new Error(err.message));
  }
}