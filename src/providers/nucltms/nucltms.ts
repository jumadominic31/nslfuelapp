import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the NucltmsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NucltmsProvider {

  constructor(public http: HttpClient) {
    console.log('Hello NucltmsProvider Provider');
  }

}
