import { Injectable, EventEmitter } from '@angular/core';
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
  users = new EventEmitter<number>()
  similar = new EventEmitter<string>()
  pagination = new EventEmitter<any[]>()
  filterPag = new EventEmitter<any[]>()
  usersChat = new EventEmitter<any>()
  projects = new EventEmitter<any>()
  initChat = new EventEmitter<boolean>()

  constructor(
    public afA: AngularFireAuth,
    private af: AngularFirestore,
    private afs: AngularFireStorage
  ) { }
  //Obtener datos hire
  getInfoHire() {
    return this.af.collection("users_hire")
  }
  //Obtener datos pro para Chat
  getInfoPro() {
    return this.af.collection("users_pro")
  }
  //Obtener datos de usuario
  getInfo() {
    return this.af.collection("users_pro").doc(this.user.uid)
  }
  //Obtener proyectos aplicados
  getProject(idUser: string, idProject: string) {
    return this.getInfoHire().doc(idUser).collection('projects').doc(idProject)
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
  //AGREGAR INFORMACION
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
  //Aplicar un proyecto agregando ID del usuario
  applyProject(idUser: string, idProject: string, users: any[]) {
    this.getInfoHire().doc(idUser).collection('projects').doc(idProject).update({
      applyUsers: users
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
              }).then(() => {
                this.user.sendEmailVerification()
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
  updateSkill(skill: any) {
    this.getInfo().update({
      "skills": skill
    })
  }
  //Actualizar certificados Usuario
  updateCert(cert: any, pos: any, certs: any) {
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
  updateUrlCert(cert: any) {
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
  deleteCert(cert: any) {
    this.afs.ref('Users_pro/' + this.user.uid + "/" + cert.name).delete()
  }
  //CHAT
  //Añadir conversación
  chatMsg(idHire: string, idPro: string, msg: string) {
    var chatTemp: any = []
    var temp: any = {
      'fecha': new Date(),
      'id': this.user.uid,
      'message': msg
    }
    this.getChat(idHire, idPro).get().subscribe((res) => {
      if (res.data()) {
        chatTemp = res.data().chat
        chatTemp.push(temp)
        this.getChat(idHire, idPro).update({ chat: chatTemp })
      } else {
        this.getChat(idHire, idPro).set({ chat: [temp] })
      }
    })
  }
  //Obtener mensajes
  getChat(idHire: string, idPro: string) {
    return this.af.collection('Chat').doc(idHire + '|' + idPro)
  }
  //Comprobar mensajes
  getChatExist(){
    return this.af.collection('Chat')
  }
}
