import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export class User {
  username: string;
  userid: string;
  office_name: string;
  office_id: string;

  constructor(username: string, userid: string, office_name: string, office_id: string) {
    this.username = username;
    this.userid = userid;
    this.office_name = office_name;
    this.office_id = office_id;
  }
}

@Injectable()
export class AuthServiceProvider {
  
  apiUrl = 'https://www.nucleurinvestments.com/posapp/';
  currentUser: User;

  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        // At this point make a request to your backend to make a real check!
        this.http.get(this.apiUrl+`login.php?id=${credentials.username}&pw=${credentials.password}`)
        .subscribe(data => {
          this.currentUser = new User(data[0].username, data[0].userid, data[0].office_name, data[0].office_id);
          console.log(data);
          let access = (data[0].status === 'Success');
          observer.next(access);
          observer.complete();
        }, (err) => {
          console.log(err);
        });        
      });
    }
  }
 
  public getUserInfo() : User {
    return this.currentUser;
  }
 
  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }

  constructor(public http: HttpClient) {
    console.log('Hello AuthServiceProvider Provider');
  }

}
