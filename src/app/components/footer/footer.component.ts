import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFirestore } from "angularfire2/firestore";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  error = "";
  error1 = "";
  database = firebase.database();
  today = new Date(Date.parse(Date()));
  registerForm: FormGroup;
  submitted = false;
  progress: number = 0
  progressBar: boolean = false
  constructor(public afAuth: AngularFireAuth, private db: AngularFirestore, private formBuilder: FormBuilder) {
  }



  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get f() { return this.registerForm.controls; }

  test() {
    this.progressBar = true
    this.submitted = true;



    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }else{
      let i;
      for ( i = 0; i <= 50; i++) {
        setTimeout(() => {
          this.progress++ 
        }, 100);
        
      }
    }

    let email = JSON.stringify(this.registerForm.value.email);


    this.db.collection("subscribers").add({
      email: email,
      date: this.today
    })
      .then((docRef) => {
        for (let i = 50; i <= 98; i++) {
          setTimeout(() => {
            this.progress++
            if(this.progress==98){
              $("#error1").html("Thank you for subscribing!");
            
            }
            
            
          }, 100);
          
        }
         setTimeout(() => {
           this.progressBar = false
           this.progress = 0
           $("#error1").html("");
           $("#emailFooter").val("");
         }, 10000)
         



      })
      .catch((err) => {
        // this.error1 = "* "+err.message;
        $("#error1").html(err);

        console.log(err);
      });



  }


  arrowTop() {
    $('html, body').animate({ scrollTop: 0 }, 600);

  }



}
