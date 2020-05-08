import { Component, OnInit, ViewChild } from '@angular/core';
import * as firebase from 'firebase/app';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from "@angular/router";
import { AngularFirestore } from "angularfire2/firestore";
import { AngularFireStorage } from "angularfire2/storage";

@Component({
  selector: 'app-profile-hire',
  templateUrl: './profile-hire.component.html',
  styleUrls: ['./profile-hire.component.css']
})
export class ProfileHireComponent implements OnInit {
  text = 'Profile';
  righttv = ''
  select = 1

  imageP: any = ''
  user = firebase.auth().currentUser
  name: string = ''
  lastName: string = ''
  email: string = ''

  constructor(
    public afAuth: AngularFireAuth,
    private af: AngularFirestore,
    private afs: AngularFireStorage,
    private router: Router
    ) { }

  ngOnInit() {
    console.log(this.user);
    console.log(this.afAuth.auth.currentUser);
    console.log(firebase.auth());
    if (firebase.auth().currentUser === null) {
      console.log('Usuario no iniciado sesión');
    }
    var data = this.af.collection("users_hire").doc(this.user.uid).get();
    console.log(data)
    var data = this.af.collection("users_hire").doc(this.user.uid).get()
    data.subscribe((d) => {
      this.name = d.data().nombre
      this.lastName = d.data().apellido
      this.email = d.data().email
      if(d.data().photoUrl != null){ this.imageP = d.data().photoUrl}
    })
  }

  imageProfile(e) {
    this.afs.ref('Users_hire/' + this.user.uid + "/imageProfile").delete()
    var image = this.afs.ref('Users_hire/' + this.user.uid + "/imageProfile").put(e.target.files[0])
    image.then((url) => {
      url.ref.getDownloadURL()
        .then((url) => {
          this.imageP = url
          setTimeout(() => {
            this.af.collection("users_hire").doc(this.user.uid).update({
              "photoUrl": this.imageP
            })
          }, 200);
        })
    })
  }


}
