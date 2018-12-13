import { Component, OnInit, ViewChild,  Output, EventEmitter } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error: any[];
  password;
  email;
  cerrarAbrir="";
  abrir = false;
  constructor(public af: AngularFireAuth,private  router: Router) {
    this.af.authState.subscribe(authState => {
      console.log("hola");
      console.log(authState);
    if(authState) {
      console.log("11111");
      this.router.navigateByUrl('/Hireprincipal');
  }else{
    console.log("3333");
  }
    });
   }

  ngOnInit() {
  }

  onSubmit(formData) {
  if(formData.valid) {
    this.af.auth.signInWithEmailAndPassword(formData.value.email,formData.value.password).then((resolve)=>{
      console.log("HOOOOOLLLLLLLSSSSSSSSSSS");
      //const status ="online";
  //    this.setUserStatus(formData.value.email,status);


formData.reset();
  this.abrir=true;



    })
    .catch(
      (err) => {
      this.error = err.message;
    })
  }
}



}
