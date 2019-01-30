import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  data = ["", "", "", "", ""];
  emailUser: any
  database = firebase.database();
  user = firebase.auth().currentUser
  infouser: any

  constructor() { }

  ngOnInit() {
     
    this.database.ref('users_pro')
    .on('value', function(e){
      console.log(e.val())
    })
    
    
  }

  initChat(){
    var newuser = this.user.email.replace('.','-')
    this.database.ref('/chat/'+newuser).push({
      username: this.user.displayName
    })
  }

}
