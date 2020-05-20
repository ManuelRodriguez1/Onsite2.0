import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFirestore } from "angularfire2/firestore";
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as $ from 'jquery';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  error="";
  error1="";
  database = firebase.database();
  today = new Date(Date.parse(Date()));
  registerForm: FormGroup;
  submitted = false;
  constructor(public afAuth: AngularFireAuth,private db: AngularFirestore,private formBuilder: FormBuilder) { 
  }
  


  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
  });
  }

  get f() { return this.registerForm.controls; }

  test(f: NgForm){

    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

let email=JSON.stringify(this.registerForm.value.email);
      

     this.db.collection("subscribers").add({
        email:email ,
        date: this.today
    })
    .then(function(docRef) {

       
       $("#error1").html("Success");
        $("#emailFooter").val("");


    })
    .catch((err) => {
     // this.error1 = "* "+err.message;
     $("#error1").html(err);

      console.log(err);
    });
    }
    
    

  
}
