import { Component, OnInit, ViewChild } from '@angular/core';
import * as firebase from 'firebase/app';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from "@angular/router";
import { AngularFirestore } from "angularfire2/firestore";
import { AngularFireStorage } from "angularfire2/storage";

@Component({
  selector: 'app-profile-pro',
  templateUrl: './profile-pro.component.html',
  styleUrls: ['./profile-pro.component.css']
})
export class ProfileProComponent implements OnInit {

  text = 'Profile';
  righttv = '' 
  select = 1
  lat: number = 51.678418;
  lng: number = 7.809007;
  menushow = false
  project = false
  // Datos usuario
  name: string = ''
  lastName: string = ''
  constructor(
    public afAuth: AngularFireAuth, 
    private af: AngularFirestore,
    private afs: AngularFireStorage,
    private router: Router
    ) { }

  ngOnInit() {
    var user = firebase.auth().currentUser
    var data = this.af.collection("users_pro").doc(user.uid).get()
    data.subscribe((d)=>{
      this.name = d.data().name
      this.lastName = d.data().lastname
    })
  }

  selectOption(e){
    this.select = e
  }

}
