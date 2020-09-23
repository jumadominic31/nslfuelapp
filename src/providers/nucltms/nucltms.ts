import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the NucltmsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NucltmsProvider {

  apiUrl = 'https://www.nucleurinvestments.com/posapp/';
  headerParams: object  = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type'
  }

  constructor(public http: HttpClient, ) {
    // console.log('Hello NucltmsProvider Provider');
  }

  getCities() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'cities.php', this.headerParams)
      .subscribe(data => {
        resolve(data);
      }, (err) => {
        console.log(err);
      });
    });
  }

  getVehicles() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'vehicles.php', this.headerParams)
      .subscribe(data => {
        resolve(data);
      }, (err) => {
        console.log(err);
      });
    });
  }

  postBooking() {

  }

  postDelivery() {

  }

}
