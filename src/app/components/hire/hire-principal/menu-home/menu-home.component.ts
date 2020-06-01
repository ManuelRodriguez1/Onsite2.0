import { Component, OnInit, ViewChild } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestore } from 'angularfire2/firestore';
import { NgForm } from '@angular/forms';
import { ProjectService } from '../../../../services/project.service';
import { HireuserService } from 'src/app/services/hireuser.service';
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from "@angular/router";
import { AngularFireStorage } from "angularfire2/storage";
import {FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-menu-home',
  templateUrl: './menu-home.component.html',
  styleUrls: ['./menu-home.component.css']
})
export class MenuHomeComponent implements OnInit {
  ctrl = new FormControl(null, Validators.required)
  reviews: any[] = []
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
  profileP: any = ''
  modal: number = 0
  confirm: number = 0
  confirm2 = ''
  error = 0
  apply: any[] = [];
  dataApply:any[] = [];

  LeaveForm = 0

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
        }
      })
    })
  }

  addPeople(e){
    this.skills2Howmany.push(e)
  }

  /* Status Project
  1 = Pending, 2 = Active, 3 = Archived, 4 = Delete */
  addProject(f: NgForm) {
    this.error = 2
    this.projectService.newProject(f, this.file, this.files, this.selectskills)
    this.db.collection("users_hire").doc(this.user.uid).collection("projects").ref.where("status", ">", 0).where("status", "<", 4)
    .onSnapshot((d) => {
      d.docChanges().forEach((d) => {
        if (d.type === "added") {
          this.modal = 1
          this.section = 1
        }
      })
    })
  }

  next() {
    this.error = 2
    this.page++;
    this.HomeFormularioNw++;
    this.section = 2;
    this.righttv='text-new-project';
  }

  addfiles() {
    this.files.push({ 'name': 'Add material file', 'url': '' });
    this.cust = this.files.length - 1;
  }

  uploadDoc(e) {
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
    this.select = 0
    this.HomeFormularioNw = 0
    this.modal = 3
    console.log(this.modal)
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

  goToProfile(id){
    this.HomeFormularioNw = 3
    this.section = 4
    this.db.collection("users_pro").doc(id).snapshotChanges().subscribe((d) => {
      this.profileP = d.payload.data()
      console.log(this.profileP)
    })
  }

  goToEditProject(idP: number){
    this.routerr.navigate(['/ProjectEdit',idP])
    console.log("ok")
  }

  leave(){
    this.LeaveForm = 1
  }
  cancelRate(){
    this.LeaveForm = 0
  }

  postReview(currentRate, review){
    this.reviews.push({"hire":this.user.uid,"rating":currentRate,"review":review})
    console.log(this.reviews)
    //this.hireUser.applyRating(this.route.snapshot.paramMap.get('id'),this.reviews)
    this.LeaveForm = 0
  }

}