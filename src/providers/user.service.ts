import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { UploadService } from './upload.service';
import { User } from '../models/user';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from "angularfire2/database";


@Injectable()
export class UserService {

  private _user:User;
  private _options:Object;

  constructor(private _storage: Storage, 
              private _uploadService: UploadService,
              private _firebaseDb: AngularFireDatabase) {
  }
            
  public findAll():any{
    return this._firebaseDb.list("/users/");
  }

  public findOne(id:string):any{
    return this._firebaseDb.object("/users/"+id);
  }

  public findUsername(username:string):any{
    return this._firebaseDb.list("/users/", {
      query: {
        orderByChild: 'username',
        equalTo: username.toLowerCase()
      }});
  }

  public insert(user):any{
     this._firebaseDb.list("/users/").push(user).catch((err)=>{
       console.log(err)
     });
  }

  public update(user):any{
    return this._firebaseDb.list("/users/").update(user.$key, user);
  }

  public remove(user):any{
    return this._firebaseDb.list("/users/").remove(user.$key);
  }

  public setProfileImage(image:String){
    return this._storage.set("profile_image", image)
  }

  public getProfileImage(){
    return this._storage.get("profile_image");
  }

  public setUser(user:User){
    return this._storage.set("user", JSON.stringify(user))
  }

  public getUser(){ 

    return  this._storage.get("user");
  }

  public clearUser(){ 
    this._storage.clear();
  }


  private _errorHandler(error:any){
    console.log(error)
  }
}
