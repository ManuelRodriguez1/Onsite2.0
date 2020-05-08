import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFirestore } from "angularfire2/firestore";
import * as firebase from 'firebase/app';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.css']
})
export class ChangeEmailComponent implements OnInit {
  section: number = 0
  text: any[] = ["Verification", "Email Change"]
  error: boolean = false

  constructor(private router: Router, public af: AngularFireAuth, private db: AngularFirestore) { }

  ngOnInit() {
  }
  resend() {
    this.af.auth.currentUser.sendEmailVerification()
  }
  add() {
    this.section++
  }
  updateEmail(f: NgForm) {
    var user = firebase.auth().currentUser
    var password = ''
    var data = this.db.collection("users_hire").doc(user.uid).get()
    var credential
    data.subscribe((d) => {
      password = d.data().password;
      credential = firebase.auth.EmailAuthProvider.credential(user.email, password)
    })
    setTimeout(() => {
      user.reauthenticateWithCredential(credential).then(()=>{
        if (f.value.pass == password && f.value.email != user.email) {
          user.updateEmail(f.value.email)
            .then(() => {
              this.db.collection("users_hire").doc(user.uid).update({
                "email": f.value.email
              })
              user.sendEmailVerification()
              this.section = 0
              this.error == false
            })
        }else{
          this.error = true
        }
      })
    }, 1000);
  }
}
