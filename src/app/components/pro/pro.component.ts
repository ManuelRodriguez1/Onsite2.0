import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import * as firebase from 'firebase/app';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from "@angular/router";

@Component({
  selector: 'app-pro',
  templateUrl: './pro.component.html',
  styleUrls: ['./pro.component.css']
})
export class ProComponent implements OnInit {

  cust = 4;
  select = 0;
  up = false;
  up2 = false;
  page = 0;
  selectskills = null;
  selectskills2 = null;
  title = ['Enter your information:', 'Select skills', 'Reviews'];
  text = ['About You', 'Your Skills'];
  skills = ['Concrete', 'Decorator', 'Drywall', 'Electrical', 'Excavation', 'Flooring', 'General Labor', 'Insulation', 'Interior Fishing Carpentry', 'Iron Worker', 'Landscaper', 'Mason', 'Plastering', 'Plumbing', 'Roofer', 'Waterproof Installation'];
  skills2: any = []
  customers = ['Customer 1', 'Customer 2', 'Customer 3'];
  customers2 = '';
  database = firebase.database();

  constructor(private service: ServiceService, public afAuth: AngularFireAuth, private router: Router) { }

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
    this.up = !this.up;
    this.selectskills = e;
    this.skills2 = [this.selectskills+' Hanger', this.selectskills+' Apprentice', 'Metal Framer',
    'Metal Framer Apprentice', this.selectskills+' Finisher', 'Fire Taper'];
  }
  selectskill2(e) {
    this.up2 = !this.up2;
    this.selectskills2 = e
  }
  close(e) {
    if(e == 1){
      this.selectskills = null
      this.selectskills2 = null
    }
    if (e == 2) {
      this.selectskills2 = null
    }
  }
  addcustomer() {
    var i = this.cust++;
    this.customers.push('Customer ' + i);
  }

  test(f: NgForm){
    this.database.app.auth().createUserWithEmailAndPassword(f.value.user, f.value.password).then(()=>{
      this.database.ref('/users_pro').push({
        name: f.value.name,
        lastname: f.value.lastname,
        email: f.value.email,
        phone: f.value.phone,
        user: f.value.user,
        zipcode: f.value.zipcode,
        skills: this.selectskills,
        specificSkills: this.selectskills2,
        link: f.value.link,
        description: f.value.description,
        estado:"pro"
      })
      this.router.navigate(['ProfilePro'])
    }).catch((error)=>{
      alert(error.message)
    })
  }
}
