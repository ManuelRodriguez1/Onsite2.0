import { Component, OnInit, ViewChild } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestore } from 'angularfire2/firestore';
import { NgForm } from '@angular/forms';
import { ProjectService } from '../../../../services/project.service';
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from "@angular/router";
import { AngularFireStorage } from "angularfire2/storage";
import {formatDate} from '@angular/common';


@Component({
  selector: 'app-menu-home',
  templateUrl: './menu-home.component.html',
  styleUrls: ['./menu-home.component.css']
})
export class MenuHomeComponent implements OnInit {
  up = false;
  selectskills: any[] = [];
  skills = ['Concrete', 'Decorator', 'Drywall', 'Electrical', 'Excavation', 'Flooring', 'General Labor', 'Insulation', 'Interior Fishing Carpentry', 'Iron Worker', 'Landscaper', 'Mason', 'Plastering', 'Plumbing', 'Roofer', 'Waterproof Installation'];

  projectname;
  peoples = [];
  people = 0;

  howmany = "Select";

  page = 1;
  select = 0;
  HomeFormularioNw = 0;

  files = ['Add files'];
  file: any[] = [];


  skills2Howmany: any[] = [];
  cust = 0;
  router: any;

  projects=[];
  projectsHire: any[] = [];
  projectsHirePending: any[] = [];

  section: number = 1;
  text: any[] = ["Dashboard", "Projects","New Project"];
  righttv = 'text-dashboard';

  user = firebase.auth().currentUser
  option = 1;

  customers2: any[] = [];

  constructor(private db: AngularFirestore, 
    public projectService: ProjectService,
    public afAuth: AngularFireAuth,
    private afs: AngularFireStorage) {
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

  ngOnInit() {
    this.db.collection("users_hire").doc(this.user.uid).collection("projects").get()
      .toPromise().then(querySnapshot => {
          querySnapshot.forEach(doc => {
              let commentData = doc.data();
              if(commentData["status"]== "Pending"){
                this.projectsHirePending.push(commentData);
              }
              this.projectsHire.push(commentData);
          });
      });
  }

  addPeople(e){
    this.skills2Howmany.push(e)
  }

  addProject(f: NgForm) {
    var currentDate = new Date();
    var idP = this.db.createId();
    this.db.collection("users_hire").doc(this.user.uid).collection("projects").doc(idP).set({
      id: idP,
      projectname: f.value.projectname,
      creationdate: currentDate,
      description: f.value.description,
      location: f.value.location,
      estimated: f.value.estimated,
      startdate: f.value.startdate,
      enddate: f.value.enddate,
      taketest: f.value.taketest,
      passtest: f.value.passtest,
      skills: this.selectskills,
      status: 'Active',
      briefmaterial: this.customers2
    }).then(()=>{
      for (let i = 0; i < this.file.length; i++) {
        var fileDoc = this.afs.ref('Users_hire/' + this.user.uid + "/"+this.file[i].name).put(this.file[i])
        fileDoc.then((url) => {
          url.ref.getDownloadURL()
            .then((url) => {
              this.customers2.push({"name": this.file[i].name, "url": url})
              setTimeout(() => {
                this.db.collection('users_hire').doc(this.user.uid).update({
                  "project": true
                })
                this.db.collection('users_hire').doc(this.user.uid).collection("projects").doc(idP).update({
                  'briefmaterial': this.customers2
                })
              }, 200);
            })
        })
      }
    })
    .catch((error) => {
      alert(error.message)
    })
    this.HomeFormularioNw = 0;
  }

  reload(){
    location.reload();
  }
  getStarted() {
    this.HomeFormularioNw = 1;
  }
  next() {
    this.page++;
    this.HomeFormularioNw++;
    this.section = 2;
    this.righttv='text-new-project';
  }

  back() {
    this.page--;
    this.HomeFormularioNw = this.page;
  }

  addfiles() {
    this.files.push('Add a file');
    this.cust = this.cust + 1;
    console.log(this.cust);
  }

  uploadDoc(e){
    var i = this.cust
    this.file.push(e.target.files[0])
    this.files[i] = e.target.files[0].name
  }
  selectOption(e) {
    this.option = e
  }
}