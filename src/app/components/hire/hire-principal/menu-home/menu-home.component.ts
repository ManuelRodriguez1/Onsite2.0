import { Component, OnInit, ViewChild } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestore } from 'angularfire2/firestore';
import { NgForm, FormControl, Validators, FormBuilder } from '@angular/forms';
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
  reviews: any[] = []
  up = false;
  description;
  selectskills: any[] = [];
  skills = ['Concrete', 'Decorator', 'Drywall', 'Electrical', 'Excavation', 'Flooring', 'General Labor', 'Insulation', 'Interior Fishing Carpentry', 'Iron Worker', 'Landscaper', 'Mason', 'Plastering', 'Plumbing', 'Roofer', 'Waterproof Installation'];
  private contador = 4000 //Agreg
  projectname;
  peoples: any[] = [];
  people = 0;
  alerta=false;
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

  //formProject: FormGroup;
  submitted = false;
  pattern: ""

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
  
    if(i === -1){
      this.selectskills.push(e);
      this.peoples.push({"skill":e ,"quantity":""});
      console.log(this.peoples);
    }
   
    
    this.visiblePeople = true
  }

  close(e) {
    var i = this.selectskills.indexOf(e)
    

    if(i !== -1){
      this.selectskills.splice(i, 1)
      this.peoples.splice(i, 1)
    
      console.log(this.peoples);
    }
    this.visiblePeople = false
    
  }


  ngOnInit() {
 

    this.projects = []
    this.db.collection("users_hire").doc(this.user.uid).collection("projects").snapshotChanges()
    .subscribe((d) => {
      d.forEach((d) => {
        this.projects.push(d.payload.doc.data())
      })
      console.log(this.projects)
    })




  }

  onKey2(event){
    console.log(event.target.value.length) 
   }

  onKey(event){
    this.contador = 4000 - event.target.value.length 
   }

  /* Status Project
  1 = Pending, 2 = Active, 3 = Archived, 4 = Delete */
  addProject(f: NgForm) {

    
    console.log(f);
    console.log(f.status);
   this.projects = []
    this.error = 2
    this.submitted = true
    var aux = []


      $(".addPeople" ).each(function( index ) {
        var skill = $( this ).attr("id");
        var quantity = $( this ).val();
        if(quantity ==""){
          $("#"+quantity).removeClass("correctInput");
          $(".a"+skill).html("people is required");
          $("#"+quantity).addClass("errorInput");
        }else{
          $(".a"+skill).html("");
          $("#"+quantity).removeClass("errorInput");
          $("#"+quantity).addClass("correctInput");
        }

        aux.push({"skill":skill,"quantity":quantity})
      });

    if(f.status=="INVALID"  || f.value.passtest==false  || f.value.taketest==false || f.value.passtest===undefined  || f.value.taketest===undefined || this.selectskills == []){   


      if(f.value.projectname===undefined || f.value.projectname=="" || f.value.description===undefined || f.value.description==""
      || f.value.location===undefined || f.value.location==""|| f.value.estimated===undefined || f.value.estimated=="" ||
       this.selectskills.length==0  || f.value.enddate===undefined || f.value.enddate==""   || f.value.startdate===undefined || f.value.startdate==""
       || f.value.passtest===undefined || f.value.passtest==false || f.value.taketest===undefined || f.value.taketest==false){
        
        this.alerta=true;
      }
    } else if(f.value){
      var temp = false
   
      //this.peoples=aux;
      //console.log("holaaaa");
      //console.log(this.peoples)

   
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
  /*
  showModalDelete(){
    this.modal = 2
  }*/

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
      this.option = this.option + 5


     this.projects = []
      this.db.collection("users_hire").doc(this.user.uid).collection("projects").doc(idP).update({
        status: 4,
        statusname: 'Deleted',
      }).then((url) => {
        this.option = this.option - 5
      })
      
      this.modal = 3
      this.confirm = 0
    }
  }
  archivedStatus(idP){
    this.option = this.option + 5
 

    //this.option = e
/*
    this.modal = 2
    this.confirm2 = idP
    if( this.confirm == 1){*/
      this.projects = []
      this.db.collection("users_hire").doc(this.user.uid).collection("projects").doc(idP).update({
        status: 3,
        statusname: 'Archived',
      }).then((url) => {
       this.option = this.option - 5
      })
    
      //this.confirm = 0
   // }
  }

  confirmDelete(){
    this.confirm = 1
    this.delete(this.confirm2)
    this.error = 1
  }

  viewProject(p){
   this.selectskills = p.skills;
   this.peoples=p.people;
 



   this.files=p.briefmaterial;
    this.righttv='text-project'
    this.error = 2
    this.HomeFormularioNw = 2
    this.section = 0;
    this.viewP = p;
    
    this.apply=this.viewP.applyUsers;
    this.visiblePeople = true;
    if(this.apply){
      for (var i = 0; i < this.apply.length; i++) {
        this.db.collection("users_pro").doc(this.apply[i]).snapshotChanges()
          .subscribe((data)=>{
            var i = this.dataApply.push(data.payload.data());
           
         
          })
      }
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
    this.reviews.push({"id":this.user.uid,"rating":currentRate,"descripcion":review})
    console.log(this.reviews)
    this.LeaveForm = 0


    this.db.collection("users_pro").doc(this.profileP.id).set({
      reviews: this.reviews,
      
    }, {merge: true}).then((res)=>{
      alert(res);
   
    })
    .catch((error) => {
      alert(error.message)
    })

  }

}