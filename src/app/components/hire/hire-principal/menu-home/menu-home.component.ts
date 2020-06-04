import { Component, OnInit, ViewChild } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestore } from 'angularfire2/firestore';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ProjectService } from '../../../../services/project.service';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireStorage } from "angularfire2/storage";
import * as $ from 'jquery';

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
  peoples: any[] = [];
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

  projects: any[] = []

  projectsHire: any[] = [];
  projectsHireDeleted: any[] = [];

  section: number = 1;
  text: any[] = ["Project", "Projects","New Project"];
  righttv = 'text-dashboard';

  user = firebase.auth().currentUser
  user_hire: any = this.db.collection("users_hire").doc(this.user.uid)
  option = 5;

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

  sProject: string = ''

  visiblePeople = false

  formProject: FormGroup;
  submitted = false;
  pattern: ""

  constructor(private db: AngularFirestore,
    public projectService: ProjectService,
    public afAuth: AngularFireAuth,
    private afs: AngularFireStorage,
    private formBuilder: FormBuilder) {

  }

  list(e) {
    if (e == 1) {
      this.up = !this.up;
    }
  }

  selectskill(e) {
    var i = this.selectskills.indexOf(e)
    i === -1 && this.selectskills.push(e);
    this.visiblePeople = true
  }

  close(e) {
    var i = this.selectskills.indexOf(e)
    i !== -1 && this.selectskills.splice(i, 1)
    this.visiblePeople = false
  }

  ngOnInit() {
    this.formProject = this.formBuilder.group({
      projectname: ['', Validators.required],
      description: ['', [Validators.required,Validators.maxLength(4000)]],
      location: ['', Validators.required],
      estimated: ['',[Validators.required, Validators.pattern('^[0-9]*$')]],
      startdate: ['', Validators.required],
      enddate: ['', Validators.required],
      id: [''],
      taketest:[''],
      passtest:['']
    });
    this.projects = []
    this.db.collection("users_hire").doc(this.user.uid).collection("projects").snapshotChanges()
    .subscribe((d) => {
      d.forEach((d) => {
        this.projects.push(d.payload.doc.data())
      })
      console.log(this.projects)
    })
  }

  get f() { return this.formProject.controls; }

  

  /* Status Project
  1 = Pending, 2 = Active, 3 = Archived, 4 = Delete */
  addProject(f: NgForm) {
    this.projects = []
    this.error = 2
    this.submitted = true
    var aux = []
    if(this.formProject.invalid){
      console.log("Ivalid")
    }else{
      console.log("ok")
      console.log(this.formProject.value)
      var temp = false
      $( ".addPeople" ).each(function( index ) {
        var skill = $( this ).attr("id");
        var quantity = $( this ).val();
        console.log(skill+quantity)
        aux.push({"skill":skill,"quantity":quantity})
      });
      f.value.taketest = true;
      f.value.passtest = true;
      console.log(f.value)
      this.projectService.newProject(f, this.file, this.files, this.selectskills, aux)
      this.modal = 1
      this.section = 1
    }

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
    //location.href="/Hireprincipal"
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
    this.projects = []
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

  viewProject(p){
   this.selectskills = p.skills;
   this.files=p.briefmaterial;
    this.righttv='text-project'
    this.error = 2
    this.HomeFormularioNw = 2
    this.section = 0;
    this.viewP = p;
    this.apply=this.viewP.applyUsers;
    for (var i = 1; i < this.apply.length; i++) {
      this.db.collection("users_pro").doc(this.apply[i]).snapshotChanges()
        .subscribe((data)=>{
          this.dataApply.push(data.payload.data())
          console.log(this.dataApply)
        })
    }
 
  }

  goToProfile(id){
    this.HomeFormularioNw = 3
    this.section = 4
    this.db.collection("users_pro").doc(id).snapshotChanges().subscribe((d) => {
      this.profileP = d.payload.data()
      console.log(this.profileP)
    })
  }

  goToEditProject(idP){

    this.HomeFormularioNw =1;
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
    this.LeaveForm = 0
  }

}