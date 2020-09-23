import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage' ;
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import { DelisummPage } from './../delisumm/delisumm';
import { NucltmsProvider } from './../../providers/nucltms/nucltms';

@Component({
  selector: 'page-delivery',
  templateUrl: 'delivery.html',
})
export class DeliveryPage {

  username = '';
  office_name = '';

  dinputData: any = {"from" : "", "to" : "", "vehicle" : "", "numpass" : "", "collamt" : "", "svcch" : "", "loan" : "", "ins" : "", "other" : ""};
  cities: any = [];
  vehicles: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public nucltmsProvider: NucltmsProvider, public storage: Storage, public auth: AuthServiceProvider) {

    let info = this.auth.getUserInfo();
    this.username = info['username'];
    this.office_name = info['office_name'];
    this.dinputData.from = info['office_name'];

    this.storage.get('cities').then(data => {
      this.cities = data;
    });
    this.storage.get('vehicles').then(data => {
      this.vehicles =  data;
    });
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad DeliveryPage');
  }

  confirmDelivery(dinputData) {
    this.navCtrl.push(DelisummPage, {dinputData : dinputData});
    console.log(JSON.stringify(dinputData));
  }

}
