import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as $ from 'jquery';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error: any[];
  error2: any[];
  error3:any[]=[];
  password;
  email;
  ocultarForgot=false;
  cerrarAbrir = "";
  abrir = false;
  activar=true;
  activar1=false;
  pagina = "";
  childData = [];
  Forgot = 0;
  list = "";
rtrespuesta="";
vmactivo;
modal : NgbModalRef;

  constructor(public af: AngularFireAuth, private router: Router,private modalService: NgbModal) {



  }

  hire() {
    this.poppad1();
    this.router.navigateByUrl("/Hire");
    
    // location.href ="/Hire";

  }

  pro() {
    this.poppad1();
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
checkbox(){
  if ($("#loginCheckbox").length == $("#loginCheckbox:checked").length) {  
      localStorage.setItem('checked', $('#loginCheckbox').prop('checked'));
      localStorage.setItem('email', $(".emailLogin").val());
  } else {  
    localStorage.removeItem('email');
    localStorage.removeItem('checked');
    this.vmactivo=false;
  }  
}
onRecuperation(formData) {
var array=[];


  if(formData.valid) {
    var auth = firebase.auth();
    var emailAddress = formData.value.emailreset;

    auth.sendPasswordResetEmail(emailAddress).then(function() {
   
      
  
        $("#exampleInputEmail1").val("");
        $("#exampleInputEmail1").removeClass("errorInput");
        $(".ocultarForgot").html("Check email");
    })

  }

}

  ngOnInit() {

 

    if(localStorage.getItem('checked')){
      
      this.email=localStorage.getItem('email');
      this.vmactivo=true;


    }
 

  }

  poppad2() {
    
    $('#exampleModal').removeClass('show');
    $('#exampleModal').addClass('hide');
    $('#exampleModal').css('display','none');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();

}

poppad1() {
  $('#mi_modal').removeClass('show');
  $('#mi_modal').addClass('hide');
  $('#mi_modal').css('display','none');
  $('body').removeClass('modal-open');
  $('.modal-backdrop').remove();

}
  onSubmit(formData) {
    if (formData.valid) {
  
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
