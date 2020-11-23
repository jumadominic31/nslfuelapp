import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage' ;
import { Observable } from 'rxjs/Observable';
import { GlobalsProvider } from '../globals/globals';
import 'rxjs/add/operator/map';

interface LoginResponse {
  status : string,
  token : string,
  station : [{'id': string}],
  vehicles: [string],
  pumps: [{'id': string, 'stationid' : string, 'pumpname': string, 'fueltype' : string}],
  rates: [{'id': string, 'fueltype': string, 'sellprice': number, 'stationid': string}],
  userdetails : [{'address' : string, 'city' : string, 'companyid' : string, 'email' : string, 'id' : string, 'name' : string, 'phone' : string, 'receipt_header' : string, 'station' : string, 'stationid' : string, 'username' : string }]
}

@Injectable()
export class AuthServiceProvider {
  
  apiUrl = 'https://www.avanettech.co.ke/fuelstapp/api';
  // apiUrl = "http://fuelstapp.local/api";

  token_id: string;
  userdetails: any;

  public login(credentials) {
    if (credentials.username === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } 
    else {
      return Observable.create(observer => {
        // At this point make a request to your backend to make a real check!
        this.http.post<LoginResponse>(this.apiUrl + '/user/signin', 
          {
            username : credentials.username,
            password : credentials.password
          })
        .subscribe(
          data => {
            this.token_id = data.token;
            this.globals.token_id = data.token;
            this.globals.username = credentials.username;
            this.globals.userdetails = data.userdetails;
            this.globals.vehicles = data.vehicles;
            this.globals.stations = data.station;
            this.globals.pumpdetails = data.pumps;
            this.globals.rates = data.rates;
            let access = (data.status === "success");
            observer.next(access);
            observer.complete();  
          }, 
          error => {
            console.log(error);
          }
        );        
      });
    }
  }
 
  public logout() {
    return Observable.create(observer => {
      observer.next(true);
      observer.complete();
    });
  }

  constructor(public http: HttpClient, public storage: Storage, public globals: GlobalsProvider) {
    // console.log('Hello AuthServiceProvider Provider');
  }

}

