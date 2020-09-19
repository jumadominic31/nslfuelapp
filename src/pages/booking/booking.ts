import { Component } from '@angular/core';
import { AlertController, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PrinterProvider } from './../../providers/printer/printer';

import { BooksummPage } from './../booksumm/booksumm';

@Component({
  selector: 'page-booking',
  templateUrl: 'booking.html',
})
export class BookingPage {

  bookingform: FormGroup;
  binputData: any = {"from" : "", "to" : "", "date" : "", "vehicle" : "", "fare" : "", "name" : ""};

  constructor(public navCtrl: NavController, public navParams: NavParams, private printer: PrinterProvider, private alertCtrl: AlertController, private loadCtrl: LoadingController, private toastCtrl: ToastController,) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookingPage');
    
  }

  ngOnInit() {
    this.bookingform = new FormGroup({
      from: new FormControl('', [Validators.required]),
      to: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [Validators.required]),
      vehicle: new FormControl(null, [Validators.required]),
      pass_name: new FormControl('', [Validators.required]),
      fare: new FormControl('', [Validators.required])
    });
  }

  confirmBooking(binputData) {
    this.navCtrl.push(BooksummPage, {binputData : binputData});
    console.log(JSON.stringify(binputData));
  }

}
