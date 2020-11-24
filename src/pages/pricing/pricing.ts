import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GlobalsProvider } from './../../providers/globals/globals';

import { MakesalePage } from './../makesale/makesale';

// @IonicPage()
@Component({
  selector: 'page-pricing',
  templateUrl: 'pricing.html',
})
export class PricingPage {

  rate_petrol : number = 0;
  rate_diesel : number = 0;
  rate_kerosene : number = 0;
  today = new Date();
  curr_date = this.today.toISOString().split('T')[0];

  constructor(public navCtrl: NavController, public navParams: NavParams, public globals: GlobalsProvider) {
    this.rate_petrol = globals.rate_petrol;
    this.rate_diesel = globals.rate_diesel;
    this.rate_kerosene = globals.rate_kerosene;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad PricingPage');
  }

  gotohomepage() {
    this.navCtrl.setRoot(MakesalePage);
  }

}
