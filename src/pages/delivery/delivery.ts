import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { DelisummPage } from './../delisumm/delisumm';
import { NucltmsProvider } from './../../providers/nucltms/nucltms';

@Component({
  selector: 'page-delivery',
  templateUrl: 'delivery.html',
})
export class DeliveryPage {

  dinputData: any = {};
  cities: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public nucltmsProvider: NucltmsProvider) {

    let citiesFn = setTimeout(() => {this.getCities()}, 1000);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeliveryPage');
  }

  confirmDelivery(dinputData) {
    this.navCtrl.push(DelisummPage, {dinputData : dinputData});
    console.log(JSON.stringify(dinputData));
  }

  getCities() {
    this.nucltmsProvider.getCities()
    .then(data => {
      this.cities = data;
      console.log(this.cities);
    });
  }

}
