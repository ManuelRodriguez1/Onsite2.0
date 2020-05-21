import { Component, OnInit, ViewChild } from '@angular/core';
import * as firebase from 'firebase/app';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from "@angular/router";
import { AngularFirestore } from "angularfire2/firestore";
import { AngularFireStorage } from "angularfire2/storage";
import * as crypto from "crypto-js";
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
  password: string = ''
  profileCompleted: boolean = false
  projects: any[] = []
  projectsCompleted: any[] = []
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
    this.emailVerified = this.user.emailVerified
    this.af.collection("users_hire").doc(this.user.uid).collection("projects").ref.where("status", ">", 0).where("status", "<", 3)
    .onSnapshot({ includeMetadataChanges: true }, (d) => {
      d.docChanges().forEach((d) => {
        this.projects.push([d.doc.data()])
        if(d.doc.data().status === 3){
          this.projectsCompleted.push(d.doc.data())
        }else if(d.type === 'removed'){
          this.projects.forEach((data)=>{
            if(data[0].t == d.doc.data().t){
              this.projects.splice(this.projects.indexOf(data),1)
            }
          })
        }
      })
    })
    var data = this.af.collection("users_hire").doc(this.user.uid).snapshotChanges()
    data.subscribe((d) => {
      this.profile = d.payload.data()
      this.password = crypto.AES.decrypt(this.profile.password, 'N@!o').toString(crypto.enc.Utf8)
      setTimeout(() => {
        this.credential = firebase.auth.EmailAuthProvider.credential(this.profile.email, this.password)
      }, 100);
      if (this.profile.photoUrl != null) { this.imageP = this.profile.photoUrl }
      if(this.profile.photoUrl != null && this.emailVerified != false){
        this.profileCompleted = true
      }
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
              "password": crypto.AES.encrypt(f.value.pass2, 'N@!o').toString()
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