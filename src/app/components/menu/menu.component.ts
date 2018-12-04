import { Component, OnInit } from '@angular/core';
//import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
error: any[];
  m = "menuHome";

constructor(location: Location ) {

if(location.path() != ''){
  if(location.path() == '/Hire'){
      this.m = "menuHire";
  }else if(location.path() == '/Pro'){
      this.m = "menuPro";
  }
 }
}
  ngOnInit() {

  }
  onSubmit(formData) {
  alert("holaaa");
   }
}
