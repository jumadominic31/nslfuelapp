import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-delisumm',
  templateUrl: 'delisumm.html',
})
export class DelisummPage {

  dprintData: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.dprintData = navParams.get('dinputData');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DelisummPage');
  }

}
