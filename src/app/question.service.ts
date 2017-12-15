import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Question } from './question';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class QuestionService {

  private questionsUrl = 'api/questions';  // URL to web api

  constructor(
    private http: HttpClient) { }


  /** GET questions from the server */
  getQuestions (): Observable<Question[]> {
    return this.http.get<Question[]>(this.questionsUrl)
      .pipe(
        tap(questions => this.log(`fetched questions`)),
        catchError(this.handleError('getQuestions', []))
      );
  }

  /* GET questions whose category contains search term */
  searchQuestionsByCategory(category: string): Observable<Question[]> {
    if (!category.trim()) {
      // if not search term, return empty question array.
      return of([]);
    }
    return this.http.get<Question[]>(`api/questions/?category=${category}`).pipe(
      tap(_ => this.log(`found questions matching "${category}"`)),
      catchError(this.handleError<Question[]>('searchQuestions', []))
    );
  }

  /* GET questions whose contest contains search term */
  searchQuestionsByContest(contest: string): Observable<Question[]> {
    if (!contest.trim()) {
      // if not search term, return empty question array.
      return of([]);
    }
    return this.http.get<Question[]>(`api/questions/?category=${contest}`).pipe(
      tap(_ => this.log(`found questions matching "${contest}"`)),
      catchError(this.handleError<Question[]>('searchQuestions', []))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }
}
