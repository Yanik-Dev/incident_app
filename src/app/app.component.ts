import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserService } from "../providers/user.service";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  
  rootPage: any = "";

  constructor(public platform: Platform,
              public statusBar: StatusBar, 
              private _userService: UserService,
              public splashScreen: SplashScreen ) {
    this.initializeApp();
    this._userService.getUser().then((res)=>{
      if(res != null){
        this.rootPage ="MenuPage"
      }else{
        this.rootPage ="LoginPage"
      }
      
    }).catch(err=>console.log(err))
  }



  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      
    });
   
  }

}
