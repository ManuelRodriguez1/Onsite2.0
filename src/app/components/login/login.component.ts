import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as $ from 'jquery';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error: any[];
  password;
  email;
  cerrarAbrir = "";
  abrir = false;
  pagina = "";
  childData = [];

  list = "";


  constructor(public af: AngularFireAuth, private router: Router) {



  }



  ngOnInit() {
  }
  onSubmit(formData) {
    if (formData.valid) {
      this.af.auth.signInWithEmailAndPassword(formData.value.email, formData.value.password).then((resolve) => {
        formData.reset();
        this.abrir = true;
        $(".modal-backdrop").css("display","none");
      }).then(() => {
        this.af.authState.subscribe(authState => {
          if (authState) {
            console.log(authState.displayName);
            console.log(authState.email);
            if (authState.displayName == "hire") {
              location.href ="/Hireprincipal";
            } else if (authState.displayName == "pro") {
              location.href ='/ProfilePro';
              console.log('pro')
            }
          }
        })
      }).catch(
        (err) => {
          this.error = err.message;
        })
    }
  }
}