import { Component } from '@angular/core';
import { AlertController, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PrinterProvider } from './../../providers/printer/printer';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage' ;

import { BooksummPage } from './../booksumm/booksumm';
import { LoginPage } from './../login/login';

@Component({
  selector: 'page-booking',
  templateUrl: 'booking.html',
})
export class BookingPage {
  username = '';
  office_name = '';
  cities: any = [];
  vehicles: any = [];

  bookingform: FormGroup;
  binputData: any = {"from" : "", "to" : "", "date" : "", "vehicle" : "", "fare" : "", "name" : ""};

  constructor(public navCtrl: NavController, public navParams: NavParams, private printer: PrinterProvider, private alertCtrl: AlertController, private loadCtrl: LoadingController, private toastCtrl: ToastController,
    private auth: AuthServiceProvider, private storage: Storage) {
    let info = this.auth.getUserInfo();
    this.username = info['username'];
    this.office_name = info['office_name'];
    this.binputData.from = info['office_name'];

    this.storage.get('cities').then(data => {
      this.cities = data;
    });
    this.storage.get('vehicles').then(data => {
      this.vehicles =  data;
    });

  }

  public logout() {
    this.storage.remove('cities');
    this.storage.remove('vehicles');
    this.auth.logout().subscribe(succ => {
      this.navCtrl.setRoot(LoginPage)
    });
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad BookingPage');
    
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
