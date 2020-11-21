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
  saleform: FormGroup;
  rates = {};
  stations = [];
  station: any;


  constructor(public globals: GlobalsProvider, public menuCtrl: MenuController, public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private auth: AuthServiceProvider, private storage: Storage, private fuelapp: FuelappfnProvider, public loadingCtrl: LoadingController)  {
    this.menuCtrl.enable(true, 'myMenu');
    this.username = globals.username;
    this.userid = globals.userdetails[0].id;
    this.username = globals.username;
    this.office_name = globals.userdetails[0].station;
    this.vehicles = globals.vehicles;
    this.pumps = globals.pumpdetails;
    this.rates = globals.rates;
    this.stations = globals.stations;

    // this.storage.get('userDetails').then(data => {
    //   if (data){
    //     // this.userid = data[0].id;
    //     // this.username = 'Peter';
    //   }
    // });

    // this.vehicles = ["KAC828E","KBB741X","KBK101Q","KAN390A","KAP388B","KAR573A","KAR951T","KAS412C","KAL031E","KAM032Z","KAM395X","KAP892N","KAR015P","KAR017P","KAV133Y","KBC554Y","KBC906G","KBG418A","KBG731F","KBG906G","KBJ552Q","KBK526G","KBK547R","KBU534Y","KBU724Y","KBV849P","KBW538K","KBX073V","KBY052B","KBY288G","KBZ665T","KBZ860Q","KCD379D","KXF990","KYF389","KZM495","KBF811H","KBP350A","KBR230E","KBT754R","KBZ113K","KCJ076S","KCS336H","KCA235C","KAG449E","KAJ007Z","KAN374P","KAR447A","KAY287B","KBJ703D","KBZ819W","KBC334D","KBU384P","KCE295W","KCF284H","KCF812E","KBW269P","KBZ753A","KCC174L","KCG492C","KBK234C","KBP674F","KBV314E","KBX533X","KCA289U","KCF803W","KCJ825Z","KCL533M","KZE876","KBM423Q","KBT440F","KCE279B","KAT529M","KXD850","KAW096B","KCB193Z","KCG012Y","KAQ514V","KAU339H","KBW145X","kbx593U","KBY226E","KCF397W","KBH221J","KBK273P","KBM057S","KCM184E","KCP379Q","KBH974L","KBL668H","KCF367Q","KCN901B","KBM204N","KBR101T","KBS789V","KBU645G","KBX236N","KBZ780M","KCC541T","KCC682P","KAA570T","KAG237N","KAY114Z","KAU758E","KAY093B","KBA340K","KAG303Z","KBD573F","KBN826M","KBT337A","KBY366K","KBY870N","KAY856F","KBA286F","KBP934N","KBT437C","KAN312X","KAP519Y","KAX751G","KBC559R","KBL287M","KBL425E","KBL426E","KBX409W","KCH047","KCL052L","KBV419T","KAU502Q","KAV506B","KAZ151J","KBA503P","KCD870N","KBW941Q","KAB900C","KAC206D","KBQ150Q","KBZ526W","KCJ415J","KCJ915D","KBC532S","KBJ654S","KBJ681H","KBR553J","KCH014J","KBD658Q","KBR825N","KBR827N","KBJ425X","KBW563W","KCC644P","KBK290V","KCK726M","KAV063C","KCD630C","KCD863S","KCE669J","KAP962S","KBZ026J","KCF815L","KCQ544R","KAX912Z","KAZ233E","KBF052W","KBM961Z","KBR227F","KBM735J","KAN051M","KAV328H","KAW022Y","KAW081X","KBL734A","KBM098J","KBN486U","KBY262R","KBR597Z","KCD260E","KAW926E","KUE259","KAZ747J","KBA682F","KCL112G","KBR635W","KCD966W","KBD472F","KBZ954Q","KAP264J","KBA602P","KBX069M","KCF552Q","KAX787R","KBB501","KBB874F","KBD931D","KBG950E","KBH041N","KBN869L","KAU369T","KBC474R","KBC887M","KBL746x","KCF347C","KCG164D","KCJ295S","KAW281M","KBK087F","KAW137C","KBM403Y","KBP407N","KBB221H","KCC113H","KBN644P","KAD239T","KAP734A","KAR474T","KAE610C","KAU346V","KXR739","KAJ179N","KBC142D","KBH283J","KBK017B","KBL860C","KBQ279S","KBR253B","KCJ324U","KCK454J","KCM207N","KCQ659K","KCQ813C","KCA940B","KCQ758G","KBD064Q","KBC770N","KAZ459G","KAZ921V","KBH288V","KBL241Q","KBU854V","KBV466D","KCA548T","KCC296S","KCD755C","KCM271Y","KZV288","KCD755C","KAZ513V","KBJ466W","KAU503F","KBH128W","KBT505G","KBX736Y","KBG182L","KBH056J","KAS475H","KAT054B","KBB924M","KCG165Q","KBE482P","KAX784D","KCD866L","KAE548F","KAE643R","KAG909F","KAV275F","KAV305W","KBL972B","KBL973B","KCE620C","KCM601F","KCQ190M","KCS255W","KZA583","KBL551H","KBG269F","KBJ182C","KBN092R","KBZ390T","KBA169F","KBJ429X","KBZ705H","KAQ251T","KBN477U","KBB936R","KBU318Z","KAX543V","KCC249A","KAP229E","KBN547K","KBA894F","KBU354d","KAS561P","KAU160S","KBH227W","KAU387B","KBE361B","KCG659K","KAX761R","KAZ965L","KBN641A","KBX543Y","KCJ792V","KAY845A","KBU986K","KBM445A","KCA517T","KCU563A","KAV835Y","KAZ895F","KBA476B","KBA804Y","KBW141W","KBY090G","KCB996K","KCD192R","KCG998Z","KAZ239Q","KCC302E","KCF776W","KCH362D","KCN912P","KCP665f","KCT281T","KAN010D","KAW568K","KBC003Y","KBK653Y","KAK818D","KBD458T","KBA476Z","KBD615N","KCF589K","KBB197R","KCH283W","KCH624J","KBZ955X","KCB429A","KCG706L","KBD466W","KBV987Y","KBX291Z","KBY720K","KBZ777Y","KCG389N","KCH907B","KCN928Z","KCP390M","KCR006N","KCS466A","KAN125W","KBA559G","KBM641L","KBN641L","KBV208X","KAA629W","KAS869Y","KAV543V","KBA331A","KBB819T","KBD147W","KBE480V","KBP305V","KBR769R","KBS620S","KBS940J","KCC330T","KCH579","KCQ047","KBW753","KCC887K","KCK387R","KBP196J","KCB758D","KCH640E","KCM042P","KBX291P","KAZ477K","KBL864Z","KBN487Y","KBQ822S","KBV330J","KAZ810T","KCK766P","KBB148L","KCH998L","KBJ860L","KBL860J","KBL870J","KCA701Z","KCE541W","KCE941Z","KCQ745J","KWZ183","KYJ587","KAZ221J","KCK528W","KBF724M","KAP831Q","KAX430R","KAZ542S","KAJ273P","KBJ891R","KBR072R","KBW713B","KCA765X","KCA986C","KCB007Z","KCC344C","KCC445L","KCD029X","KCD031X","KCE192J","KCE470k","KCE519L","KCF086C","KCF550U","KCF765D","KCG191W","KCL249V","KCN713E","KBU362L","KCR814W","KCS840E","KAV553W","KAE887S","KBA378G","KBK871X","KBN047C","KBX032T","KCC816N","KCP805M","KAN149V","KCF849G","KBN615C","KBD483U","KBJ180Q","KBL339Z","KAA185P","KBW270C","KCE445N","KAJ213W","KCG756B","KBL392B","KBN086T","KBN211N","KBJ260Q","KBK342V","KBM104C","KAE508D","KAW061H","KCN624","KCG547X","KBP105N","KBP765D","KAY265B","KAX205Y","KAX215Y","KAY654L","KCC722G","KCB829U","KCD644L","KCF695N","KBQ099P","KCK591E","KBG853M","KBV246N","KCJ211Q","KCM110A","KCP229G","KBC455F","KBM424X","KZV554","KCU664B","KCU689B","KCU342P","KBX543X","KCF277G","KCF817H","KBW733J","KCH796R","KCE843H","KAX848W","KBW753W","KAN134K","KCW117H","KCV927H","KCV945H","KBZ908Z","KCP501A","KCP034F","KCG224S","KBQ670U","KCS136B","KCV924T","KCW553Q","KCS473T","KBU318Z","KCD584W","KAX350W","KPU625W","KBT623H","KAV151N","KBX968D","KCE804F","KCR542G","KCM117H","KAX486W","KCS316F","KCP535S","KBK259W","KCW881G","KAU031D","KAN669H","KXR604","KCD441K","KCW015W","KCV573J","KCR935F","KCH234E","KBX234N","KBY707U","KCV790S","KCU421L","KBY090G","KBY093M","KAL895F","KCS948Q","KAS498B","KSF970","KAN667H","KBB605T","KCW388C","KCW690X","KCF911S","KCE267Z","KBW546X","KBZ792S","KCU562A","KCD749Y","KAX113S","KCB336G","KCU680H","KBJ901W","KCF787G","KBP865B","KBX651Y","KAZ783Q","KCH871N","KCX632U","KCX455V","KBH192T","KBK639C","KCJ781W","KCD664L","KBW646E","KCS049D","KCM086A","KCH579R","KCF811G","KBE737R","KAQ202T","KCQ280F","KCF418H","KCU030W","KCM815L","KCW338C","KCY458E","KBZ237E","KCK366F","KCH567V","KBN229P","KBF708B","KBX250P","KBA809Q","KBW093M","KCS675M","KCL107Y","KBZ184B","KBS597X","KAX352T","KAC456J","KHMA136R","KCL877Q","KCE417B","KBS052L","TEST"];

    // this.pumps = [{"id":19,"pumpname":"Petrol_1","fueltype":"Petrol"},{"id":20,"pumpname":"Diesel_1","fueltype":"Diesel"},{"id":21,"pumpname":"Diesel_2","fueltype":"Diesel"},{"id":22,"pumpname":"Kerosene_1","fueltype":"Kerosene"}];

    // this.vehicles = navParams.get('vehicles');
    // this.pumps = navParams.get('pumpdetails');
    // if (this.vehicles == null || this.pumps == null){
    //   this.storage.get('vehicles').then(data => {
    //     if (data){
    //       this.vehicles =  data;
    //       console.log(this.vehicles);
    //     }
    //   });
    //   this.storage.get('pumpdetails').then(data => {
    //     if (data){
    //       this.pumps = data;
    //       console.log(this.pumps);
    //     }
    //   });
    // }
  }

  selStation(data){
    console.log(data);
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
      message: 'Receipt number: ' + data.receiptno + '\n Sale Amount: ' + data.amount,
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
  }

}
