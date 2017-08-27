import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Slides, LoadingController } from 'ionic-angular';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Geolocation } from '@ionic-native/geolocation';
import { CameraService } from '../../providers/camera.service';
import { UploadService } from '../../providers/upload.service';
import { IncidentService } from '../../providers/incident.service';
import { Incident } from '../../models/incident';
import { UserService } from '../../providers/user.service';

import firebase from 'firebase';
import { User } from "../../models/user";

@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {
  @ViewChild("slides") slides: Slides;
  private _postValue = "POST";
  private _coords = {latitude: 0, longitude: 0};
  private _image: any = '';
  private _incident: Incident;
  private _inputs = {icon:'', comment:''}
  private _user: User;
  private isUploading = false;
  public uploadSubscription: any;

  constructor(public navCtrl: NavController, 
              public loadingCtrl: LoadingController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              private _photoViewer: PhotoViewer,
              private _cameraService: CameraService,
              private _uploadService: UploadService,
              private _geolocation: Geolocation,
              private _incidentService: IncidentService,
              private _userService:UserService,
              ) {

        this._userService.getUser().then((res)=>{
          if(res != null){
            this._user = JSON.parse(res);
          }
        })
        
        this.takePicture();
  }

  public nextSlide(){
    this.slides.lockSwipes(false)
    let index =  this.slides.getActiveIndex();
    if(index != this.slides.length())
    this.slides.slideTo(index+1, 500);
    this.slides.lockSwipes(true)
  }

  public prevSlide(){
    this.slides.lockSwipes(false)
    let index =  this.slides.getActiveIndex();
    if(index != 0)
    this.slides.slideTo(index-1, 500);

    this.slides.lockSwipes(true)
  }

  public takePicture(){
    this._cameraService.takePicture((result)=>{
      if(result=="success"){
          this._image = this._cameraService.getImage();
          this._geolocation.getCurrentPosition().then(res=>{
          this._coords.latitude = res.coords.latitude;
          this._coords.longitude = res.coords.longitude;
        })
      }
    });
  }
  
  ionViewDidLoad() {
    this.slides.lockSwipes(true)
  }

  public post(){
    this.isUploading = true;
    let filename = Math.floor(Date.now() / 1000);
    let imageRef = this._uploadService.uploadToFireBase(filename);
    this._postValue = "POSTING"
    imageRef.putString(this._image, firebase.storage.StringFormat.DATA_URL).then((snapshot)=>{
             
                if(snapshot.bytesTransferred == snapshot.totalBytes){
                  imageRef.getDownloadURL().then((res)=>{
                      this._incident = {
                      icon: this._inputs.icon,
                      comment: this._inputs.comment,
                      path : res,
                      location:  this._coords,
                      posted_by: this._user,
                      date_taken: new Date().toDateString()
                    }
                    this._incidentService.insert(this._incident).catch((err)=>{
                        alert(err.message)
                    })
                    this.isUploading = false
                    this._postValue = "POST";
                    this._inputs = {icon: 'crash-icon', comment:''}
                    this.viewCtrl.dismiss();
                  })
                }
              
    }, (err)=>{
      this.isUploading = false
      this._postValue = "POST"
    })
  }

  public showPhoto(){
    this._photoViewer.show(this._image);
  }


  public close(){
    this.viewCtrl.dismiss();
  }
}
