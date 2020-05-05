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
  // Variables eventos
  up: boolean = false
  skills: any[] = ['Concrete', 'Decorator', 'Drywall', 'Electrical', 'Excavation', 'Flooring', 'General Labor', 'Insulation', 'Interior Fishing Carpentry', 'Iron Worker', 'Landscaper', 'Mason', 'Plastering', 'Plumbing', 'Roofer', 'Waterproof Installation'];
  selectskills: any[] = [];
  customers = ['Add certificate file'];
  // Datos usuario
  imageP: any = ''
  user = firebase.auth().currentUser
  name: string = ''
  lastName: string = ''
  email: string = ''

  constructor(
    public afAuth: AngularFireAuth,
    private af: AngularFirestore,
    private afs: AngularFireStorage,
    private router: Router
  ) { }

  ngOnInit() {
    var data = this.af.collection("users_pro").doc(this.user.uid).get()
    data.subscribe((d) => {
      this.name = d.data().name
      this.lastName = d.data().lastname
      this.email = d.data().email
      this.selectskills = d.data().skills
      if(d.data().photoUrl != null){ this.imageP = d.data().photoUrl}
    })
  }

  selectOption(e) {
    this.select = e
  }

  imageProfile(e) {
    this.afs.ref('Users_pro/' + this.user.uid + "/imageProfile").delete()
    var image = this.afs.ref('Users_pro/' + this.user.uid + "/imageProfile").put(e.target.files[0])
    image.then((url) => {
      url.ref.getDownloadURL()
        .then((url) => {
          this.imageP = url
          setTimeout(() => {
            this.af.collection("users_pro").doc(this.user.uid).update({
              "photoUrl": this.imageP
            })
          }, 200);
        })
    })
  }

  list() {
    this.up = !this.up;
  }

  selectskill(e) {
    var i = this.selectskills.indexOf(e)
    i === -1 && this.selectskills.push(e);
  }

  close(e) {
    var i = this.selectskills.indexOf(e)
    i !== -1 && this.selectskills.splice(i, 1)
  }

  updateSkills() {
    this.af.collection("users_pro").doc(this.user.uid).update({
      "skills": this.selectskills
    })
  }

}
