import { Component, OnInit, ViewChild } from '@angular/core';
import * as firebase from 'firebase/app';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from "@angular/router";
import { AngularFirestore } from "angularfire2/firestore";
import { AngularFireStorage } from "angularfire2/storage";
declare var $: any

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
  customers = [{ 'name': 'Add certificate file', 'url': '' }];
  cv = [{ "name": 'Add a file', "url": '' }]
  cvClose: boolean = false
  countC: number = 0
  // Datos usuario
  cust: number = 0
  imageP: any = ''
  user = firebase.auth().currentUser
  profile: any = ''
  credential: any
  user_pro: any = this.af.collection("users_pro").doc(this.user.uid)

  constructor(
    public afAuth: AngularFireAuth,
    private af: AngularFirestore,
    private afs: AngularFireStorage,
    private router: Router,
  ) { }
  //Show data of User
  ngOnInit() {
    var data = this.user_pro.snapshotChanges()
    data.subscribe((d) => {
      this.profile = d.payload.data()
      this.selectskills = this.profile.skills
      
      if (this.profile.certificate != null && this.profile.certificate.length != 0) { 
        this.countC = this.customers.length; this.customers = this.profile.certificate }

      if (this.profile.photoUrl != null) { this.imageP = this.profile.photoUrl }

      this.credential = firebase.auth.EmailAuthProvider.credential(this.profile.email, this.profile.password)
      if (this.profile.cvUrl != null) {
        this.cv = this.profile.cvUrl
        if (this.profile.cvUrl[0].name == 'Add a file') { this.cvClose = false }
        else { this.cvClose = true }
      }
    })
  }
  //Show Option
  selectOption(e) {
    this.select = e
  }
  // Update account information
  accountForm(f: NgForm) {
    var col = this.user_pro
    if (f.value.name != '') { col.update({ "name": f.value.name }); $("#name").val(''); }
    if (f.value.lastname != '') { col.update({ "lastname": f.value.lastname }); $("#lastname").val('') }
    if (f.value.email != '') {
      this.user.reauthenticateAndRetrieveDataWithCredential(this.credential).then(() => {
        this.user.updateEmail(f.value.email)
          .then(() => {
            col.update({ "email": f.value.email })
          }).then(() => {
            this.user.sendEmailVerification()
            $("#email").val('')
          })
      })
    }
    if (f.value.description != '') { col.update({ "description": f.value.description }); $("#description").val('') }
  }
  //Update Password
  passForm(f: NgForm) {
    if (f.value.pass1 == f.value.pass2) {
      this.user.reauthenticateAndRetrieveDataWithCredential(this.credential).then(() => {
        this.user.updatePassword(f.value.pass2)
          .then(() => {
            this.user_pro.update({
              "password": f.value.pass2
            })
            $("#cPass, #pass1, #pass2").val('')
            setTimeout(() => {
              $("#cPass, #pass1, #pass2").removeClass("errorInput correctInput")
              $("#cPass, #pass1, #pass2").next('span').attr('hidden', true)
            }, 200);
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
            this.user_pro.update({
              "photoUrl": this.imageP
            })
          }, 200);
        })
    })
  }
  //Section CV
  uploadCV(e: any) {
    var cv = this.afs.ref('Users_pro/' + this.user.uid + "/CV/" + e.target.files[0].name).put(e.target.files[0])
    cv.then((url) => {
      url.ref.getDownloadURL()
        .then((url) => {
          setTimeout(() => {
            this.user_pro.update({
              "cvUrl": [{ "name": e.target.files[0].name, "url": url }]
            })
          }, 200);
        })
    })
  }
  deleteCV(e: any) {
    this.afs.ref('Users_pro/' + this.user.uid + '/CV/' + e.name).delete()
    this.user_pro.update({
      "cvUrl": [{ "name": 'Add a file', "url": '' }]
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
    this.user_pro.update({
      "skills": this.selectskills
    })
  }
  //Section Certificate
  addcustomer() {
    this.customers.push({ 'name': 'Add certificate file', 'url': '' });
    this.cust = this.customers.length - 1;
  }

  uploadCert(e) {
    var fileDoc = this.afs.ref('Users_pro/' + this.user.uid + "/" + e.target.files[0].name).put(e.target.files[0])
    fileDoc.then((url) => {
      url.ref.getDownloadURL()
        .then((url) => {
          this.customers[this.cust] = { "name": e.target.files[0].name, "url": url }
          setTimeout(() => {
            this.af.collection('users_pro').doc(this.user.uid).update({
              "certificate": this.customers
            })
          }, 200);
        })
    })
  }

  deleteCert(e: any) {
    var i = this.customers.indexOf(e);
    if (i !== -1) {
      this.afs.ref('Users_pro/' + this.user.uid + "/" + e.name).delete()
      this.customers.splice(i, 1)
      setTimeout(() => {
        this.user_pro.update({
          "certificate": this.customers
        })
      }, 200);
    }
    if (this.customers.length == 0) {
      this.customers = [{ 'name': 'Add certificate file', 'url': '' }];
      this.countC = 0
    }
  }

}
