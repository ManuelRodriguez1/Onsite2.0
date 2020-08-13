import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
@Component({
  selector: 'app-verified-email',
  templateUrl: './verified-email.component.html',
  styleUrls: ['./verified-email.component.css']
})
export class VerifiedEmailComponent implements OnInit {
  estadoEmail=0;
  text: any[] = ["Verification", "Verification"];
  constructor() { }

  ngOnInit() {
  } 
   resend(){
    firebase.auth().currentUser.sendEmailVerification()
  }



}
