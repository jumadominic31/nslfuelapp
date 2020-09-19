import { Component } from '@angular/core';
import { AlertController, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import { PrinterProvider } from './../../providers/printer/printer';
import { commands } from './../../providers/printer/printer-commands';
import EscPosEncoder from 'esc-pos-encoder-ionic';

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
    let company = "Nucleur Ltd";
    const encoder = new EscPosEncoder();
    const result = encoder.initialize();

    result
      .codepage('cp936')
      .align('center')
      .raw(commands.TEXT_FORMAT.TXT_4SQUARE)
      .line(company)
      .raw(commands.TEXT_FORMAT.TXT_NORMAL)
      .text(commands.HORIZONTAL_LINE.HR_58MM)
      .align('left')
      .text('Vehicle: ' + data.vehicle)
      .newline()
      .text('From:    ' + data.from)
      .newline()
      .text('To:      ' + data.to)
      .newline()
      .text('Date:    ' + data.date)
      .newline()
      .text('Passengers: ' + data.numpass)
      .newline()
      .text('Collected: ' + data.collamt)
      .newline()
      .text('Loan:    ' + data.loan)
      .newline()
      .text('Insurance: ' + data.ins)
      .newline()
      .text('Others:  ' + data.other)
      .newline()
      .text('Balance: ' + data.bal)
      .newline()
      .raw(commands.TEXT_FORMAT.TXT_4SQUARE)
      .newline()
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
