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
export class ProuserService {

  user = firebase.auth().currentUser

  constructor(
    public afA: AngularFireAuth,
    private af: AngularFirestore,
    private afs: AngularFireStorage
  ) { }

  //Obtener datos de usuario
  getInfo() {
    return this.af.collection("users_pro").doc(this.user.uid)
  }
  //MANEJO DE CREDENCIALES USUARIO
  //Credenciales del usuario
  credential(user: string, password: string) {
    return firebase.auth.EmailAuthProvider.credential(user, password)
  }
  //Reautenticar usuario
  reautenticate(credential: any) {
    return this.user.reauthenticateAndRetrieveDataWithCredential(credential)
  }
  //Subir CV del usuario
  addCV(cv: any) {
    this.afs.ref('Users_pro/' + this.user.uid + "/CV/" + cv.target.files[0].name).put(cv.target.files[0])
      .then((url) => {
        url.ref.getDownloadURL()
          .then((url) => {
            this.updateUrlCv(cv.target.files[0].name, url)
          })
      })
  }
  //ACTUALIZACIÓN DE INFORMACIÓN USUARIO
  //Actualizar informacion de usuario
  updateAccount(f: NgForm, name: string, last: string, desc: string) {
    return this.getInfo()
      .update({
        "name": f.value.name != '' ? f.value.name : name,
        "lastname": f.value.lastname != '' ? f.value.lastname : last,
        "description": f.value.description != '' ? f.value.description : desc
      })
  }
  //Actualizar email
  updateEmail(credential: any, email: string) {
    this.reautenticate(credential)
      .then(() => {
        this.user.updateEmail(email)
          .then(() => {
            this.getInfo()
              .update({
                "email": email
              })
          })
      })
  }
  //Actualizar password
  updatePassword(credential: any, pass: string) {
    return this.reautenticate(credential)
      .then(() => {
        this.user.updatePassword(pass)
          .then(() => {
            this.getInfo().update({
              "password": crypto.AES.encrypt(pass, 'N@!o').toString()
            })
          })
      })
  }
  //Actualizar imagen de usuario
  updateProfileImg(img: any) {
    return this.afs.ref('Users_pro/' + this.user.uid + "/imageProfile").put(img.target.files[0])
      .then((url) => {
        url.ref.getDownloadURL()
          .then((u) => {
            this.updateUrlImg(u)
          })
      })
  }
  //Actualizar url de imagen de usuario
  updateUrlImg(img: string) {
    this.getInfo().update({
      "photoUrl": img
    })
  }
  //Actualizar url del CV del usuario
  updateUrlCv(name: string, url: string = '') {
    this.getInfo().update({
      "cvUrl": [{ "name": name, "url": url }]
    })
  }
  //Actualizar skill del usuario
  updateSkill(skill: any){
    this.getInfo().update({
      "skills": skill
    })
  }
  //Actualizar certificados Usuario
  updateCert(cert: any, pos: any, certs: any){
    this.afs.ref('Users_pro/' + this.user.uid + "/" + cert.target.files[0].name).put(cert.target.files[0])
    .then((url) => {
      url.ref.getDownloadURL()
      .then((u) => {
        certs[pos] = { "name": cert.target.files[0].name, "url": u }
      })
      .then(() => {
        this.updateUrlCert(certs)
      })
    })
  }
  //Actualizar url certificados Usuario
  updateUrlCert(cert: any){
    this.getInfo().update({
      "certificate": cert
    })
  }
  //ELIMINAR DATOS USUARIO
  //Eliminar CV del usuario
  deleteCv(cv: any) {
    this.afs.ref('Users_pro/' + this.user.uid + '/CV/' + cv.name).delete()
    this.updateUrlCv('Add a file')
  }
  //Eliminar certificados del usuario
  deleteCert(cert: any){
    this.afs.ref('Users_pro/' + this.user.uid + "/" + cert.name).delete()
  }
}
