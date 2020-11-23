import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalsProvider } from './../globals/globals';

@Injectable()
export class FuelappfnProvider {

  apiUrl = 'https://www.avanettech.co.ke/fuelstapp/api';
  // apiUrl = "http://fuelstapp.local/api";
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

  constructor(public http: HttpClient, public globals: GlobalsProvider) {
    this.username = globals.username;
    this.token = globals.token_id;
    this.userdetails = globals.userdetails;
    this.rates = globals.rates;
    this.user_id = globals.userdetails.id;
  }

  ionViewWillEnter(){
  }

  getShiftsales() {
    let today = new Date();
    let printDate = today.toISOString().split('T')[0];
    let token_id = this.globals.token_id;
    let user_id = this.globals.userdetails[0].id;
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/txns/'+user_id+'/'+printDate+'?token='+token_id, this.headerParams)
      .subscribe(data => {
        resolve(data);
      }, (err) => {
        console.log(err);
      });
    });
  }

  postchPassword(passdata) {
    let token_id = this.globals.token_id;
    let username = this.globals.username;
    return new Promise(resolve => {
      this.http.post(this.apiUrl +'/user/'+username+'/changepassword?token='+token_id, 
      {
        curr_password:  passdata.curr_pass,
        new_password:   passdata.new_pass1,
        new_password_2: passdata.new_pass2
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
