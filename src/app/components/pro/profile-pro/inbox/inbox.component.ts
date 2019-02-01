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
  datosChat: any[]
  contador = 0
  

  constructor(private service: ServiceService, private db: AngularFirestore) { }

  ngOnInit() {
    
    var newuser = this.user.email.replace('.', '-');

    this.datos = this.db.collection('/Chat/').valueChanges()
   
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
    if (usuario == 'pro') {
      var temp =  newuser
      newuser = otheruser
      otheruser = temp
    }
  
  }

  changeEmail(e){
    this.email = e
    this.otroInit()
  }

}
