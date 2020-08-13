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
export class HireService {
  error =new EventEmitter<any> ();

  constructor(
    public af: AngularFireAuth,
    private db: AngularFirestore,
    private afs: AngularFireStorage,
    private router: Router) {
      
    }

    registerHire(f: NgForm,filePicture: any[]){
      this.af.auth.createUserWithEmailAndPassword(f.value.Email, f.value.Password)
      .then(() => {
        var user = firebase.auth().currentUser
        user.sendEmailVerification()
        user.updateProfile({
          displayName: "hire",
          photoURL: ""
        }).then(() => {
          this.db.collection('users_hire').doc(user.uid).set({
            id: user.uid,
            name: f.value.FirstName,
            lastname: f.value.LastName,
            phone: f.value.PhoneNumber,
            password: crypto.AES.encrypt(f.value.Password, 'N@!o').toString(),
            email: user.email,
            zipcode: f.value.zipcode,
            estado: "hire",
            project: false
          })
          //addPicture
          if(filePicture != []){
            for (let i = 0; i < filePicture.length; i++) {
              var fileDoc = this.afs.ref('Users_hire/' + user.uid + "/imageProfile").put(filePicture[i])
              fileDoc.then((url) => {
                url.ref.getDownloadURL()
                  .then((url) => {
                
                    setTimeout(() => {
                      this.db.collection("users_hire").doc(user.uid).update({
                        "photoUrl": url
                      })
                    }, 200);


                  })
              })
            }
          }

        }).then(() => this.router.navigate(['/Verification']))
      }).catch((err) => {
        console.log(err);
        this.error.emit(err.message);
       
      });
    }
 
  }

  