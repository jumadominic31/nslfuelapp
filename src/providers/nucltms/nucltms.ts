import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage' ;

/*
  Generated class for the NucltmsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NucltmsProvider {

  apiUrl = 'https://www.avanettech.co.ke/fuelstapp/api';
  // apiUrl = "http://fuelstapp.local/api";
  headerParams: object  = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type'
  }

  username : any;
  token: string;
  userdetails : any;
  vehicle: any;

  constructor(public http: HttpClient, private storage: Storage,) {

    this.storage.get('username').then(data => {
      this.username = data;
    });
    this.storage.get('token').then(data => {
      this.token =  data.token_id;
    });
    // this.storage.get('userdetails').then(data => {
    //   this.userdetails = data.userdetails[0];
    // });
  }

  getUserDetails() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/user/'+this.username+'?token='+this.token, this.headerParams)
      .subscribe(data => {
        console.log(data);
        resolve(data);
        this.userdetails = data[0];
        console.log(this.userdetails);
      }, (err) => {
        console.log(err);
      });
    });
  }

  // getPumpDetails() {
  //   return new Promise(resolve => {
  //     this.http.get(this.apiUrl+'/pump/fuel/32?token='+this.token, this.headerParams)
  //     .subscribe(data => {
  //       console.log(data);
  //       resolve(data);
  //     }, (err) => {
  //       console.log(err);
  //     });
  //   });
  // }

  getVehicles() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/getvehicles?token='+this.token, this.headerParams)
      .subscribe(data => {
        console.log(data);
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
