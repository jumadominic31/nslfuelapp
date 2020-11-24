import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Loading, LoadingController } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FuelappfnProvider } from './../../providers/fuelappfn/fuelappfn';

import { MakesalePage } from './../makesale/makesale';
import { LoginPage } from './../login/login';

// @IonicPage()
@Component({
  selector: 'page-chpassword',
  templateUrl: 'chpassword.html',
})
export class ChpasswordPage {

  password = {curr_pass: '', new_pass1: '', new_pass2: ''};
  passform: FormGroup;
  loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private fuelapp: FuelappfnProvider, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ChpasswordPage');
  }

  confirmChange(data) {
    let alert = this.alertCtrl.create({
      title: 'Confirm',
      message: 'Please confirm you want to change your password',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.chpassword(data);
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

  ngOnInit() {
    this.passform = new FormGroup({
      curr_pass: new FormControl('', [Validators.required]),
      new_pass1: new FormControl('', [Validators.required]),
      new_pass2: new FormControl('', [Validators.required])
    });
  }

  chpassword(data){
    if (data.new_pass1 != data.new_pass2){
      let alert = this.alertCtrl.create({
        title: 'Mismatch of New Passwords',
        message: 'The 2 new passwords do not match. Please enter again.',
        buttons: ['Dismiss']
      });
      alert.present();
    } 
    else {
      this.showLoading();
      this.fuelapp.postchPassword(this.password).then(data=> {
        if (data){
          let output: any = data;
          if (output.status == "success") {
            this.showSuccess();
          }
          else if (output.status == 'failed') {
            this.showError();
          }
        }
        else {
          this.showError();
        }
      },
      error => {
        this.showError();
      });
    }
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showSuccess() {
    this.loading.dismiss();
 
    let alert = this.alertCtrl.create({
      title: 'Password Updated',
      message: 'Password updated successfully.\n Please login again',
      buttons: ['Dismiss']
    });
    alert.present();
    this.navCtrl.setRoot(LoginPage);
  }
 
  showError() {
    this.loading.dismiss();
 
    let alert = this.alertCtrl.create({
      title: 'Error',
      message: 'Error changing password. Please check the current password and try again',
      buttons: ['Dismiss']
    });
    alert.present();
  }
 
  gotohomepage() {
    this.navCtrl.setRoot(MakesalePage);
  }

}
