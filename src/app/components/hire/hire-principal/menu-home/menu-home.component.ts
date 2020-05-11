import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestore } from 'angularfire2/firestore';
import { NgForm } from '@angular/forms';
import { ProjectService } from '../../../../services/project.service';

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


  skills2Howmany: any = ["1", "2", "3", "4", "5"];
  cust = 0;
  router: any;

  projects=[];

  section: number = 1;
  text: any[] = ["Dashboard", "Projects","New Project"];
  righttv = 'text-dashboard';

  constructor(private db: AngularFirestore, public projectService: ProjectService) {
  }

  list(e) {
    if (e == 1) {
      this.up = !this.up;
    }
  }

  onItemDeSelect(){
    this.peoples.pop();
  }
  selectskill(e) {
    // this.up = !this.up;
    var i = this.selectskills.indexOf(e)
    i === -1 && this.selectskills.push(e);
  }

  close(e) {
    var i = this.selectskills.indexOf(e)
    i !== -1 && this.selectskills.splice(i, 1)
  }

  ngOnInit() {
    /* this.childData = this.db.collection('/projectsHire').valueChanges()
    this.childData1 = this.db.collection('/projectsHire').valueChanges() */
    this.projectService.getProjects().subscribe(projects =>{
      this.projects = projects;
      if(projects.length>0){
        this.section = 1;
        this.righttv = 'text-project'
      }else{
        this.righttv = 'text-dashboard'
      }
    })
  }

  final(f: NgForm) {
    var user = firebase.auth().currentUser;

      this.db.collection('projects_hire').add({
        name: f.value.projectname,
        category: f.value.Selectjobcategory,
        specializes: f.value.selectskills,
        people: f.value.selmanypeople,
        location:"123",
        comments:"asd",
        status:"Active",
        AdditionalComments:"comentario",
       zipcode: "",
        mapa: '----------------------------',
        correoHire: user.email,
        idHire:user.uid

      }).then(()=>{
        this.reload();
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
    this.files.push('Add a file');
    this.cust = this.cust + 1;
    console.log(this.cust);
  }

  uploadDoc(e){
    var i = this.cust
    this.file.push(e.target.files[0])
    this.files[i] = e.target.files[0].name
    console.log(i);
  }
}