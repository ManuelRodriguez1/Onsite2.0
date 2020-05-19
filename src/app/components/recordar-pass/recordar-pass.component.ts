 import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as $ from 'jquery';

@Component({
  selector: 'app-recordar-pass',
  templateUrl: './recordar-pass.component.html',
  styleUrls: ['./recordar-pass.component.css']
})
export class RecordarPassComponent implements OnInit {

  error: any[];
  

  constructor(public af: AngularFireAuth, private router: Router) {



  }
  onRecuperation(formData) {
    if(formData.valid) {
      var auth = firebase.auth();
      var emailAddress = formData.value.email;
      auth.sendPasswordResetEmail(emailAddress).then(function() {
        alert();
          this.error ="Check mail";

      }).catch(
        (err) => {
        this.error = err.message;
      })

    }
  }



ngOnInit(){

}



}
