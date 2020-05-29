import { Component, OnInit, Output } from '@angular/core';
import { AngularFirestore } from "angularfire2/firestore";
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";
import firebase = require('firebase');

@Component({
  selector: 'app-menu-projects',
  templateUrl: './menu-projects.component.html',
  styleUrls: ['./menu-projects.component.css']
})
export class MenuProjectsComponent implements OnInit {

  project: any = ''
  user = firebase.auth().currentUser
  HomeFormularioNw = 1
  selectskills: any[] = [];
  up = false;
  option = 1;
  skills = ['Concrete', 'Decorator', 'Drywall', 'Electrical', 'Excavation', 'Flooring', 'General Labor', 'Insulation', 'Interior Fishing Carpentry', 'Iron Worker', 'Landscaper', 'Mason', 'Plastering', 'Plumbing', 'Roofer', 'Waterproof Installation'];



  constructor(
    private route: ActivatedRoute,
    private af: AngularFirestore,
    private routerr: Router) { }

    ngOnInit() {
    this.af.collection("users_hire").doc(this.user.uid).collection("projects").doc(this.route.snapshot.paramMap.get('id')).snapshotChanges().subscribe((d) => {
      this.project = d.payload.data()
      this.selectskills = this.project.skills
      console.log(this.project)
    })
  }
  list(e) {
    if (e == 1) {
      this.up = !this.up;
    }
  }

  selectskill(e) {
    var i = this.selectskills.indexOf(e)
    i === -1 && this.selectskills.push(e);
  }

  close(e) {
    var i = this.selectskills.indexOf(e)
    i !== -1 && this.selectskills.splice(i, 1)
  }

  selectOption(e) {
    this.option = e
  }

  
}
