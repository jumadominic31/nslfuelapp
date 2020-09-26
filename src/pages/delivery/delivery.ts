import { Component } from '@angular/core';
import { AlertController, Loading, LoadingController, NavController, NavParams } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage' ;
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import { DelisummPage } from './../delisumm/delisumm';
import { NucltmsProvider } from './../../providers/nucltms/nucltms';

@Component({
  selector: 'page-delivery',
  templateUrl: 'delivery.html',
})
export class DeliveryPage {
  loading: Loading;
  username = '';
  office_name = '';
  deliveryOutput: any = {};

  dinputData: any = {from : "", to : "", vehicle : "", numpass : "", collamt : "", svcch : "", loan : "", ins : "", other : "", userid : "", deliverynum : "", ownername : "", totdeduct : "", netamt : ""};
  cities: any = [];
  vehicles: any = [];
  deliveryform: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public nucltms: NucltmsProvider, public storage: Storage, public auth: AuthServiceProvider, private alertCtrl: AlertController, public loadingCtrl: LoadingController) {

      this.storage.get('userDetails').then(data => {
        this.dinputData.from = data.office_name;
        this.dinputData.userid = data.userid;
        this.dinputData.username = data.username;
      })
      this.storage.get('cities').then(data => {
        this.cities = data;
        // this.citiesInitial = data;
      });
      this.storage.get('vehicles').then(data => {
        this.vehicles =  data;
      });
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad DeliveryPage');
  }

  ngOnInit() {
    this.deliveryform = new FormGroup({
      from: new FormControl('', [Validators.required]),
      to: new FormControl(null, [Validators.required]),
      vehicle: new FormControl(null, [Validators.required]),
      numpass: new FormControl('', [Validators.required]),
      collamt: new FormControl('', [Validators.required]),
      svcch: new FormControl('', [Validators.required]),
      loan: new FormControl('', null),
      ins: new FormControl('', null),
      other: new FormControl('', null)
    });
  }

  confirmDelivery(dinputData) {
    this.showLoading();
    // this.showSuccess(dinputData);
    this.nucltms.postDelivery(this.dinputData).then(data => {
      if (data) {        
        console.log(JSON.stringify(data));
        this.deliveryOutput = data;
        this.dinputData.deliverynum = this.deliveryOutput.deliverynum;
        this.dinputData.ownername = this.deliveryOutput.ownername;
        this.dinputData.totdeduct = this.deliveryOutput.totdeduct;
        this.dinputData.netamt = this.deliveryOutput.netamt;
        this.showSuccess(this.deliveryOutput);
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
      title: 'Delivery Booked',
      message: 'Delivery number: ' + data.deliverynum,
      buttons: [
        {
          text: 'Print',
          handler: () => {
            this.navCtrl.setRoot(DelisummPage, {dinputData : this.dinputData});
          }
        },
        {
          text: 'Another Delivery',
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
      title: 'Delivery Failed',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

  resetVals() {
    this.dinputData.vehicle = "";
    this.dinputData.svcch = "";
    this.dinputData.other = "";
    this.dinputData.numpass = "";
    this.dinputData.collamt = "";
    this.dinputData.loan = "";
    this.dinputData.ins = "";
    this.dinputData.to = "";
  }

}
