import { Component, OnInit, ViewChild } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestore } from 'angularfire2/firestore';
import { NgForm } from '@angular/forms';
import { ProjectService } from '../../../../services/project.service';
import { HireuserService } from 'src/app/services/hireuser.service';
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
  apply: any[] = [];
  dataApply:any[] = [];

  constructor(private db: AngularFirestore, 
    public projectService: ProjectService,
    public afAuth: AngularFireAuth,
    private afs: AngularFireStorage,
    private hireuser: HireuserService,
    private routerr: Router) {
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
    this.db.collection("users_hire").doc(this.user.uid).collection("projects").ref.where("status", ">", 0).where("status", "<", 4)
    .onSnapshot((d) => {
      d.docChanges().forEach((d) => {
        if (d.type === "added") {
          console.log("New project: ", d.doc.data())
          this.projectsHire.push([d.doc.data()])
        }
        if (d.type === "modified") {
          console.log("Modified project: ", d.doc.data())
          this.projectsHire.forEach((data)=>{
            if(data[0].id === d.doc.data().id){
              this.projectsHire.splice(data[0],1,d.doc.data())
              console.log(this.projectsHire)
            }
          })
        }
        if (d.type === "removed") {
          console.log("Removed project: ", d.doc.data())
          var elim = d.doc.data().id
          console.log(elim)
          for (var i = 0; i < this.projectsHire.length; i++) {
            if (this.projectsHire[i][0].id === elim) {
              console.log(i)
              this.projectsHire.splice(i, 1);
            }
          }
          console.log(this.projectsHire);
          /* var t = this.projectsHire.map(item => item.id).indexOf(d.doc.data().id)
          console.log(t) */
          /* this.projectsHire.forEach((data)=>{
            if(data[0].id === d.doc.data().id){
              this.projectsHire.splice(data[0],1)
              console.log(this.projectsHire)
            }
          }) */
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
    this.error = 2
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
    this.error = 2
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
    this.modal = 2
    this.confirm2 = idP
    if( this.confirm == 1){
      this.db.collection("users_hire").doc(this.user.uid).collection("projects").doc(idP).update({
        status: 4,
        statusname: 'Deleted',
      })
      this.modal = 3
      this.confirm = 0
    }
  }

  confirmDelete(){
    this.confirm = 1
    this.delete(this.confirm2)
    this.error = 1
  }

  viewProject(idApply){
    this.righttv='text-project'
    this.error = 2
    this.HomeFormularioNw = 2
    this.section = 0;
    var data = this.db.collection("users_hire").doc(this.user.uid).collection("projects").doc(idApply).snapshotChanges()
    data.subscribe((d) => {
      this.viewP = d.payload.data()
    })
    this.db.collection("users_hire").doc(this.user.uid).collection("projects").doc(idApply).snapshotChanges()
      .subscribe((d) => {
        this.viewP = d.payload.data()
        this.apply = this.viewP.applyUsers
        console.log(this.apply)
        for (var i = 0; i < this.apply.length; i++) {
          this.db.collection("users_pro").doc(this.apply[i]).snapshotChanges()
            .subscribe((data)=>{
              this.dataApply.push(data.payload.data())
              console.log(this.dataApply)
            })
        }
      })
  }

  goToProfile(id: number){
    this.routerr.navigate(['/ProfileApply',id])
    console.log("ok")
  }

}