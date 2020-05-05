import { Component, OnInit, NgModule } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import * as firebase from 'firebase/app';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from "@angular/router";
import { AngularFirestore } from "angularfire2/firestore";
import { AngularFireStorage } from "angularfire2/storage";

@Component({
  selector: 'app-pro',
  templateUrl: './pro.component.html',
  styleUrls: ['./pro.component.css']
})
export class ProComponent implements OnInit {

  cust = 0;
  select = 0;
  up = false;
  up2 = false;
  page = 0;
  selectskills: any[] = [];
  selectskills2 = null;
  title = ['Enter your information:', 'Select skills'];
  text = ['About You', 'Your Skills'];
  skills = ['Concrete', 'Decorator', 'Drywall', 'Electrical', 'Excavation', 'Flooring', 'General Labor', 'Insulation', 'Interior Fishing Carpentry', 'Iron Worker', 'Landscaper', 'Mason', 'Plastering', 'Plumbing', 'Roofer', 'Waterproof Installation'];
  skills2: any = []
  customers = ['Add certificate file'];
  customers2: any[] = [];
  database = firebase.database();
  notSame: boolean = false
  file: any[] = []
  checkbox: boolean = false

  constructor(private service: ServiceService, public afAuth: AngularFireAuth,
    private router: Router, private db: AngularFirestore, private afs: AngularFireStorage) { }

  ngOnInit() {

  }
  list(e) {
    if (e == 1) {
      this.up = !this.up;
    } else {
      this.up2 = !this.up2;
    }
  }
  next() {
    this.page++;
    this.select = this.page;
  }
  back() {
    this.page--;
    this.select = this.page;
  }
  selectskill(e) {
    // this.up = !this.up;
    var i = this.selectskills.indexOf(e)
    i === -1 && this.selectskills.push(e);    
    this.skills2 = [this.selectskills + ' Hanger', this.selectskills + ' Apprentice', 'Metal Framer',
      'Metal Framer Apprentice', this.selectskills + ' Finisher', 'Fire Taper'];
  }
  selectskill2(e) {
    this.up2 = !this.up2;
    this.selectskills2 = e
  }
  close(e) {
    var i = this.selectskills.indexOf(e)
    i !== -1 && this.selectskills.splice(i, 1)
    if (e == 2) {
      this.selectskills2 = null
    }
  }
  addcustomer() {
    this.customers.push('Add certificate file');
    this.cust = this.cust + 1;
    console.log(this.cust);
    
  }

  test(f: NgForm) {

    this.afAuth.auth.createUserWithEmailAndPassword(f.value.email, f.value.password).then(() => {
      var user = firebase.auth().currentUser;
      user.sendEmailVerification()
      user.updateProfile({
        displayName: f.value.name,
        photoURL: "",
      });

      this.db.collection('users_pro').doc(user.uid).set({
        id: user.uid,
        name: f.value.name,
        lastname: f.value.lastname,
        email: f.value.email,
        phone: f.value.phone,
        password: f.value.password,
        zipcode: f.value.zipcode,
        skills: this.selectskills,
        // specificSkills: this.selectskills2,
        // link: f.value.link,
        // description: f.value.description,
        estado: "pro",
        certificate: this.customers2
      })

      for (let i = 0; i < this.file.length; i++) {
        var fileDoc = this.afs.ref('Users_pro/' + user.uid + "/certificado_" + (i+1)).put(this.file[i])
        fileDoc.then((url) => {
          url.ref.getDownloadURL()
            .then((url) => {
              this.customers2.push(url)
              setTimeout(() => {
                this.db.collection('users_pro').doc(user.uid).update({
                  "certificate": this.customers2
                })
              }, 200);
            })
        })
      }
      this.router.navigate(['VerifyEmailPro'])
    }).catch((error) => {
      alert(error.message)
    })

  }
  uploadDoc(e){
    var i = this.cust
    this.file.push(e.target.files[0])
    this.customers[i] = e.target.files[0].name
    console.log(i);
    
  }
  check(){
    this.checkbox = !this.checkbox
  }
}
