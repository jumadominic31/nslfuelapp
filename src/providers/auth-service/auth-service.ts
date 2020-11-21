import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage' ;
import { Observable } from 'rxjs/Observable';
import { GlobalsProvider } from '../globals/globals';
import 'rxjs/add/operator/map';

// export class User {
//   username: string;
//   userid: string;
//   office_name: string;
//   office_id: string;

//   constructor(username: string, userid: string, office_name: string, office_id: string) {
//     this.username = username;
//     this.userid = userid;
//     this.office_name = office_name;
//     this.office_id = office_id;
//   }
// }

export class Token {
  token_id : string;

  constructor(token_id: string) {
    this.token_id = token_id;
  }
}

interface LoginResponse {
  status : string,
  token : string,
  userdetails : [{'address' : string, 'city' : string, 'companyid' : string, 'email' : string, 'id' : string, 'name' : string, 'phone' : string, 'receipt_header' : string, 'station' : string, 'stationid' : string, 'username' : string }]
}

@Injectable()
export class AuthServiceProvider {
  
  apiUrl = 'https://www.avanettech.co.ke/fuelstapp/api';
  // apiUrl = "http://fuelstapp.local/api";
  // currentUser: User;

  token: Token;
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
            this.token = new Token(data.token);
            this.storage.set('token', this.token);
            this.storage.set('username', credentials.username);
            this.storage.set('userdetails', data.userdetails);
            // this.currentUser = new User(data[0].username, data[0].userid, data[0].office_name, data[0].office_id);
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
 
  // public getUserInfo() : User {
  //   return this.currentUser;
  // }
 
  public logout() {
    return Observable.create(observer => {
      this.storage.remove('userdetails');
      this.storage.remove('token');
      this.storage.remove('username');
      observer.next(true);
      observer.complete();
    });
  }

  constructor(public http: HttpClient, public storage: Storage, public globals: GlobalsProvider) {
    // console.log('Hello AuthServiceProvider Provider');
  }

}

