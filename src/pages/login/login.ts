import { Component } from '@angular/core';
import { MenuController, NavController, NavParams, AlertController, LoadingController, Loading, Events } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { GlobalsProvider } from './../../providers/globals/globals';
import { Storage } from '@ionic/storage' ;

import { MakesalePage } from './../makesale/makesale';


// @IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  registerCredentials = { username: '', password: '' };
  vehicles: any = [];
  userdetails: any = {};
  pumpdetails: any = {};
  rates: any;

  constructor(public globals: GlobalsProvider, public menuCtrl: MenuController, public navCtrl: NavController, public navParams: NavParams, private auth: AuthServiceProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController, public event: Events, public storage: Storage) {
    this.menuCtrl.enable(false, 'myMenu')
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad LoginPage');
  }

  public login() {
    this.showLoading()
    this.auth.login(this.registerCredentials).subscribe(allowed => {
      if (allowed) {     
        this.event.publish('userLogged', this.registerCredentials.username);
        console.log(this.globals);
        this.rates = this.globals.rates;
        for (let i = 0; i < this.rates.length; i++) {
          let data = this.rates[i];
          if (data.fueltype == 'diesel'){
            this.globals.rate_diesel = data.sellprice;
          } else if (data.fueltype == 'petrol'){
            this.globals.rate_petrol = data.sellprice;
          } else if (data.fueltype == 'kerosene'){
            this.globals.rate_kerosene = data.sellprice;
          }
        }
        this.navCtrl.setRoot(MakesalePage, {pumpdetails : this.globals.pumpdetails, vehicles : this.globals.vehicles });       
      } else {
        this.showError("Access Denied");
      }
    },
    error => {
      this.showError(error);
    });
  }
 
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
 
  showError(text) {
    this.loading.dismiss();
 
    let alert = this.alertCtrl.create({
      title: 'Login Failed',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

}
