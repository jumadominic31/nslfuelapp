import { Component } from '@angular/core';
import { MenuController, AlertController, Loading, LoadingController, NavController, NavParams } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FuelappfnProvider } from './../../providers/fuelappfn/fuelappfn';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { GlobalsProvider } from './../../providers/globals/globals';
import { Storage } from '@ionic/storage' ;
import { IonicSelectableComponent } from 'ionic-selectable';

import { LoginPage } from './../login/login';
import { SalesummPage } from './../salesumm/salesumm';

@Component({
  selector: 'page-makesale',
  templateUrl: 'makesale.html',
})
export class MakesalePage {

  loading: Loading;
  userid        = '';
  username      = '';
  office_name   = '';
  vehicles: any = [];
  saleOutput: any = {};
  saleInput     = {vehicle: '', amount: null, fueltype: '', pmethod: '', pumpid: '', volume: 0, sellprice: 0};
  fueltype      = ["Diesel", "Petrol", "Kerosene"];
  payment       = ["Cash", "MPesa", "Credit"];
  pumps: any;
  listpumps: any;
  listpumps1: any;
  saleform: FormGroup;
  rates = {};
  stations = [];
  station: any;
  pumpisDisabled: boolean = true;
  isDisabled: boolean = true;
  toggleDisabled: boolean = true;


  constructor(public globals: GlobalsProvider, public menuCtrl: MenuController, public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private auth: AuthServiceProvider, private storage: Storage, private fuelapp: FuelappfnProvider, public loadingCtrl: LoadingController)  {
    this.menuCtrl.enable(true, 'myMenu');
    this.username = globals.username;
    this.userid = globals.userdetails[0].id;
    this.username = globals.username;
    this.office_name = globals.userdetails[0].station;
    this.vehicles = globals.vehicles;
    this.pumps = globals.pumpdetails;
    this.listpumps = this.pumps;
    this.rates = globals.rates;
    this.stations = globals.stations;
  }

  selStation(data){
    this.listpumps1 = this.pumps.filter(function(pmp){
      return pmp.stationid == data; 
    });
    this.isDisabled = false;
  }

  selFuel(data){
    this.listpumps = this.listpumps1.filter(function(pmp){
      return pmp.fueltype == data; 
    });
    this.pumpisDisabled = false;
  }

  portChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    // console.log('port:', event.value);
  }

  public logout() {
    this.storage.remove('userdetails');
    this.storage.remove('token');
    this.storage.remove('username');
    this.auth.logout().subscribe(succ => {
      this.navCtrl.setRoot(LoginPage)
    });
  }

  confirmSale(data) {
    let alert = this.alertCtrl.create({
      title: 'Confirm',
      message: 'Please confirm sale',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.postSale();
          }
        },
        {
          text: 'Cancel',
          handler: () => {
            return;
          }
        }
      ]
    });
    alert.present();
  }

  postSale(){
    if (this.saleInput.fueltype == "Petrol"){
      this.saleInput.sellprice = this.globals.rate_petrol;
      this.saleInput.volume = Math.round(this.saleInput.amount / this.saleInput.sellprice*100)/100;
    }
    else if (this.saleInput.fueltype == "Diesel"){
      this.saleInput.sellprice = this.globals.rate_diesel;
      this.saleInput.volume = Math.round(this.saleInput.amount / this.saleInput.sellprice*100)/100;
    }
    else if (this.saleInput.fueltype == "Kerosene"){
      this.saleInput.sellprice = this.globals.rate_kerosene;
      this.saleInput.volume = Math.round(this.saleInput.amount / this.saleInput.sellprice*100)/100;
    }
    this.showLoading();
    setTimeout(() => {
      this.fuelapp.postSale(this.saleInput).then(data=> {
        if (data){
          let output: any = data;
          if (output.status = "success") {
            this.saleOutput = output.txn;
            //this.binputData.ticket = this.bookOutput.ticket;
            this.showSuccess(this.saleOutput);
          }
        }
        else {
          this.showError("Try Booking Again...");
        }
      },
      error => {
        this.showError(error);
      });
    }, 2000);
  }

  ionViewDidLoad() {
    
  }

  ngOnInit() {
    this.saleform = new FormGroup({
      station: new FormControl('', [Validators.required]),
      vehicle: new FormControl('', [Validators.required]),
      fueltype: new FormControl(null, [Validators.required]),
      pmethod: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [Validators.required]),
      pumpid: new FormControl('', [Validators.required])
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
      title: 'Sale Complete',
      message: 'Receipt no: ' + data.receiptno + '\n Sale Amt: ' + data.amount + '\n Volume: ' + data.volume + 'l',
      buttons: [
        {
          text: 'Print',
          handler: () => {
           this.navCtrl.setRoot(SalesummPage, {saleOutput : this.saleOutput});
          }
        },
        {
          text: 'Another Sale',
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
      title: 'Sale Failed',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

  resetVals() {
    this.saleInput.amount = null;
    this.saleInput.fueltype = null;
    this.saleInput.pmethod = null;
    this.saleInput.pumpid = null;
    this.saleInput.vehicle = null;
    this.pumpisDisabled = true;
  }

}
