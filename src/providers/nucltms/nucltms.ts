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

  postBooking(binputData) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+`book.php?user_id=${binputData.userid}&fromTown=${binputData.from}&toTown=${binputData.to}&date=${binputData.date}&fare=${binputData.fare}&pass_name=${binputData.name}&Busid=${binputData.vehicle}`, this.headerParams)
      .subscribe(data => {
        resolve(data);
      }, (err) => {
        console.log(err);
      });
    });
  }

  postDelivery(dinputData) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+`delivery.php?busname=${dinputData.vehicle}&servch=${dinputData.svcch}&otherch=${dinputData.other}&userid=${dinputData.userid}&username=${dinputData.username}&numpass=${dinputData.numpass}&grossamt=${dinputData.collamt}&loan=${dinputData.loan}&insurance=${dinputData.ins}&fromcityname=${dinputData.from}&tocityname=${dinputData.to}`, this.headerParams)
      .subscribe(data => {
        resolve(data);
      }, (err) => {
        console.log(err);
      });
    });
  }

}
