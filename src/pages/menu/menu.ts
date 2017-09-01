import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ModalController, MenuController, Events, Nav } from 'ionic-angular';

import { ListPage } from '../list/list';
import { UserService } from "../../providers/user.service";
import { Network } from "@ionic-native/Network";
import { NetworkService } from "../../providers/network-service";


@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  @ViewChild(Nav) nav: Nav;
  
  rootPage: any = "";
  _user:any;
  image: any = "./assets/icon/profile.png"
  pages: Array<{title: string, component: any, icon:any}>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _event :Events,
              private _userService: UserService, 
              private _modalCntrl: ModalController,
              private _networkService: Network,
              private _onlineService: NetworkService) {

     // used for an example of ngFor and navigation
     this.pages = [
      { title: 'Home', component: "HomePage", icon: "home" },
      { title: 'My Posts', component: ListPage, icon: "list" },
      { title: 'Profile', component: "SettingsPage", icon: "settings" },
    ];
    
    this._userService.getUser().then((res)=>{
       if(res != null){
        this._user = JSON.parse(res);
         this.rootPage = "HomePage"

       }else{
         this.rootPage = "LoginPage"
       }
       
    }).catch(err=>console.log(err))
    this._userService.getProfileImage().then((res)=>{
      if(res!=null){
          this.image = res;
      }
    })

    this._networkService.onConnect().subscribe(data => {
      this._onlineService.isOnline().then(res=>{
         if(res){
           this.publishConnectivity('connected')
         }else{
            this.publishConnectivity('disconnected')
         }
      })
    }, error => console.error(error));
  
    this._networkService.onDisconnect().subscribe(data => {
       this.publishConnectivity('disconnected')
    }, error => console.error(error));
  }

    /**
   * publish connection changes to the entire app on event "connectivity-change"
   * @param changes connection status
   */
  public publishConnectivity(changes){
    this._event.publish("connectivity-change", changes)
  }

  ionViewDidLoad(){
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  public logout(){
    this._userService.clearUser();
    this.nav.push("LoginPage")
  }

  public showSettings(){
      let modal = this._modalCntrl.create("");
      modal.present();
  }

}
