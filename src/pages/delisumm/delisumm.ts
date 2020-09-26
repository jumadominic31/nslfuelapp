import { Component } from '@angular/core';
import { AlertController, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import { PrinterProvider } from './../../providers/printer/printer';
import { commands } from './../../providers/printer/printer-commands';
import EscPosEncoder from 'esc-pos-encoder-ionic';

import { DeliveryPage } from './../delivery/delivery';

@Component({
  selector: 'page-delisumm',
  templateUrl: 'delisumm.html',
})
export class DelisummPage {

  receipt: any;
  dprintData: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private printer: PrinterProvider, private alertCtrl: AlertController, private loadCtrl: LoadingController, private toastCtrl: ToastController) {
    this.dprintData = navParams.get('dinputData');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DelisummPage');
  }

  gotoDelivery() {
    this.navCtrl.setRoot(DeliveryPage);
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
    // u can remove this when generate the receipt using another method
    if (!data.from) {
      data.from = 'Nairobi';
    }
    let company = "Nucleur Investments Ltd";
    let addr = "Nairobi";
    let today = new Date();
    let printDate = today.toISOString().split('T')[0];
    const encoder = new EscPosEncoder();
    const result = encoder.initialize();

    result
      .codepage('cp936')
      .align('center')
      .raw(commands.TEXT_FORMAT.TXT_4SQUARE)
      .line(company)
      .newline()
      .raw(commands.TEXT_FORMAT.TXT_NORMAL)
      .line(addr)
      .newline()
      .text(commands.HORIZONTAL_LINE.HR_58MM)
      .align('left')
      .text('DELIVERY RECEIPT')
      .newline()
      .text(commands.HORIZONTAL_LINE.HR3_58MM)
      .text('Date:        ' + printDate)
      .newline()
      .text('Delivery No: ' + data.deliverynum)
      .newline()
      .text('Client Name: ' + data.ownername)
      .newline()
      .text('Vehicle:     ' + data.vehicle)
      .newline()
      .text('From:        ' + data.from)
      .newline()
      .text('To:          ' + data.to)
      .newline()
      .text('Passengers:  ' + data.numpass)
      .newline()
      .text(commands.HORIZONTAL_LINE.HR3_58MM)
      .text('Payment Details')
      .newline()
      .text(commands.HORIZONTAL_LINE.HR3_58MM)
      .text('Gross Amt:   ' + data.collamt)
      .newline()
      .text(commands.HORIZONTAL_LINE.HR3_58MM)
      .text('Svc Charge:  ' + data.svcch)
      .newline()
      .text('Others Tot:  ' + data.other)
      .newline()
      .text(commands.HORIZONTAL_LINE.HR3_58MM)
      .text('Net Amt:     ' + data.netamt)
      .newline()
      .text(commands.HORIZONTAL_LINE.HR3_58MM)
      .newline()
      .newline()
      .text('Booked by:   ' + data.username)
      .newline()
      .newline()
      .align('center')
      .text('Terms and Conditions Apply')
      .newline()
      .text('info@nucleurinvestments.com')
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
