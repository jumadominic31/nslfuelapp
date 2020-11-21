import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { IonicSelectableModule } from 'ionic-selectable';

import { HomePage } from '../pages/home/home';
import { BookingPage } from './../pages/booking/booking';
import { BooksummPage } from './../pages/booksumm/booksumm';
import { DeliveryPage } from './../pages/delivery/delivery';
import { DelisummPage } from './../pages/delisumm/delisumm';
import { LoginPage } from './../pages/login/login';
import { MakesalePage } from './../pages/makesale/makesale';
import { SalesummPage } from './../pages/salesumm/salesumm';

import { PrinterProvider } from './../providers/printer/printer';
import { MyApp } from './app.component';
import { NucltmsProvider } from '../providers/nucltms/nucltms';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { FuelappfnProvider } from '../providers/fuelappfn/fuelappfn';
import { GlobalsProvider } from '../providers/globals/globals';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    BookingPage,
    BooksummPage,
    DeliveryPage,
    DelisummPage,
    MakesalePage,
    SalesummPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    IonicSelectableModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    BookingPage,
    BooksummPage,
    DeliveryPage,
    DelisummPage,
    MakesalePage,
    SalesummPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BluetoothSerial,
    PrinterProvider,
    NucltmsProvider,
    AuthServiceProvider,
    FuelappfnProvider,
    GlobalsProvider
  ]
})
export class AppModule {}
