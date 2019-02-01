import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { ServiceService } from 'src/app/services/service.service';
import * as $ from 'jquery';


@Component({
  selector: 'app-menu-inbox',
  templateUrl: './menu-inbox.component.html',
  styleUrls: ['./menu-inbox.component.css']
})
export class MenuInboxComponent implements OnInit {

  emailUser: any
  database = firebase.database();
  user = firebase.auth().currentUser
  datos: any[]
  email = ''
  datosChat: any[]
  contador = 0

  constructor(private service: ServiceService) { }

  ngOnInit() {
    
    var newuser = this.user.email.replace('.', '-');
    //Llamando las personas con las que he chateado
    this.datos = []
    this.database.ref('/Chat/ListaChat/' + newuser)
      .on('value', e => {
        e.forEach(i => {
          this.datos.push(i.val())
        })
      })
    // console.log(this.datos)
    this.email = this.service.DevolverDatos();
    console.log(this.email)
    //Mensaje del chat
      this.otroInit()
  }

  otroInit(){
    var newuser = this.user.email.replace('.', '-');
    var otheruser = this.email.replace('.', '-');
    var usuario = this.user.displayName
    if (usuario == 'pro') {
      var temp =  newuser
      newuser = otheruser
      otheruser = temp
    }
    this.datosChat = []
    this.database.ref('/Chat/Chateando/' + newuser + '|' + otheruser)
      .on('value', e => {
        e.forEach(i => {
          this.datosChat.push(i.val())
        })
      })
  }


  initChat() {
    var newuser = this.user.email.replace('.', '-')
    var otheruser = this.email.replace('.', '-')
    //Con quien chateo
    var usuario = this.user.displayName
    // if (usuario == 'pro') {
    //   var temp =  newuser
    //   newuser = otheruser
    //   otheruser = temp
    // }

    this.database.ref('/Chat/Chateando/' + newuser + '|' + otheruser).push({
      id: this.user.uid,
      fecha: new Date().getTime(),
      message: $(".msginput").val()
    })

    //Con quien chatee
    if (this.contador == 0 && usuario == 'hire') {
      this.database.ref('/Chat/ListaChat/' + newuser).push({
        email: this.email
      })
      this.database.ref('/Chat/ListaChat/' + otheruser).push({
        email: this.user.email
      })
      this.ngOnInit()
    }

    this.contador = 1
  }
  changeEmail(e){
    this.email = e
    this.otroInit()
  }

}
