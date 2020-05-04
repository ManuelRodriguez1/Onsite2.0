import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFirestore } from "angularfire2/firestore";
import * as firebase from 'firebase/app';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  section: number = 0
  text: any[] = ["Verification", "Email Change"]
  error: boolean = false

  constructor(private router: Router, public af: AngularFireAuth, private db: AngularFirestore) { }

  ngOnInit() {
  }

  resend() {
    return this.af.auth.currentUser.sendEmailVerification()
  }

  add() {
    this.section++
  }

  updateEmail(f: NgForm) {
    var user = firebase.auth().currentUser
    var data = this.db.collection("users_pro").doc(user.uid).get()
    
    if (f.value.email == user.email) {
      this.error = true
    } else {
      user.updateEmail(f.value.email)
        .then(() => {
          this.db.collection("users_pro").doc(user.uid).update({
            "email": f.value.email
          })
        })
    }
  }
}
