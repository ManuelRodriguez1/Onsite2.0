import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  emailUser: any
  database = firebase.database();
  user = firebase.auth().currentUser
  datos: any[]
  email = ''

  constructor(private service: ServiceService) { }

  ngOnInit() {
    this.datos = []
    this.database.ref('users_pro/')
    .on('value', e => {
      e.forEach(i => {
        this.datos.push(i.val())
      })
    })
    console.log(this.datos)
    console.log(this.service.devolverData())
  }

  initChat(){
    var newuser = this.user.email.replace('.','-')
    this.database.ref('/chat/'+newuser).push({
      username: this.user.displayName
    })
  }

  info(e){
    this.email = e
    console.log(e)
  }
}
