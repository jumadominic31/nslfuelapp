import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the GlobalsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalsProvider {

  token_id: string = '';
  username: string = '';
  userdetails: any = {};
  pumpdetails: any = [];
  rates: any = [];
  rate_diesel: number = 0;
  rate_petrol: number = 0;
  rate_kerosene: number = 0;
  vehicles: any = [];
  stations: any = [];

  constructor(public http: HttpClient) {
  }

}
