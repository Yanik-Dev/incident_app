import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { LoadingController, ToastController } from "ionic-angular";
import { Observable } from "rxjs/Observable";
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class UploadService {

  private uploadUrl:String;

  constructor(
              private _loadingCntrl : LoadingController,
              private _toastCntrl : ToastController,
              private _firebase : AngularFireDatabase ) {
    
  }

  /**
   * get upload url
   * @return uploadUrl 
   */
  public getUploadUrl():String{
    return this.uploadUrl;
  }

  /**
   * sets upload path
   * @param path url path
   */
  public setUploadUrl(path:String):void{
    this.uploadUrl = path;
  }

  public uploadToFireBase(filename){
      let storage = this._firebase.app.storage().ref();
      
      
      const imageRef = storage.child(`images/${filename}.jpg`);
    
      return imageRef;
  }

  public deleteUpload(filename){
    let storage = this._firebase.app.storage().ref();
    filename = filename.split('/').pop();
    const imageRef = storage.child(`images/${filename}.jpg`);
  
    return imageRef;
 }



    /**
     * display a notification toast
     * @param text info to be displayed in the toast
     */
    private presentToast(text) {
        let toast = this._toastCntrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    }

      
}
