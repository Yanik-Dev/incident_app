import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UploadService } from "../../providers/upload.service";
import { UserService } from "../../providers/user.service";
import { CameraService } from "../../providers/camera.service";
import { User } from "../../models/user";

@IonicPage()
@Component({
  selector: 'page-settings-page',
  templateUrl: 'settings-page.html',
})
export class SettingsPage {

  private image :string = "./assets/icon/profile.png";
  private isUploading:Boolean = false;
  private _user? : any;
  
  public constructor(private _uploadService: UploadService,
                      private userService: UserService, 
                     private _cameraService : CameraService){
      this.userService.getProfileImage().then((res)=>{
        this.image = res;
      })
      this.userService.getUser().then((user)=>{
        console.log(JSON.parse(user))
        this._user = JSON.parse(user);
      })
  }

  public updatePicture(){
    this._cameraService.fromAlbum((result)=>{
      if(result=="success"){
          this.upload();
      }
    });
  }

 private upload(){

  this.isUploading = true;
  let filename = Math.floor(Date.now() / 1000);
  let imageRef = this._uploadService.uploadToFireBase(filename);
  this.image =  this._cameraService.getImage();
  
  imageRef.putString(this.image, firebase.storage.StringFormat.DATA_URL).then((snapshot)=>{
           
      if(snapshot.bytesTransferred == snapshot.totalBytes){
        imageRef.getDownloadURL().then((res)=>{
          this._user.picture = res
          this.userService.update(this._user).then((res)=>{

             this.image = this._cameraService.getImage();
          });
            this.isUploading = false;
      })
          
      }
            
  }, (err)=>{
    this.isUploading = false
    this.image = "./assets/icon/profile.png";
  })
}

}
