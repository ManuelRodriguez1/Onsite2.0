import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
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
      error: any[];
      constructor(public af: AngularFireAuth,private router: Router) {
          }
  ngOnInit() {


  }




  onSubmit(formData) {
alert("entrooo");

        if(formData.valid) {

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
                firebase.database().ref('users_hire/'+ user.uid).set({
                nombre: formData.value.FirstName,
                apellido: formData.value.LastName,
                telefono: formData.value.PhoneNumber,
                correo: user.email,
                zipcode: formData.value.Entercityorzipcode,
                estado:'hire'
              });
              this.router.navigateByUrl('/Hireprincipal');
           }).catch(
             (err) => {
             this.error = err.message;
           })
         }
       }



}
