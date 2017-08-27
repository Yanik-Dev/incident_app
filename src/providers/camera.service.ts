import { Injectable } from '@angular/core';
import { Platform, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

declare var cordova: any;

@Injectable()
export class CameraService{
    private lastImage:any;
    private loading;
    constructor (   private _platform : Platform,
                    private _toastCntrl : ToastController,
                    private _camera : Camera
                ){}

    public takePicture(result) {
        // Create options for the Camera Dialog
        var options = {
            quality: 100,
            destinationType: this._camera.DestinationType.DATA_URL,
            sourceType: this._camera.PictureSourceType.CAMERA,
            encodingType: this._camera.EncodingType.JPEG,
            cameraDirection: 1,
            saveToPhotoAlbum: true
        };
        
        // Get the data of an image
        this._camera.getPicture(options).then((imagePath) => {
           
           this.lastImage = "data:image/jpeg;base64,"+imagePath;
            result("success");
        }, (err) => {
            result("error");
        });

    }

    public fromAlbum(result) {
        // Create options for the Camera Dialog
        var options = {
            quality: 100,
            destinationType: this._camera.DestinationType.DATA_URL,
            sourceType: this._camera.PictureSourceType.PHOTOLIBRARY,
            encodingType: this._camera.EncodingType.JPEG,
            cameraDirection: 1,
            targetWidth: 256,
            targetHeight: 256,
            saveToPhotoAlbum: true
        };
        
        // Get the data of an image
        this._camera.getPicture(options).then((imagePath) => {
           
           this.lastImage = "data:image/jpeg;base64,"+imagePath;
            result("success");
        }, (err) => {
            result("error");
        });

    }
    private presentToast(text) {
        let toast = this._toastCntrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    }


    /**
     * gets camera image
     * @return image camera image
     */
    public getImage(){
        return this.lastImage;
    }

}