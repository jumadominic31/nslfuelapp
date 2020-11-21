import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage' ;
import { GlobalsProvider } from './../globals/globals';

@Injectable()
export class FuelappfnProvider {

  // apiUrl = 'https://www.avanettech.co.ke/fuelstapp/api';
  apiUrl = "http://fuelstapp.local/api";
  headerParams: object  = {
     'Content-Type': 'application/json',
     'Accept': 'application/json',
     'Access-Control-Allow-Headers': 'Content-Type'
   }

  username : string;
  token: any;
  userdetails : [{'address' : string, 'city' : string, 'companyid' : string, 'email' : string, 'id' : string, 'name' : string, 'phone' : string, 'receipt_header' : string, 'station' : string, 'stationid' : string, 'username' : string }];
  user_id : string;
  vehicle: any;
  rates: any;

  constructor(public http: HttpClient, private storage: Storage, public globals: GlobalsProvider) {
    this.username = globals.username;
    this.token = globals.token_id;
    this.userdetails = globals.userdetails;
    this.rates = globals.rates;

    // this.storage.get('username').then(data => {
    //   if (data){
    //     this.username = data;
    //   }
    // });
    // this.storage.get('token').then(data => {
    //   if (data){
    //     this.token =  data.token_id;
    //   }
    // });
    // this.storage.get('userdetails').then(data => {
    //   if (data){
    //     let output: any = data;
    //     this.user_id = output[0].id;
    //   }
    // });
    // this.storage.get('rates').then(data => {
    //   if (data){
    //     this.rates = data;
    //   }
    // });

  }

  ionViewWillEnter(){
    // this.username = this.globals.username;
    // this.token = this.globals.token_id;
    // this.userdetails = this.globals.userdetails;
    // this.rates = this.globals.rates;
  }

  // getPumpDetails() {
  //   return new Promise(resolve => {
  //     this.http.get(this.apiUrl+'/pump/fuel/'+this.user_id+'?token='+this.token, this.headerParams)
  //     .subscribe(data => {
  //       resolve(data);
  //     }, (err) => {
  //       console.log(err);
  //     });
  //   });
  // }

  // getVehicles() {
  //   return new Promise(resolve => {
  //     this.http.get(this.apiUrl+'/getvehicles?token='+this.token, this.headerParams)
  //     .subscribe(data => {
  //       resolve(data);
  //     }, (err) => {
  //       console.log(err);
  //     });
  //   });
  // }

  // getRates() {
  //   let today = new Date();
  //   let printDate = today.toISOString().split('T')[0];
  //   return new Promise(resolve => {
  //     this.http.get(this.apiUrl+'/rates/'+printDate+'?token='+this.token, this.headerParams)
  //     .subscribe(data => {
  //       resolve(data);
  //     }, (err) => {
  //       console.log(err);
  //     });
  //   });
  // }

  postSale(saleData) {
    let token_id = this.globals.token_id;
    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/txns?token='+token_id, 
      {
        vehregno:   saleData.vehicle,
        amount:     saleData.amount,
        volume:     saleData.volume,
        sellprice:  saleData.sellprice,
        fueltype:   saleData.fueltype,
        paymethod:  saleData.pmethod,
        pumpid:     saleData.pumpid
      })
      .subscribe(
        data => {
          resolve(data);
        }, 
        error => {
          console.log(error);
        }
      );   
    });
  }

}
