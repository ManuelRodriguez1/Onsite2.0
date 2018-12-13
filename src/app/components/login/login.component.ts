import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import * as $ from 'jquery';
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
  pepe = "";

  constructor(public af: AngularFireAuth, private router: Router) {


    this.af.authState.subscribe(authState => {
      if (authState) {
        console.log(authState.displayName);
          console.log(authState.email);
        if (authState.displayName == "hire") {
          this.router.navigateByUrl('/Hireprincipal');
        } else if (authState.displayName == "pro") {
          this.router.navigateByUrl('/ProfilePro');

        }

      }
    });



    if (this.pagina == "hire") {
      this.router.navigateByUrl('/Hireprincipal');
    } else if (this.pagina == "pro") {
      this.router.navigateByUrl('/ProfilePro');
    }




  }



  ngOnInit() {
  }
  onSubmit(formData) {
    if (formData.valid) {
      this.af.auth.signInWithEmailAndPassword(formData.value.email, formData.value.password).then((resolve) => {
        console.log("HOOOOOLLLLLLLSSSSSSSSSSS");
        formData.reset();
        this.abrir = true;
      })
        .catch(
          (err) => {
            this.error = err.message;
          })
    }
  }
}
