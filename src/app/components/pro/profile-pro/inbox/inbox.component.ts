import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
//import { ServiceService } from 'src/app/services/service.service';
import * as $ from 'jquery';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  emailUser: any
  database = firebase.database();
  user = firebase.auth().currentUser
  public datos;
  email = ''
  datosChat: any[] = [];
  contador = 0
  other = ''
  me = ''
  //constructor(private service: ServiceService, private db: AngularFirestore) {

  constructor( private db: AngularFirestore) {
    this.me = this.user.email.replace('.', '-')
    this.datos = this.db.collection('/Chat/ListaChat/' + this.me).valueChanges()
  }
  ngOnInit() {
  }
/*
  ngOnInit() {
    this.other = this.email.replace('.', '-')
    this.datosChat = this.db.collection('/Chat/Chateando/' + this.other + '|' + this.me,
      ref => ref.orderBy('fecha', 'asc')).valueChanges()
    this.datosChat.subscribe(() => {
      setTimeout(() => {
        $('.minichat').animate({ scrollTop: $('.minichat')[0].scrollHeight }, 200)
      }, 20);
    })
  }
*/
  otroInit() {

  }

  initChat() {
    this.db.collection('/Chat/Chateando/' + this.other + '|' + this.me).add({
      id: this.user.uid,
      fecha: new Date().getTime(),
      message: $('.msginput').val()
    })
  }
/*
  changeEmail(e) {
    this.email = e
    this.ngOnInit()
  }
*/
}
