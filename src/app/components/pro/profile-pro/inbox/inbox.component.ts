import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { ServiceService } from 'src/app/services/service.service';
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
  public datos: Observable<any>
  email = ''
  datosChat: Observable<any>
  contador = 0
  other = ''
  me = ''
  constructor(private service: ServiceService, private db: AngularFirestore) {
    this.me = this.user.email.replace('.', '-')
    this.datos = this.db.collection('/Chat/ListaChat/'+this.me).valueChanges()
   }

  ngOnInit() {
    this.other = this.email.replace('.', '-')
    this.datosChat = this.db.collection('/Chat/Chateando/'+this.other+'|'+this.me).valueChanges()
  }

  otroInit(){
   
  }

  initChat() {
    this.db.collection('/Chat/Chateando/'+this.other+'|'+this.me).add({
      id: this.user.uid,
      fecha: new Date().getTime(),
      message: $('.msginput').val()
    })
  }

  changeEmail(e){
    this.email = e
    this.ngOnInit()
  }

}
