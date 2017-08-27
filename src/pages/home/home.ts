import { Component, ViewChild } from '@angular/core';
import { ModalController, IonicPage, MenuController } from 'ionic-angular';
import { Map } from '../../components/map/map'
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map') map: Map;
  constructor(
              public _modal: ModalController,
              public _menuCtrl: MenuController) {
            
  }

  
  public openPost(){
    let modal = this._modal.create("PostPage");
    modal.onDidDismiss(()=>{
      this.findMyLocation();
    })
    modal.present();
  }

  public openMenu(){
    this._menuCtrl.enable((this._menuCtrl.isEnabled)?true:true);
    this._menuCtrl.open();
  }

  public findMyLocation(){
    this.map.loadGoogleMap();
  }

  ionViewDidLeave(){
    if(this.map._alert){
      this.map._alert.dismiss();
    }
  }
}
