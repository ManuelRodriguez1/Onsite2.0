import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import * as firebase from 'firebase/app';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {

  text: any[] = ["Verification", "Email Change"];
  error: any[];
  error1;
  estadoEmail;
  messageerror = "";
 // user_pro: any = this.af.collection("users_pro").doc(this.user.uid)
 // user_hire: any = this.af.collection("users_pro").doc(this.user.uid)


  constructor(private router: Router) { }

  ngOnInit() {

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
    console.log(results);
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
    this.estadoEmail = 1;
    auth.applyActionCode(actionCode).then(function (resp) {

    }).catch(function (error) {

    });
  }




  updatepass(f: NgForm) {

    var actionCode = this.getParameterByName('oobCode');
    var auth = firebase.auth();
    var accountEmail;
    if (f.value.pass2 == f.value.pass1) {
      auth.verifyPasswordResetCode(actionCode).then(function (email) {
        var accountEmail = email;
        auth.confirmPasswordReset(actionCode, f.value.pass2).then(function (resp) {
          console.log(resp);

          console.log("Success");
         // location.href = "/Home";
        }).catch((err1) => {
          console.log(err1.message);
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
    this.router.navigate(["/Hireprincipal"]);
  }
}
