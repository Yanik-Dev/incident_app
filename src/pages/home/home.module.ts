import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';

//components imports
import { Map } from '../../components/map/map';

@NgModule({
  declarations: [
    HomePage,
    Map,

  ],
  imports: [
    IonicPageModule.forChild(HomePage),
  ],
  exports: [
    HomePage
  ]
})
export class NotificationPageModule {}
