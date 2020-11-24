import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading, MenuController, AlertController, ToastController } from 'ionic-angular';
import { FuelappfnProvider } from './../../providers/fuelappfn/fuelappfn';
import { GlobalsProvider } from './../../providers/globals/globals';
import { PrinterProvider } from './../../providers/printer/printer';
import { commands } from './../../providers/printer/printer-commands';
import EscPosEncoder from 'esc-pos-encoder-ionic';
import { MakesalePage } from './../makesale/makesale';

// @IonicPage()
@Component({
  selector: 'page-shiftsumm',
  templateUrl: 'shiftsumm.html',
})
export class ShiftsummPage {
  loading: Loading;
  receipt: any;
  shiftSales = {'summ_diesel': 0, 'summ_petrol': 0, 'summ_kerosene': 0, 'summ_cash': 0, 'summ_credit': 0, 'summ_mpesa': 0, 'summ_amt': 0, 'summ_volume': 0};

  constructor(public globals: GlobalsProvider, public navCtrl: NavController, public navParams: NavParams, private fuelapp: FuelappfnProvider, private loadingCtrl: LoadingController, public menuCtrl: MenuController, private printer: PrinterProvider, private alertCtrl: AlertController, private loadCtrl: LoadingController, private toastCtrl: ToastController) {
    this.getSummary();
  }

  ngOnInit() {
    
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ShiftsummPage');
  }

  gotohomepage() {
    this.navCtrl.setRoot(MakesalePage);
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
      // dismissOnPageChange: true
    });
    this.loading.present();
  }

  public getSummary(){
    this.showLoading();
    this.fuelapp.getShiftsales().then(data=> {
      if (data){
        let response: any = data;
        for (let i = 0; i < response.length; i++) {
          let res = response[i];
          if (res.fueltype == 'diesel'){
              this.shiftSales.summ_diesel = this.shiftSales.summ_diesel + Math.round(parseFloat(res.total_vol)*100)/100;

              if (res.paymethod == 'Cash'){
                  this.shiftSales.summ_cash = this.shiftSales.summ_cash + Math.round(parseFloat(res.total_sales)*100)/100;
              } else if (res.paymethod == 'Credit'){
                  this.shiftSales.summ_credit = this.shiftSales.summ_credit + Math.round(parseFloat(res.total_sales)*100)/100;
              } else if (res.paymethod == 'MPesa'){
                 this.shiftSales.summ_mpesa = this.shiftSales.summ_mpesa + Math.round(parseFloat(res.total_sales)*100)/100;
             }

          } else if (res.fueltype == 'petrol'){
              this.shiftSales.summ_petrol = this.shiftSales.summ_petrol + Math.round(parseFloat(res.total_vol)*100)/100;

              if (res.paymethod == 'Cash'){
                  this.shiftSales.summ_cash = this.shiftSales.summ_cash + Math.round(parseFloat(res.total_sales)*100)/100;

              } else if (res.paymethod == 'Credit'){
                  this.shiftSales.summ_credit = this.shiftSales.summ_credit + Math.round(parseFloat(res.total_sales)*100)/100;

              } else if (res.paymethod == 'MPesa'){
                 this.shiftSales.summ_mpesa = this.shiftSales.summ_mpesa + Math.round(parseFloat(res.total_sales)*100)/100;

             }
          } else if (res.fueltype == 'kerosene'){
              this.shiftSales.summ_kerosene = this.shiftSales.summ_kerosene + Math.round(parseFloat(res.total_vol)*100)/100;

              if (res.paymethod == 'Cash'){
                  this.shiftSales.summ_cash = this.shiftSales.summ_cash + Math.round(parseFloat(res.total_sales)*100)/100;

              } else if (res.paymethod == 'Credit'){
                  this.shiftSales.summ_credit = this.shiftSales.summ_credit + Math.round(parseFloat(res.total_sales)*100)/100;

              } else if (res.paymethod == 'MPesa'){
                 this.shiftSales.summ_mpesa = this.shiftSales.summ_mpesa + Math.round(parseFloat(res.total_sales)*100)/100;

             }
          }
        }
        this.shiftSales.summ_amt     = Math.round((this.shiftSales.summ_cash + this.shiftSales.summ_credit+ this.shiftSales.summ_mpesa)*100)/100;
        this.shiftSales.summ_volume  = Math.round((this.shiftSales.summ_petrol + this.shiftSales.summ_diesel + this.shiftSales.summ_kerosene)*100)/100 ;
        this.loading.dismiss();
      }
    },
    error => {
      console.log(error);
    });
  }

  showToast(data) {
    let toast = this.toastCtrl.create({
      duration: 3000,
      message: data,
      position: 'bottom',
    });
    toast.present();
  }

  print(device, data) {
    console.log('Device mac: ', device);
    console.log('Data: ', JSON.stringify(data));
    let load = this.loadCtrl.create({
      content: 'Printing...',
    });
    load.present();
    this.printer.connectBluetooth(device).subscribe(
      (status) => {
        console.log(status);
        this.printer
          .printData(data)
          .then((printStatus) => {
            console.log(printStatus);
            let alert = this.alertCtrl.create({
              title: 'Successful print!',
              buttons: [{
                text: 'Ok',
                handler: () => {
                  load.dismiss();
                  this.printer.disconnectBluetooth();
                },
              }, ],
            });
            alert.present();
          })
          .catch((error) => {
            console.log(error);
            let alert = this.alertCtrl.create({
              title: 'There was an error printing, please try again!',
              buttons: [{
                text: 'Ok',
                handler: () => {
                  load.dismiss();
                  //this.printer.disconnectBluetooth();
                },
              }, ],
            });
            alert.present();
          });
      },
      (error) => {
        console.log(error);
        let alert = this.alertCtrl.create({
          title: 'There was an error connecting to the printer, please try again!',
          buttons: [{
            text: 'Ok',
            handler: () => {
              load.dismiss();
              //this.printer.disconnectBluetooth();
            },
          }, ],
        });
        alert.present();
      },
    );
  }

  printShiftsumm(data) {
    let company_1 = "NAIVASHA";
    let company_2 = "SOUTHLAKE FILLING STATION";
    let addr = "Box 575, Naivasha";
    let tel = "Tel: 0776 172 853";
    let email = "nsls2013@gmail.com";
    let today = new Date();
    let printDate = today.toISOString().split('T')[0];
    let username = this.globals.username;

    const encoder = new EscPosEncoder();
    const result = encoder.initialize();
    
    result
      .codepage('cp936')
      .align('center')
      .raw(commands.TEXT_FORMAT.TXT_4SQUARE)
      .line(company_1)
      .raw(commands.TEXT_FORMAT.TXT_NORMAL)
      .line(company_2)
      .line(addr)
      .line(tel)
      .newline()
      .text(commands.HORIZONTAL_LINE.HR_58MM)
      .align('left')
      .text('SHIFT SALES SUMMARY')
      .newline()
      .text(commands.HORIZONTAL_LINE.HR3_58MM)
      .text('Date:        ' + printDate)
      .newline()
      .text(commands.HORIZONTAL_LINE.HR3_58MM)
      .text('Cash Position')
      .newline()
      .text(commands.HORIZONTAL_LINE.HR3_58MM)
      .newline()
      .text('Cash Amt:    ' + data.summ_cash)
      .newline()
      .text('MPesa Amt:   ' + data.summ_mpesa)
      .newline()
      .text('Credit Amt:  ' + data.summ_credit)
      .newline()
      .text(commands.HORIZONTAL_LINE.HR3_58MM)
      .text('Total Amt:   ' + data.summ_amt)
      .newline()
      .text(commands.HORIZONTAL_LINE.HR_58MM)
      .text('Volumes Sold')
      .newline()
      .text(commands.HORIZONTAL_LINE.HR3_58MM)
      .newline()
      .text('Diesel Vol:  ' + data.summ_diesel + 'l')
      .newline()
      .text('Petrol Vol:  ' + data.summ_petrol + 'l')
      .newline()
      .text('Kerosene Vol:' + data.summ_kerosene + 'l')
      .newline()
      .text(commands.HORIZONTAL_LINE.HR3_58MM)
      .text('Total Vol:   ' + data.summ_volume + 'l')
      .newline()
      .text(commands.HORIZONTAL_LINE.HR_58MM)
      .newline()
      .text('Report for:  ' + username)
      .newline()
      .newline()
      .align('center')
      .text('Terms and Conditions Apply')
      .newline()
      .text(email)
      .newline()
      .newline()
      .newline()


    this.mountAlertBt(result.encode());
  }

  mountAlertBt(data) {
    this.receipt = data;
    let alert = this.alertCtrl.create({
      title: 'Select your printer',
      buttons: [{
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Select printer',
          handler: (device) => {
            if (!device) {
              this.showToast('Select a printer!');
              return false;
            }
            console.log(device);
            this.print(device, this.receipt);
          },
        },
      ],
    });
    this.printer
      .enableBluetooth()
      .then(() => {
        this.printer
          .searchBluetooth()
          .then((devices) => {
            devices.forEach((device) => {
              console.log('Devices: ', JSON.stringify(device));
              alert.addInput({
                name: 'printer',
                value: device.address,
                label: device.name,
                type: 'radio',
              });
            });
            alert.present();
          })
          .catch((error) => {
            console.log(error);
            this.showToast(
              'There was an error connecting the printer, please try again!',
            );
            this.mountAlertBt(this.receipt);
          });
      })
      .catch((error) => {
        console.log(error);
        this.showToast('Error activating bluetooth, please try again!');
        this.mountAlertBt(this.receipt);
      });
  }

}
