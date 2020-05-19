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
  error2: any[];
  error3: any[];
  password;
  email;
  cerrarAbrir = "";
  abrir = false;
  activar=true;
  activar1=false;
  pagina = "";
  childData = [];
  Forgot = 0;
  list = "";
rtrespuesta="";

  constructor(public af: AngularFireAuth, private router: Router) {



  }

  hire() {
    this.router.navigateByUrl("/Hire");
    // location.href ="/Hire";

  }

  pro() {
    this.router.navigateByUrl("/Pro");
  }
  activarpro(){
 
    if(this.activar!=true){
      this.activar = !this.activar;
    }
    
    this.activar1 = false;
}
activarhire(){
  if(this.activar1!=true){
    this.activar1 = !this.activar1;
  }
  this.activar = false;
}
Forgot1(){
    this.Forgot = 1;
}
Forgot2(){
  this.Forgot = 0;
}
onRecuperation(formData) {
var array=[];
  if(formData.valid) {
    var auth = firebase.auth();
    var emailAddress = formData.value.emailreset;
    auth.sendPasswordResetEmail(emailAddress).then(function() {
  
      //  array.push("Check mail");
        $("#exampleInputEmail1").val("");
        $("#exampleInputEmail1").removeClass("errorInput");
        this.error3 = "Check mail";

    }).catch(
      (err) => {

      //array.push();
      $("#exampleInputEmail1").addClass("errorInput");
      this.error3 = err.message;
       
    })

  }

}

  ngOnInit() {
  }
  onSubmit(formData) {
    if (formData.valid) {

     /* if (isRemberMeChecked) {
       
        localStorage.setItem('Name', formData.value.email);
        localStorage.setItem('token',  formData.value.password);
     
    } else {
      
        sessionStorage.setItem('Name', formData.value.email);
        sessionStorage.setItem('token', formData.value.password);
     
    }*/
      this.af.auth.signInWithEmailAndPassword(formData.value.email, formData.value.password).then((resolve) => {
        formData.reset();
       this.abrir = true;
       $(".modal-backdrop").css("display", "none");
      }).then(() => {
        this.af.authState.subscribe(authState => {
          if (authState) {
            console.log(authState);
            console.log(authState.displayName);
            console.log(authState.email);
            if (authState.displayName == "hire") {
             location.href = "/Hireprincipal";
            } else if (authState.displayName == "pro") {
              location.href = '/ProfilePro';
              console.log('pro')
            }
          }
        })
      }).catch(
        (err) => {
          console.log(err);
          if(err.code=="auth/user-not-found"){
            this.error = err.message;
            this.error2 = [];
            $("#exampleInputPassword1").removeClass("errorInput");
            $("#exampleInputEmail1").addClass("errorInput");


           
          }else if(err.code=="auth/wrong-password"){
            this.error2 = err.message;
            $("#exampleInputPassword1").addClass("errorInput");
            this.error=[];
            $("#exampleInputEmail1").removeClass("errorInput");
          }else{
            this.error = err.message;
          }
          return false;
        })
    }
  }
}
