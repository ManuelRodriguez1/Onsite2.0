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
@Component({
  selector: 'app-menu-home',
  templateUrl: './menu-home.component.html',
  styleUrls: ['./menu-home.component.css']
})
export class MenuHomeComponent implements OnInit {
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  projectname;
   options: Options = {
     floor: 1.00,
     ceil: 100.00,
     translate: (value: number, label: LabelType): string => {

           return '$' + value+".00";

     }
   };
   
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  lat: number = 51.678418;
  lng: number = 7.809007;
  selectedRam = "";
  up = false;
  selectskills = null;
  selectskills2 = null;
  howmany = "Select";
  Enterradiusinmiles = "Enter radius in miles";
  up2 = false;
  up3 = false;
  up4 = false;
  up6 = false;
  up5 = false;
  datosprincipalesProjects;
  page = 1;
  select = 0;
  HomeFormularioNw = 0;
  childData: Observable<any>;
  childData1: Observable<any>;
  estadoProyecto = "pActive";//pFinished
  email="";
  uid="";
  files = ['Add files'];
  file = 1;

  skills1 = ['Concrete', 'Decorator', 'Drywall',
    'Electrical', 'Excavation', 'Flooring',
    'General Labor', 'Insulation', 'Interior Fishing Carpentry',
    'Iron Worker', 'Landscaper', 'Mason',
    'Plastering', 'Plumbing', 'Roofer', 'Waterproof Installation'];
  skills2: any = [];
  skills2Howmany: any = ["1", "2", "3", "4", "5"];
  cust = 1;
  customers = ['Customer 1'];
  router: any;
  database = firebase.database();
  constructor(private db: AngularFirestore) {
    this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' }
    ];
    this.selectedItems = [
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

  }


  addFile() {
    var i = this.file++;
    this.files.push('File ' + i);
  }

  selectskill(e) {
    this.up3 = !this.up3;
    this.selectskills = e;
    this.skills2 = [this.selectskills + ' Hanger', this.selectskills + ' Apprentice', 'Metal Framer',
      'Metal Framer Apprentice', this.selectskills + ' Finisher', 'Fire Taper'];
  }
  selectskill2(e) {
    this.up4 = !this.up4;
    this.selectskills2 = e
  }


  selectskill2up5(e) {
    this.up5 = !this.up5;
    this.howmany = e;

  }
  selectskill2up6(e) {
    this.up6 = !this.up6;
    this.Enterradiusinmiles = e;

  }
  ngOnInit() {
    this.childData = this.db.collection('/projectsHire').valueChanges()
    this.childData1 = this.db.collection('/projectsHire').valueChanges()

  }


  list(e) {

    if (e == 1) {
      this.up = !this.up;
    } else {
      this.up2 = !this.up2;
    }
  }

  setRam(value) {
    this.selectedRam = value;
  }



  list4() {
    this.up5 = !this.up5;
  }
  list5() {
    this.up6 = !this.up6;
  }

  list3(e) {

    if (e == 1) {
      this.up3 = !this.up3;
    } else {
      this.up4 = !this.up4;
    }
  }

  test(f: NgForm){
    console.log(f.value);
      this.db.collection('projects_hire').add({
        /* jdgjsdjhj: f.value.EnterAddress1,        
        location:"123",
        comments:"asd",
        status:"Active",
        AdditionalComments:"comentario" */
      }).catch((error)=>{
      alert(error.message)
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
  addcustomer() {

    var i = this.cust++;
    this.customers.push('Customer ' + i);
  }
  addfiles() {
    var i = this.cust++;
    this.files.push('File ' + i);
  }
  close(e) {
    if (e == 1) {
      this.selectskills = null
      this.selectskills2 = null
    }
    if (e == 2) {
      this.selectskills2 = null
    }
  }

  
  
}
