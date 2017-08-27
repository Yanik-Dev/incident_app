import { FormControl, AbstractControl } from '@angular/forms';


import { AngularFireDatabase } from 'angularfire2/database';
export class CustomValidator {

 public constructor( public _firebase: AngularFireDatabase){}

 public checkUsername(control: FormControl): any {
    
   return new Promise(resolve => {

     //Fake a slow response from server
     let users = this._firebase.list('/users/', {
        query: {
          orderByChild: 'username',
          equalTo: control.value.toLowerCase()
        }
      });
     users.subscribe((res)=>{
        if(res.length == 0){
            resolve(null);
        }else{
            resolve({taken: true});
        }
    
     }, err=>{
         resolve(true)
     })
   

   });
 }

 static matchPassword(AC: AbstractControl) {
    const formGroup = AC.parent;
    if (formGroup) {
         const passwordControl = formGroup.get('password'); // to get value in input tag
         const confirmPasswordControl = formGroup.get('confirmPassword'); // to get value in input tag

         if (passwordControl && confirmPasswordControl) {
             const password = passwordControl.value;
             const confirmPassword = confirmPasswordControl.value;
             if (password !== confirmPassword) { 
                 return { matchPassword: true };
             } else {
                 return null;
             }
         }
    }

    return null;
 }

}