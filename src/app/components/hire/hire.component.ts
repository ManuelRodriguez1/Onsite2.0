import { Component, OnInit } from "@angular/core";
import { ServiceService } from 'src/app/services/service.service';
import * as firebase from "firebase/app";
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from "@angular/router";
import { FormGroup, FormControl } from "@angular/forms";
import { AngularFirestore } from "angularfire2/firestore";
import { AppComponent } from "../../app.component";
import * as crypto from "crypto-js";

@Component({
  selector: "app-hire",
  templateUrl: "./hire.component.html",
  styleUrls: ["./hire.component.css"],
})
export class HireComponent implements OnInit {
  FirstName;
  LastName;
  PhoneNumber;
  Entercityorzipcode;
  Email;
  Password;
  error;
  select = 0;
  page = 0;
  title = ['Enter your information:', 'Select skills'];
  text = ['About You', 'Your Skills'];
  appComponent = AppComponent;

  constructor(
    public af: AngularFireAuth,
    private router: Router,
    private db: AngularFirestore
  ) {}
  ngOnInit() {}

  SendVerificationMail() {
    return this.af.auth.currentUser.sendEmailVerification();
  }
  next() {
    this.page++;
    this.select = this.page;
  }
  back() {
    this.page--;
    this.select = this.page;
  }

  onSubmit(formData) {
    console.log(formData);
    if (formData.valid) {
      this.af.auth
        .createUserWithEmailAndPassword(
          formData.value.Email,
          formData.value.Password
        )
        .then((success) => {
          var user = firebase.auth().currentUser;
          this.SendVerificationMail();
          user.updateProfile({
            displayName: "hire",
            photoURL: "",
          });
          this.db.collection("users_hire").doc(user.uid).set({
            id: user.uid,
            name: formData.value.FirstName,
            lastname: formData.value.LastName,
            phone: formData.value.PhoneNumber,
            password: crypto.AES.encrypt(formData.value.Password, 'N@!o').toString(),
            email: user.email,
            zipcode: formData.value.Entercityorzipcode,
            estado: "hire",
            project: false
          }).then((success) => {
              location.href="/ProfileHire";
          });
        })
        .catch((err) => {
          this.error = "* "+err.message;
          console.log(err);
        });
    } else {
      if (formData.control.controls.FirstName.status == "INVALID") {
        this.error = "Require FirstName";
      } else if (formData.control.controls.LastName.status == "INVALID") {
        this.error = "Require LastName";
      } else if (formData.control.controls.PhoneNumber.status == "INVALID") {
        this.error = "Require PhoneNumber";
      } else if (formData.control.controls.email.status == "INVALID") {
        this.error = "Require email";
      } else if (formData.control.controls.Password.status == "INVALID") {
        this.error = "Require Password";
      } else if (
        formData.control.controls.Entercityorzipcode.status == "INVALID"
      ) {
        this.error = "Require Entercityorzipcode";
      }
    }
  }
}