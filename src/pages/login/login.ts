import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Loading, Events } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { NucltmsProvider } from './../../providers/nucltms/nucltms';
import { Storage } from '@ionic/storage' ;

import { BookingPage } from '../booking/booking';


// @IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  registerCredentials = { username: '', password: '' };
  cities: any = [];
  vehicles: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthServiceProvider, private nucltms: NucltmsProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController, public event: Events, public storage: Storage) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad LoginPage');
  }

  public login() {
    this.showLoading()
    this.auth.login(this.registerCredentials).subscribe(allowed => {
      if (allowed) {        
        
        this.event.publish('userLogged', this.registerCredentials.username);
        
        this.cities = ['Naivasha', 'Nairobi', 'Nakuru'];
        this.vehicles = ['KBH162D', 'KCY398H', 'KCG399H'];
        this.storage.set('cities', this.cities);
        this.storage.set('vehicles', this.vehicles);

        // this.nucltms.getCities().then(data => {
        //   this.cities = data;
        //   this.storage.set('cities', this.cities);
        //   console.log(this.cities);
        // });
        // this.nucltms.getVehicles().then(data => {
        //   this.vehicles = data;
        //   this.storage.set('vehicles', this.vehicles);
        // });
        setTimeout(() => {this.navCtrl.setRoot(BookingPage)}, 2000);
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
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

}
