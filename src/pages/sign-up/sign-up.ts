import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidator } from '../../validators/validator';
import { UserService } from "../../providers/user.service";
import { User } from "../../models/user";
import { AngularFireDatabase } from "angularfire2/database";
import md5 from 'js-md5';
@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  private _signUpForm : FormGroup;
  private _formSubmit: boolean = false;
  private _validations = new CustomValidator(this._firebase);

  /**
   * set up reactive form for user registration
   * @param navCtrl 
   * @param _userService 
   * @param navParams 
   * @param _firebase 
   * @param _formBuilder 
   */
  constructor(public navCtrl: NavController, 
              private _userService: UserService, 
              public navParams: NavParams, 
              public _firebase:AngularFireDatabase, 
              private _formBuilder: FormBuilder) {
    this._signUpForm = this._formBuilder.group({
      username: ["",Validators.required, this._validations.checkUsername.bind(this._validations) ],
      gender: ["", Validators.compose([Validators.required])],
      firstname: ["", Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(12)])],
      lastname: ["", Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(12)])],
      password: ["", Validators.compose([Validators.required, Validators.minLength(8)])],
      confirmPassword: ["", Validators.compose([Validators.required,CustomValidator.matchPassword])]
    })
    
  }

  /**
   * create a user account
   */
  public createAccount(){
    this._formSubmit = true;
    if(this._signUpForm.invalid) { return; }

    let newUser : User = {
      firstname : this._signUpForm.controls['firstname'].value,
      lastname : this._signUpForm.controls.lastname.value,
      username : this._signUpForm.controls.username.value,
      gender : this._signUpForm.controls.gender.value,
      date_registered : new Date().toLocaleDateString(),
      picture : "",
      password : md5(this._signUpForm.controls.password.value)
    }
    this._userService.insert(newUser)
    this._formSubmit =false;
    this._signUpForm.reset();
    this.navCtrl.push("LoginForm");
  }

  
}
