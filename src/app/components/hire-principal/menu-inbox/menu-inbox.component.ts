import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { ServiceService } from 'src/app/services/service.service';
import { AngularFirestore } from "angularfire2/firestore";
import * as $ from 'jquery';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-menu-inbox',
  templateUrl: './menu-inbox.component.html',
  styleUrls: ['./menu-inbox.component.css']
})
export class MenuInboxComponent implements OnInit {

  emailUser: any
  database = firebase.database();
  user = firebase.auth().currentUser
  datos: Observable<any>
  email = ''
  datosChat: Observable<any>
  contador = 0

  constructor(private service: ServiceService, private db: AngularFirestore) { }

  ngOnInit() {
    var me = this.user.email.replace('.','-')
    var other = this.email.replace('.','-')
    this.email = this.service.DevolverDatos();
    //Ver items a la izquierda
    this.datos = this.db.collection('Chat/ListaChat/'+me).snapshotChanges()
    //Ver mensajes del chat
    this.datosChat = this.db.collection('Chat/Chateando/'+me+'|'+other).snapshotChanges()
  }

  changeEmail(e){
    this.email = e
  }

  initChat(){
    var me = this.user.email.replace('.','-')
    var other = this.email.replace('.','-')
    //Creando nueva caja de chat
    this.db.collection('Chat/Chateando/'+me+'|'+other).add({
      id: this.user.uid,
      fecha: new Date().getTime(),
      message: $('.msginput').val()
    })
    //Con quien chatee
    this.db.collection('Chat/ListaChat/'+me).add({
      email: this.email
    })
    //Con quien chatee parte del usuario Pro
    this.db.collection('Chat/ListaChat/'+other).add({
      email: this.user.email
    })
  }

}
