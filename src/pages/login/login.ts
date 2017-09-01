import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController  } from 'ionic-angular';
import { UserService } from '../../providers/user.service';
import { User } from '../../models/user';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import md5 from 'js-md5';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private _user:User;
  private _loginForm: FormGroup;
  private _submitForm: boolean = false;
  private _response = {valid:true, msg:""}
  private _isFetching = false;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private _userService: UserService,
              public menu: MenuController,
              private _formBuilder: FormBuilder) {
                this.menu.enable(false)
    this._userService.getUser().then((res)=>{
      if(res != null){
        this.navCtrl.push("MenuPage")
      }
      
    }).catch(err=>console.log(err))
    this._loginForm = this._formBuilder.group({
      'username': ["", Validators.compose([Validators.required])],
      'password': ["", Validators.compose([Validators.required])],
    })
  }

  ionViewDidLoad() {
    
  }

  public login(){
    this._isFetching = true;
    this._userService.findUsername(this._loginForm.controls.username.value).subscribe((res)=>{
      if(res.length == 0){
        this._response.valid = false;
        this._response.msg="User does not exist";
      }else{
          let hash = md5(this._loginForm.controls.password.value);
          if(res[0].password == hash){
            this._response.valid = true;
            let user : User = {
              firstname: res[0].firstname,
              lastname: res[0].lastname,
              username: res[0].username,
              gender: res[0].gender,
              picture: res[0].picture
            }
            //store user locally
            this._userService.setUser(user).then(()=>{
                this.navCtrl.push("MenuPage");
                this._isFetching = false;
            }).catch((err)=>{
 
          })
           
          }else{
            this._response.valid = false;
            this._response.msg="Invalid Password";
          }
      }
      this._isFetching = false;
    }, err=>{
      this._response.valid = false;
      this._response.msg="No internet connection";
      this._isFetching = false;
    })
    
  }

  public signUp(){
    this.navCtrl.push("SignUpPage")
  }
}
