import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import * as firebase from 'firebase/app';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from "angularfire2/firestore";

import * as crypto from "crypto-js";



@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {

  text: any[] = ["Verification", "Verification"];
  error: any[];
  error1;
  messageerror = "";
  estadoEmail=0

  constructor(private router: Router,public aff: AngularFireAuth,private af: AngularFirestore) { }

  ngOnInit() {
    console.log(firebase.auth().currentUser);

    // Get the action to complete.
    var mode = this.getParameterByName('mode');
    var actionCode = this.getParameterByName('oobCode');
    var auth = firebase.auth();
    // (Optional) Get the continue URL from the query parameter if available.
    var continueUrl = this.getParameterByName('continueUrl');
    // (Optional) Get the language code if available.
    var lang = this.getParameterByName('lang') || 'en';



    // Handle the user management action.
    switch (mode) {
      case 'resetPassword':

        // Display reset password handler and UI.
        this.handleResetPassword();
        break;
      case 'verifyEmail':

        // Display email verification handler and UI.
        this.handleVerifyEmail(auth, actionCode, continueUrl, lang);
        break;
      default:
      // Error: invalid mode.
    }

  }
  getParameterByName(name: any) {
    let url = window.location.href;
    name = name.replace(/[[]]/g, "\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) {
      return null;
    }
    if (!results[2]) {
      return '';
    }
    return results[2];
  }
  handleResetPassword() {

    this.estadoEmail = 2;

  }
  handleVerifyEmail(auth, actionCode, continueUrl, lang) {
    console.log(auth);
    console.log(actionCode);
    console.log("belxy");
    this.estadoEmail = 1;
    auth.applyActionCode(actionCode).then(function (resp) {
      console.log(resp);
    }).catch(function (error) {
console.log(error);
    });
  }
  resend(){
    firebase.auth().currentUser.sendEmailVerification()
  }



  updatepass(f: NgForm) {
    var actionCode = this.getParameterByName('oobCode');
    var auth = firebase.auth();
    var accountEmail;
 
 
    if (f.value.pass2 == f.value.pass1) {
   
     auth.verifyPasswordResetCode(actionCode).then(function (email) {
        var accountEmail = email;
        auth.confirmPasswordReset(actionCode, f.value.pass2).then(function(resp) {
          console.log("succes *------*");
      firebase.auth().signInWithEmailAndPassword(accountEmail, f.value.pass2)
      .then(function(firebaseUser) {
          // Success 
          console.log(firebaseUser);
          console.log(firebaseUser.user.uid);
          if (firebaseUser.user.displayName == "hire") {
            console.log("hireeeeee");
            firebase.firestore().collection("users_hire").doc(firebaseUser.user.uid).update({
              "password": crypto.AES.encrypt(f.value.pass2, 'N@!o').toString()
           //   "password": "modifico"
            }).then(() => {
              location.href = "/Hireprincipal";

            })
           } else if (firebaseUser.user.displayName == "pro") {
             console.log("prooooooo");
             firebase.firestore().collection("users_pro").doc(firebaseUser.user.uid).update({
              "password": crypto.AES.encrypt(f.value.pass2, 'N@!o').toString()
            }).then(() => {
              location.href = '/ProfilePro';
            })  .catch(function(error) {
              this.messageerror = error.message;
             });
            
           }
      })
     .catch(function(error) {
      this.messageerror = error.message;
     });
        }).catch((err1) => {
          this.messageerror = err1.message;

        })
      }).catch((err2) => {
        this.messageerror = err2.message;
   
      })
    } else {
      this.messageerror = "Passwords do not match";
    }

  }



  Continue() {
    this.router.navigate(["/Home"]);
  }
}
