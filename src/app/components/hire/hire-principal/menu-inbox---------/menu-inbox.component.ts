import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
//import { ServiceService } from 'src/app/services/service.service';
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
  //datos: Observable<any>
  email = ''
  //datosChat: Observable<any>
  contador = 0
  me = ''
  contador2 = 0
  intervalo

  constructor( private db: AngularFirestore) {
    //this.email = this.service.DevolverDatos();
    this.me = this.user.email.replace('.', '-')
    //Ver items a la izquierda
    //this.datos = this.db.collection('Chat/ListaChat/' + this.me).valueChanges()
  }
  ngOnInit() {
  }
  /*
  ngOnInit() {
    var other = this.email.replace('.', '-')
    //Ver mensajes del chat
    this.datosChat = this.db.collection('Chat/Chateando/' + this.me + '|' + other,
      ref => ref.orderBy('fecha', 'asc')).valueChanges()
    this.datosChat.subscribe(() => {
      setTimeout(() => {
        $('.minichat').animate({ scrollTop: $('.minichat')[0].scrollHeight }, 200)
      }, 20)
    })
  }

  changeEmail(e) {
    this.email = e
    this.ngOnInit()
  }*/

  initChat() {
    var other = this.email.replace('.', '-')
    //Creando nueva caja de chat
    this.db.collection('Chat/Chateando/' + this.me + '|' + other).add({
      id: this.user.uid,
      fecha: new Date().getTime(),
      message: $('.msginput').val()
    })

    if (this.contador == 0) {
      //Con quien chatee
      this.db.collection('Chat/ListaChat/' + this.me).add({
        email: this.email
      })
      //Con quien chatee parte del usuario Pro
      this.db.collection('Chat/ListaChat/' + other).add({
        email: this.user.email
      })
    }

    this.contador = 1

  }

}
