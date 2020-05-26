import { Component, OnInit, ViewChild } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestore } from 'angularfire2/firestore';
import { NgForm } from '@angular/forms';
import { ProjectService } from '../../../../services/project.service';
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from "@angular/router";
import { AngularFireStorage } from "angularfire2/storage";
import {formatDate} from '@angular/common';
import { last } from '@angular/router/src/utils/collection';


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

  files = [{ 'name': 'Add material file', 'url': '' }];
  file: any[] = [];
  countC: number = 0

  skills2Howmany: any[] = [];
  cust = 0;
  router: any;

  projects=[];
  projectsHire: any[] = [];
  projectsHirePending: any[] = [];
  projectsHireActive: any[] = [];
  projectsHireArchived: any[] = [];
  projectsHireDeleted: any[] = [];

  section: number = 1;
  text: any[] = ["Project", "Projects","New Project"];
  righttv = 'text-dashboard';

  user = firebase.auth().currentUser
  user_hire: any = this.db.collection("users_hire").doc(this.user.uid)
  option = 1;

  customers2: any[] = [];

  viewP: any = ''

  profile: any = ''
  modal: number = 0
  confirm: number = 0
  confirm2 = ''
  error = 0

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
    this.db.collection("users_hire").doc(this.user.uid).collection("projects").ref.where("status", ">", 0).where("status", "<", 3)
    .onSnapshot({ includeMetadataChanges: true }, (d) => {
      d.docChanges().forEach((d) => {
        this.projectsHire.push([d.doc.data()])
        if(d.doc.data().status === 2){
          this.projectsHireActive.push(d.doc.data())
        }if(d.doc.data().status == 1){
          this.projectsHirePending.push(d.doc.data())
        }if(d.doc.data().status == 3){
          this.projectsHireArchived.push(d.doc.data())
        }
        if(d.type === 'modified'){
          this.projectsHire.forEach((data)=>{
            if(data[0].t == d.doc.data().t){
              this.projectsHire.splice(data, 1)
            }
          })
        }/* else if(d.type === 'added'){
          this.projectsHire.forEach((data)=>{
            if(data[0].status === 2){
              this.projectsHireActive.push(data)
            }if(data[0].status == 1){
              this.projectsHireDeleted.push(data)
            }if(data.status == 3){
              this.projectsHireArchived.push(data)
            }
          })
        } */else if(d.type === 'removed'){
          this.projectsHire.forEach((data)=>{
            if(data[0].t == d.doc.data().t){
              this.projectsHire.pop()
              this.projectsHire.splice(this.projectsHire.indexOf(data),1)
            }
          })
        }
      })
    })
  }

  addPeople(e){
    this.skills2Howmany.push(e)
  }

  /* Status Project
  1 = Pending
  2 = Active
  3 = Archived
  4 = Delete */

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
      status: 1,
      statusname: 'Pending',
      briefmaterial: this.files
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
    }).then(()=>{
      this.modal = 1
    })
    .catch((error) => {
      alert(error.message)
    })
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
    this.files.push({ 'name': 'Add material file', 'url': '' });
    this.cust = this.files.length - 1;
  }

  uploadDoc(e){
    /* var i = this.cust
    this.file.push(e.target.files[0])
    this.files[i] = e.target.files[0].name
    this.files[i] = {"name": e.target.files[0].name,"url":e.target.files[0].name}
     */
    var fileDoc = this.afs.ref('Users_hire/' + this.user.uid + "/" + e.target.files[0].name).put(e.target.files[0])
    fileDoc.then((url) => {
      url.ref.getDownloadURL()
        .then((url) => {
          this.files[this.cust] = { "name": e.target.files[0].name, "url": url }
        })
    })
  }
  selectOption(e) {
    this.option = e
  }

  showModal(){
    this.modal = 1
  }
  showModalDelete(){
    this.modal = 2
  }

  hideModal() {
    this.modal = 3
    this.select = 0
    this.HomeFormularioNw = 0
  }

  deleteBriefMaterial(e: any) {
    var i = this.files.indexOf(e);
    if (i !== -1) {
      this.afs.ref('Users_pro/' + this.user.uid + "/" + e.name).delete()
      this.files.splice(i, 1)
      setTimeout(() => {
        this.user_hire.update({
          "briefmaterial": this.files
        })
      }, 200);
    }
    if (this.files.length == 0) {
      this.files = [{ 'name': 'Add material file', 'url': '' }];
      this.countC = 0
    }
  }

  delete(idP){
    this.showModalDelete()
    console.log(this.confirm)
    console.log(idP)
    this.confirm2 = idP
    if( this.confirm == 1){
      this.db.collection("users_hire").doc(this.user.uid).collection("projects").doc(idP).update({
        status: 4,
        statusname: 'Deleted',
      })
      this.modal = 3
    }else{
      this.confirm = 0
    }
  }

  confirmDelete(){
    this.confirm = 1
    console.log(this.confirm)
    this.delete(this.confirm2)
    this.error = 1
  }

  viewProject(idApply){
    this.HomeFormularioNw = 2
    this.section = 0;
    var data = this.db.collection("users_hire").doc(this.user.uid).collection("projects").doc(idApply).snapshotChanges()
    data.subscribe((d) => {
      this.viewP = d.payload.data()
    })
  }

}