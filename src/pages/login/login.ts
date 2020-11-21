import { Component } from '@angular/core';
import { MenuController, NavController, NavParams, AlertController, LoadingController, Loading, Events } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { FuelappfnProvider } from './../../providers/fuelappfn/fuelappfn';
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

  constructor(public globals: GlobalsProvider, public menuCtrl: MenuController, public navCtrl: NavController, public navParams: NavParams, private auth: AuthServiceProvider, private fuelapp: FuelappfnProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController, public event: Events, public storage: Storage) {
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
        // setTimeout(() => {
        //   this.fuelapp.getPumpDetails().then(data => {
        //     this.pumpdetails = data;
        //     this.globals.pumpdetails = data;
        //     // this.storage.set('pumpdetails', this.pumpdetails);
        //   });
          
        //   this.fuelapp.getVehicles().then(data => {
        //     this.vehicles = data;
        //     this.globals.vehicles = data;
        //     // this.storage.set('vehicles', this.vehicles);
        //   });
  
        //   this.fuelapp.getRates().then(data => {
        //     if (data){
        //       this.rates = data;
        //       this.globals.rates = data;
        //       for (let i = 0; i < this.rates.length; i++) {
        //         let data = this.rates[i];
        //         if (data.fueltype == 'diesel'){
        //           let rate_diesel = data.sellprice;
        //           this.globals.rate_diesel = data.sellprice;
        //           // this.storage.set('rate_diesel', rate_diesel);
        //         } else if (data.fueltype == 'petrol'){
        //           let rate_petrol = data.sellprice;
        //           this.globals.rate_petrol = data.sellprice;
        //           // this.storage.set('rate_petrol', rate_petrol);
        //         } else if (data.fueltype == 'kerosene'){
        //           let rate_kerosene = data.sellprice;
        //           this.globals.rate_kerosene = data.sellprice;
        //           // this.storage.set('rate_kerosene', rate_kerosene);
        //         }
        //       }
        //       // this.storage.set('rates', this.rates);
        //     }
            
        //   });

        //   console.log(this.globals);
        // }, 2000);
        // setTimeout(() => {
          this.navCtrl.setRoot(MakesalePage, {pumpdetails : this.globals.pumpdetails, vehicles : this.globals.vehicles });
        // }, 3000);

        
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
