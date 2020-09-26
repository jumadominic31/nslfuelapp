import { Component } from '@angular/core';
import { AlertController, Loading, LoadingController, NavController, NavParams } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NucltmsProvider } from './../../providers/nucltms/nucltms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage' ;

import { BooksummPage } from './../booksumm/booksumm';
import { LoginPage } from './../login/login';

@Component({
  selector: 'page-booking',
  templateUrl: 'booking.html',
})
export class BookingPage {
  loading: Loading;
  userid = '';
  username = '';
  office_name = '';
  cities: any = [];
  // citiesInitial: any = [];
  vehicles: any = [];
  bookOutput: any = {};

  bookingform: FormGroup;
  binputData = {from : "", to : "", date : "", vehicle : "", fare : "", name : "", userid : "", ticket : "", username : ""};

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private auth: AuthServiceProvider, private storage: Storage, private nucltms: NucltmsProvider, public loadingCtrl: LoadingController) {
    this.storage.get('userDetails').then(data => {
      this.userid = data.userid;
      this.username = data.username;
      this.office_name = data.office_name;
      this.binputData.from = data.office_name;
      this.binputData.userid = data.userid;
      this.binputData.username = data.username;
    })

    this.storage.get('cities').then(data => {
      this.cities = data;
      // this.citiesInitial = data;
    });
    this.storage.get('vehicles').then(data => {
      this.vehicles =  data;
    });
  }

  public logout() {
    this.storage.remove('cities');
    this.storage.remove('vehicles');
    this.storage.remove('userDetails');
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
      // searchTo: new FormControl('', null)
    });
  }

  // searchTo(searchbar) {
  //   this.cities = this.citiesInitial;

  //   // set q to the value of the searchbar
  //   let q = searchbar.value;

  //   // if the value is an empty string don't filter the items
  //   if (q.trim() == '') {
  //       return;
  //   }

  //   this.cities = this.cities.filter((v) => {
  //       if (v.toLowerCase().indexOf(q.toLowerCase()) > -1) {
  //           return true;
  //       }
  //       return false;
  //   })
  // }

  confirmBooking(binputData) {
    this.showLoading();
    // this.showSuccess(binputData);
    this.nucltms.postBooking(this.binputData).then(data => {
      if (data[0].status = "success") {        
        console.log(JSON.stringify(data));
        this.bookOutput = data[0];
        this.binputData.ticket = this.bookOutput.ticket;
        this.showSuccess(this.bookOutput);
      } else {
        this.showError("Try Booking Again...");
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

  showSuccess(data) {
    this.loading.dismiss();
 
    let alert = this.alertCtrl.create({
      title: 'Ticket Booked',
      message: 'Ticket number: ' + data.ticket,
      buttons: [
        {
          text: 'Print',
          handler: () => {
            this.navCtrl.setRoot(BooksummPage, {binputData : this.binputData});
          }
        },
        {
          text: 'Book Another',
          handler: () => {
            this.resetVals();
          }
        }
      ]
    });
    alert.present();
  }
 
  showError(text) {
    this.loading.dismiss();
 
    let alert = this.alertCtrl.create({
      title: 'Booking Failed',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

  resetVals() {
    this.binputData.to = "";
    this.binputData.date = "";
    this.binputData.vehicle = "";
    this.binputData.fare = "";
    this.binputData.name = "";
  }

}
