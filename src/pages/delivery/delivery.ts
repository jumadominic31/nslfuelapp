import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { DelisummPage } from './../delisumm/delisumm';

@Component({
  selector: 'page-delivery',
  templateUrl: 'delivery.html',
})
export class DeliveryPage {

  dinputData: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeliveryPage');
  }

  confirmDelivery(dinputData) {
    this.navCtrl.push(DelisummPage, {dinputData : dinputData});
    console.log(JSON.stringify(dinputData));
  }

}
