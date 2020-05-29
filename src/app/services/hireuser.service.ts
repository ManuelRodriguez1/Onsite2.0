import { Injectable } from '@angular/core';
import * as firebase from "firebase/app";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFirestore } from "angularfire2/firestore";
import { AngularFireStorage } from "angularfire2/storage";
import { NgForm } from '@angular/forms';
import * as crypto from "crypto-js";

@Injectable({
  providedIn: 'root'
})
export class HireuserService {
  user = firebase.auth().currentUser

  constructor(
    public afA: AngularFireAuth,
    private af: AngularFirestore,
    private afs: AngularFireStorage) { }

    getInfoUser(){
      return this.af.collection("users_hire").doc(this.user.uid)
    }

    getDataPro(idP:any){
      return this.af.collection("users_pro").doc(idP)
    }

    getCredential(user: string, password: string) {
      return firebase.auth.EmailAuthProvider.credential(user, password)
    }

    reautenticate(credential: any) {
      return this.user.reauthenticateAndRetrieveDataWithCredential(credential)
    }

    updateAccount(f: NgForm, name: string, last: string) {
      return this.getInfoUser()
        .update({
          "name": f.value.name != '' ? f.value.name : name,
          "lastname": f.value.lastname != '' ? f.value.lastname : last
        })
    }

    updateEmail(credential: any, email: string) {
      this.reautenticate(credential)
        .then(() => {
          this.user.updateEmail(email)
            .then(() => {
              this.getInfoUser()
                .update({
                  "email": email
                })
            })
        })
    }

    updatePassword(credential: any, pass: string) {
      return this.reautenticate(credential)
        .then(() => {
          this.user.updatePassword(pass)
            .then(() => {
              this.getInfoUser().update({
                "password": crypto.AES.encrypt(pass, 'N@!o').toString()
              })
            })
        })
    }

    updateProfileImg(img: any) {
      return this.afs.ref('Users_hire/' + this.user.uid + "/imageProfile").put(img.target.files[0])
        .then((url) => {
          url.ref.getDownloadURL()
            .then((u) => {
              this.updateUrlImg(u)
            })
        })
    }

    updateUrlImg(img: string) {
      this.getInfoUser().update({
        "photoUrl": img
      })
    }

    applyRating(idPro: string, userreviews: any[]){
      this.getDataPro(idPro).update({
        reviews: userreviews
      })
    }
}
