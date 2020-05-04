import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import * as $ from 'jquery';
import { Options,LabelType } from 'ng5-slider';
import {Router} from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { ServiceService } from 'src/app/services/service.service';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormGroup, FormControl } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown-angular7';
import { ProjectService } from '../../../../services/project.service';

@Component({
  selector: 'app-menu-home',
  templateUrl: './menu-home.component.html',
  styleUrls: ['./menu-home.component.css']
})
export class MenuHomeComponent implements OnInit {
  // Multiselect-dropdown
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

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

  constructor(private db: AngularFirestore, public projectService: ProjectService) {
    this.dropdownList = [
      { item_id: 1, item_text: 'Concrete' },
      { item_id: 2, item_text: 'Decorator' },
      { item_id: 3, item_text: 'Drywall' },
      { item_id: 4, item_text: 'Electrical' },
      { item_id: 6, item_text: 'Excavation' },
      { item_id: 7, item_text: 'Flooring' },
      { item_id: 8, item_text: 'General Labor' },
      { item_id: 9, item_text: 'Insulation' },
      { item_id: 10, item_text: 'Interior Fishing Carpentry' },
      { item_id: 11, item_text: 'Iron Worker' },
      { item_id: 12, item_text: 'Landscaper' },
      { item_id: 13, item_text: 'Mason' },
      { item_id: 14, item_text: 'Plastering' },
      { item_id: 15, item_text: 'Plumbing' },
      { item_id: 16, item_text: 'Roofer' },
      { item_id: 17, item_text: 'Waterproof Installation' }
    ];
    this.selectedItems = [
      { item_id: 3, item_text: 'Drywall' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 4,
      allowSearchFilter: true
    };

  }

  onItemSelect(item: any) {
    var p = item['item_text'];
    console.log(p);
    this.peoples.push(p);
    console.log(this.peoples);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onItemDeSelect(){
    var p = this.people--;
    this.peoples.pop();
  }
  /* addFile() {
    var i = this.file++;
    this.files.push('File ' + i);
  } */
  addPeoples() {
    var p = this.people++;
    this.peoples.push('People ' + p);
  }

  ngOnInit() {
    /* this.childData = this.db.collection('/projectsHire').valueChanges()
    this.childData1 = this.db.collection('/projectsHire').valueChanges() */
    this.projectService.getProjects().subscribe(projects =>{
      this.projects = projects;
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