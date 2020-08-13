import { Injectable, EventEmitter } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFirestore } from "angularfire2/firestore";
import { AngularFireStorage } from "angularfire2/storage";
import * as firebase from "firebase/app";
import { NgForm } from "@angular/forms";
import * as crypto from "crypto-js";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProService {

  error = new EventEmitter<any>()
  firebase = firebase

  constructor(
    public af: AngularFireAuth,
    private db: AngularFirestore,
    private afs: AngularFireStorage,
    private router: Router
  ) { }

  registerPro(f: NgForm, file: any[], customers2: any[], selectskills: any[], tools: any[], photo: any) {
    this.af.auth.createUserWithEmailAndPassword(f.value.email, f.value.password)
      .then(() => {
        var user = firebase.auth().currentUser
        user.sendEmailVerification()
        user.updateProfile({
          displayName: "pro",
          photoURL: ""
        }).then(() => {
          this.db.collection('users_pro').doc(user.uid).set({
            id: user.uid,
            name: f.value.name,
            lastname: f.value.lastname,
            email: f.value.email,
            phone: f.value.phone,
            password: crypto.AES.encrypt(f.value.password, 'N@!o').toString(),
            zipcode: f.value.zipcode,
            skills: selectskills,
            description: null,
            estado: "pro",
            certificate: customers2,
            cvUrl: null,
            tools: tools
          })

          if (file != []) {
            for (let i = 0; i < file.length; i++) {
              var fileDoc = this.afs.ref('Users_pro/' + user.uid + "/" + file[i].name).put(file[i])
              fileDoc.then((url) => {
                url.ref.getDownloadURL()
                  .then((url) => {
                    customers2.push({ "name": file[i].name, "url": url })
                    setTimeout(() => {
                      this.db.collection('users_pro').doc(user.uid).update({
                        "certificate": customers2
                      })
                    }, 200);
                  })
              })
            }
          }

          if (photo != '') {
            this.afs.ref('Users_pro/' + user.uid + "/imageProfile").put(photo.target.files[0])
              .then((url) => {
                url.ref.getDownloadURL()
                  .then((u) => {
                    setTimeout(() => {
                      this.db.collection('users_pro').doc(user.uid).update({
                        "photoUrl": u
                      })
                    }, 200);
                  })
              })
          }

        })
        .then(() => {
          setTimeout(() => {
            this.router.navigate(['/VerificationEmail'])
          }, 1500);
        })
      }).catch((error) => {
        console.log(error);

        this.error.emit(error.message)
      })
  }
}
