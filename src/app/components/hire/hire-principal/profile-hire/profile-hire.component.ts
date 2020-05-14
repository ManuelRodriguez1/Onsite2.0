import { Component, OnInit, ViewChild } from '@angular/core';
import * as firebase from 'firebase/app';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from "@angular/router";
import { AngularFirestore } from "angularfire2/firestore";
import { AngularFireStorage } from "angularfire2/storage";
declare var $: any

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
  currentPassword: string = ''
  profile: any = ''
  projects: any[] = []
  credential: any
  emailVerified: any
  countProject= 0
  constructor(
    public afAuth: AngularFireAuth,
    private af: AngularFirestore,
    private afs: AngularFireStorage,
    private router: Router
    ) { }

  ngOnInit() {
    this.emailVerified = this.user.emailVerified;
    var datap = this.af.collection("users_hire").doc(this.user.uid).collection("projects").get()
    .toPromise().then(querySnapshot => {
      querySnapshot.forEach(doc => {
          let commentData = doc.data();
          this.projects.push(commentData);
      });
    });
    var data = this.af.collection("users_hire").doc(this.user.uid).snapshotChanges()
    data.subscribe((d) => {
      this.profile = d.payload.data()
      if (this.profile.photoUrl != null) { this.imageP = this.profile.photoUrl }
      this.credential = firebase.auth.EmailAuthProvider.credential(this.profile.email, this.profile.password)
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

  accountForm(f: NgForm) {
    var col = this.af.collection("users_hire").doc(this.user.uid)
    if (f.value.name != '') { col.update({ "name": f.value.name }); $("#name").val(''); }
    if (f.value.lastname != '') { col.update({ "lastname": f.value.lastname }); $("#lastname").val('') }
    if (f.value.email != '') {
      this.user.reauthenticateAndRetrieveDataWithCredential(this.credential).then(() => {
        this.user.updateEmail(f.value.email)
          .then(() => {
            col.update({ "email": f.value.email })
          }).then(() => {
            this.user.sendEmailVerification()
            $("#email").val('')
          })
      })
    }
  }

  passForm(f: NgForm) {
    if (f.value.pass1 == f.value.pass2) {
      this.user.reauthenticateAndRetrieveDataWithCredential(this.credential).then(() => {
        this.user.updatePassword(f.value.pass2)
          .then(() => {
            this.af.collection("users_hire").doc(this.user.uid).update({
              "password": f.value.pass2
            })
            $("#cPass, #pass1, #pass2").val('')
            setTimeout(() => {
              $("#cPass, #pass1, #pass2").removeClass("errorInput correctInput")
              $("#cPass, #pass1, #pass2").next('span').attr('hidden', true)
            }, 200);
          })
      })
    }
  }

  selectOption(e) {
    this.select = e
  }

}