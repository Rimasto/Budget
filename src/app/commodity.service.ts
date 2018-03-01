import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { MessageService } from './message.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import {Commodity} from './commodity';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class CommodityService {
  private commodityUrl = 'api/commoditys';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    // Todo: send the message _after_ fetching the heroes
    this.messageService.add('HeroService: fetched heroes');
    // return of(HEROES);
    return this.http.get<Hero[]>(this.commodityUrl)
      .pipe(
        tap(commoditys => this.log(`fetched commoditys`)),
        catchError(this.handleError('getCommoditys', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getCommoditys(id: number): Observable<Commodity> {
    const url = `${this.commodityUrl}/${id}`;
    return this.http.get<Commodity>(url)
      .pipe(
        tap(_ => this.log(`fetched commodity id=${id}`)),
        catchError(this.handleError<Commodity>(`getCommodity id=${id}`))
      );
  }
  /** PUT: update the hero on the server */
  updateCommodity (commodity: Commodity): Observable<any> {
    return this.http.put(this.commodityUrl, commodity, httpOptions)
      .pipe(
        tap(_ => this.log(`updated commodity id=${commodity.id}`)),
        catchError(this.handleError<any>('updateCommodity'))
      );
  }

  /** POST: add a new Commodity to the server */
  addHero (commodity: Commodity): Observable<Commodity> {
    return this.http.post<Commodity>(this.commodityUrl, commodity, httpOptions).pipe(
      tap((tapcommodity: Commodity) => this.log(`added commodity w/ id=${tapcommodity.id}`)),
      catchError(this.handleError<Commodity>('addCommodity'))
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
    this.messageService.add('HeroService: ' + message);
  }

}

