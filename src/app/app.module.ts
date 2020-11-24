import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { IonicSelectableModule } from 'ionic-selectable';

import { LoginPage } from './../pages/login/login';
import { MakesalePage } from './../pages/makesale/makesale';
import { SalesummPage } from './../pages/salesumm/salesumm';
import { ShiftsummPage } from './../pages/shiftsumm/shiftsumm';
import { PricingPage } from './../pages/pricing/pricing';
import { ChpasswordPage } from './../pages/chpassword/chpassword';

import { PrinterProvider } from './../providers/printer/printer';
import { MyApp } from './app.component';
import { NucltmsProvider } from '../providers/nucltms/nucltms';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { FuelappfnProvider } from '../providers/fuelappfn/fuelappfn';
import { GlobalsProvider } from '../providers/globals/globals';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    MakesalePage,
    SalesummPage,
    ShiftsummPage,
    PricingPage,
    ChpasswordPage
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
    LoginPage,
    MakesalePage,
    SalesummPage,
    ShiftsummPage,
    PricingPage,
    ChpasswordPage
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
