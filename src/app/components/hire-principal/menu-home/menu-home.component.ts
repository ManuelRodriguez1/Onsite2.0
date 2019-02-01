import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import * as $ from 'jquery';
import { Options,LabelType } from 'ng5-slider';
import {Router} from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-menu-home',
  templateUrl: './menu-home.component.html',
  styleUrls: ['./menu-home.component.css']
})
export class MenuHomeComponent implements OnInit {

  value: number =1;
   options: Options = {
     floor: 1.00,
     ceil: 100.00,
     translate: (value: number, label: LabelType): string => {

           return '$' + value+".00";

     }
   };

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
  childData = [];
  estadoProyecto = "pActive";//pFinished

  email="";
  uid="";


  skills1 = ['Concrete', 'Decorator', 'Drywall',
    'Electrical', 'Excavation', 'Flooring',
    'General Labor', 'Insulation', 'Interior Fishing Carpentry',
    'Iron Worker', 'Landscaper', 'Mason',
    'Plastering', 'Plumbing', 'Roofer', 'Waterproof Installation'];
  skills2: any = [];
  skills2Howmany: any = ["1", "2", "3", "4", "5"];
  cust = 4;
  customers = ['Customer 1', 'Customer 2', 'Customer 3'];
  router: any;
  constructor(private db: AngularFirestore) {


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
    this.childData = this.VerDatosTiempoReal();
    console.log(this.childData);
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
    console.log(this.selectedRam);
  }


  VerDatosTiempoReal() {
    var returnArr = [];
    //console.log(childKey);
    firebase.database().ref("projectsHire/").once('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        returnArr.push(childData);
      });


    });
    return returnArr;
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

  final() {
    var user = firebase.auth().currentUser;
    
      this.db.collection('projectsHire').add({
        Project: "Excavation at 280 S",
        Status: "Active",
        Category:"Drywall",
        Specialized: "Drywall Apprentice",
        Howmanypeople: "4",
        Joblocation: "1234 Meadow Dr. - Unit 123 - Wynwood, FL 33127",
        AdditionalComments:"My whole front driveway is disgusting and I need help installing a new one. I think there are some utility lines; not sure so please help.",
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
    this.HomeFormularioNw = this.page;


  }
  back() {
    this.page--;
    this.HomeFormularioNw = this.page;

  }
  addcustomer() {

    var i = this.cust++;
    this.customers.push('Customer ' + i);
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
