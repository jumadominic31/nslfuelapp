import { Component } from '@angular/core';
import { AlertController, LoadingController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { PrinterProvider } from './../../providers/printer/printer';
import { commands } from './../../providers/printer/printer-commands';
import EscPosEncoder from 'esc-pos-encoder-ionic';

import { BooksummPage } from './../booksumm/booksumm';

@Component({
  selector: 'page-booking',
  templateUrl: 'booking.html',
})
export class BookingPage {

  binputData: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, private printer: PrinterProvider, private alertCtrl: AlertController, private loadCtrl: LoadingController, private toastCtrl: ToastController,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookingPage');
  }

  confirmBooking(binputData) {
    this.navCtrl.push(BooksummPage, {binputData : binputData});
    console.log(JSON.stringify(binputData));
  }

}
