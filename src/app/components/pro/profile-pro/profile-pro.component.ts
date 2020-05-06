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
  cust: number = 0
  imageP: any = ''
  user = firebase.auth().currentUser
  name: string = ''
  lastName: string = ''
  email: string = ''
  pass: string = ''
  credential: any

  constructor(
    public afAuth: AngularFireAuth,
    private af: AngularFirestore,
    private afs: AngularFireStorage,
    private router: Router
  ) { }
//Show data of User
  ngOnInit() {
    console.log(this.user);
    console.log(this.afAuth.auth.currentUser);
    var data = this.af.collection("users_pro").doc(this.user.uid).get()
    data.subscribe((d) => {
      this.name = d.data().name
      this.lastName = d.data().lastname
      this.email = d.data().email
      this.pass = d.data().password
      this.selectskills = d.data().skills
      if(d.data().photoUrl != null){ this.imageP = d.data().photoUrl}
      this.credential = firebase.auth.EmailAuthProvider.credential(this.user.email, d.data().password)
    })
  }
//Show Option
  selectOption(e) {
    this.select = e
  }
  //Update Password
  passForm(f: NgForm){
    if(f.value.pass1 == f.value.pass2){
      this.user.reauthenticateWithCredential(this.credential).then(()=>{
        this.user.updatePassword(f.value.pass2)
        .then(()=>{
          this.af.collection("users_pro").doc(this.user.uid).update({
            "password": f.value.pass2
          })
        })
      })
    }
  }
  //Update Image Profile
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
//Section Skills
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
//Section Certificate
  addcustomer() {
    this.customers.push('Add certificate file');
    this.cust = this.cust + 1;    
  }

}
