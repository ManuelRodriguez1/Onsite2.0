import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-hire',
  templateUrl: './hire.component.html',
  styleUrls: ['./hire.component.css']
})
export class HireComponent implements OnInit {
  FirstName;
  LastName;
  PhoneNumber;
  Entercityorzipcode;
  Email;
  Password;
  error;

  constructor(public af: AngularFireAuth, private router: Router) {


  }
  ngOnInit() {


  }




  onSubmit(formData) {

    console.log(formData);
    if (formData.valid) {
      this.af.auth.createUserAndRetrieveDataWithEmailAndPassword(
        formData.value.Email,
        formData.value.Password
      ).then(
        (success) => {
          var user = firebase.auth().currentUser;
          user.updateProfile({
            displayName: "hire",
            photoURL: "",
          });
          firebase.database().ref('users_hire/' + user.uid).set({
            nombre: formData.value.FirstName,
            apellido: formData.value.LastName,
            telefono: formData.value.PhoneNumber,
            correo: user.email,
            zipcode: formData.value.Entercityorzipcode,
            estado: 'hire'
          });
          this.router.navigateByUrl('/Hireprincipal');
        }).catch(
          (err) => {
            this.error = err.message;
            console.log(err);
            /* if(!formData.control.controls.FirstName.status){
                 this.error = err."jiehjfihe";
             }*/
          })
      // }else{
      /*alert("salioooo");

      if(!formData.control.controls.FirstName.status){
       //   this.error = "requerido";
      }
*/


    }
    else {
      if (formData.control.controls.FirstName.status == "INVALID") {
        this.error = "Require FirstName";
      }
      else if (formData.control.controls.LastName.status == "INVALID") {
        this.error = "Require LastName";
      }
      else if (formData.control.controls.PhoneNumber.status == "INVALID") {
        this.error = "Require PhoneNumber";
      }
      else if (formData.control.controls.Email.status == "INVALID") {
        this.error = "Require email";
      }
      else if (formData.control.controls.Password.status == "INVALID") {
        this.error = "Require Password";
      }
      else if (formData.control.controls.Entercityorzipcode.status == "INVALID") {
        this.error = "Require Entercityorzipcode";
      }

    }



  }

}
