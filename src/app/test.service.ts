import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Hero} from './hero';
import {of} from 'rxjs/observable/of';

@Injectable()
export class TestService {

  private testString: string;
  constructor() {
    this.testString = 'testServiceXML';
  }

  getTestdata(): Observable<string> {
    return of(this.testString);
  }

}
