import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HomePage } from '../pages/home/home';
import { BookingPage } from './../pages/booking/booking';
import { BooksummPage } from './../pages/booksumm/booksumm';
import { DeliveryPage } from './../pages/delivery/delivery';
import { DelisummPage } from './../pages/delisumm/delisumm';
import { LoginPage } from './../pages/login/login';
import { PrinterProvider } from './../providers/printer/printer';
import { MyApp } from './app.component';
import { NucltmsProvider } from '../providers/nucltms/nucltms';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    BookingPage,
    BooksummPage,
    DeliveryPage,
    DelisummPage
  ],
  imports: [
 BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    BookingPage,
    BooksummPage,
    DeliveryPage,
    DelisummPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BluetoothSerial,
    PrinterProvider,
    NucltmsProvider
  ]
})
export class AppModule {}
