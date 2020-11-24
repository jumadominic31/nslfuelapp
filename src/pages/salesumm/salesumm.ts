import { Component } from '@angular/core';
import { MenuController, AlertController, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import { GlobalsProvider } from './../../providers/globals/globals';
import { PrinterProvider } from './../../providers/printer/printer';
import { commands } from './../../providers/printer/printer-commands';
import EscPosEncoder from 'esc-pos-encoder-ionic';
import { MakesalePage } from '../makesale/makesale';

@Component({
  selector: 'page-salesumm',
  templateUrl: 'salesumm.html',
})

export class SalesummPage {

  receipt: any;
  bprintData: any;
  constructor(public globals: GlobalsProvider, public menuCtrl: MenuController, public navCtrl: NavController, public navParams: NavParams, private printer: PrinterProvider, private alertCtrl: AlertController, private loadCtrl: LoadingController, private toastCtrl: ToastController) {
    this.menuCtrl.enable(true, 'myMenu');
    this.bprintData = navParams.get('saleOutput');
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad BooksummPage');
  }

  gotoSale() {
    this.navCtrl.setRoot(MakesalePage);
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

  prepareToPrint(data) {
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
      .text('SALES RECEIPT')
      .newline()
      .text(commands.HORIZONTAL_LINE.HR3_58MM)
      .text('Date:        ' + printDate)
      .newline()
      .text('Ticket No:   ' + data.receiptno)
      .newline()
      .text('Vehicle Reg: ' + data.vehregno)
      .newline()
      .text('Fuel Type:   ' + data.fueltype)
      .newline()
      .text('Payment Mode: ' + data.paymethod)
      .newline()
      .text('Amount:      ' + data.amount)
      .newline()
      .text('Volume:      ' + data.volume + 'l')
      .newline()
      .newline()
      .text('Booked by:   ' + username)
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
