import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UploadService } from '../providers/upload.service';
import { UserService } from '../providers/user.service';
import { IncidentService } from '../providers/incident.service';

//ANGULAR FILE IMPORTS
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

//IONIC NATIVE IMPORT
import { Camera } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { CameraService } from '../providers/camera.service';
import { IonicStorageModule } from '@ionic/storage';
import { Network } from '@ionic-native/Network';
import { NetworkService } from "../providers/network-service";
import { HttpModule } from "@angular/http";
import { PostCard } from "../components/post-card/post-card";

export const firebaseConfig = {
  apiKey: "AIzaSyAgYN8XhaoxeYBdd7xu6M6UTM7CoxDQq5c",
  authDomain: "incidentz-bedc1.firebaseapp.com",
  databaseURL: "https://incidentz-bedc1.firebaseio.com",
  projectId: "incidentz-bedc1",
  storageBucket: "incidentz-bedc1.appspot.com",
  messagingSenderId: "564161777786"
};

@NgModule({
  declarations: [
    MyApp,
    ListPage,
    PostCard
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListPage,
    PostCard
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UploadService,
    UserService,
    IncidentService,
    Camera,
    PhotoViewer,
    Geolocation,
    CameraService,
    Network,
    NetworkService
  ]
})
export class AppModule {}


