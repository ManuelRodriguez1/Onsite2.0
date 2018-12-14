import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-menu-home',
  templateUrl: './menu-home.component.html',
  styleUrls: ['./menu-home.component.css']
})
export class MenuHomeComponent implements OnInit {
up=false;
selectskills = null;
selectskills2 = null;
up2=false;
up3=false;
up4=false;
  page = 1;
    select = 0;
HomeFormularioNw=0;
skills = ['proyecto1', 'proyecto2', 'proyecto3',
  'proyecto4', 'proyecto5', 'proyecto6'];

  skills1 = ['Concrete', 'Decorator', 'Drywall',
    'Electrical', 'Excavation', 'Flooring',
    'General Labor', 'Insulation', 'Interior Fishing Carpentry',
    'Iron Worker', 'Landscaper', 'Mason',
    'Plastering', 'Plumbing', 'Roofer', 'Waterproof Installation'];
  skills2: any = [];
    cust = 4;
    customers = ['Customer 1', 'Customer 2', 'Customer 3'];
  constructor() { }

/*  selectskill(e) {
    alert(e);
    this.up3 = !this.up3;
    var add = true;
    if (this.selectskills.length == 0) {
      alert("111111111");
      this.selectskills.push(e);
    }
    for (let i = 0; i < this.selectskills.length; i++) {
      if (this.selectskills[i] == e) {
        add = false;
      }
    }
    if (add) {
      this.selectskills.push(e);
    }
  }*/


  selectskill(e) {
    this.up3 = !this.up3;
    this.selectskills = e;
    this.skills2 = [this.selectskills+' Hanger', this.selectskills+' Apprentice', 'Metal Framer',
    'Metal Framer Apprentice', this.selectskills+' Finisher', 'Fire Taper'];
  }
  selectskill2(e) {
    this.up4 = !this.up4;
    this.selectskills2 = e
  }
  ngOnInit() {


  }


  list(e) {

    if (e == 1) {
      this.up = !this.up;
    } else {
      this.up2 = !this.up2;
    }
  }

  list3(e) {

    if (e == 1) {
      this.up3 = !this.up3;
    } else {
      this.up4 = !this.up4;
    }
  }


  getStarted(){
    this.HomeFormularioNw=1;
  }
  next(){
    this.page++;
    this.HomeFormularioNw=  this.page;

  }
  back() {
    this.page--;
    this.select = this.page;

  }
  addcustomer() {

    var i = this.cust++;
    this.customers.push('Customer ' + i);
  }
  close(e) {
    if(e == 1){
      this.selectskills = null
      this.selectskills2 = null
    }
    if (e == 2) {
      this.selectskills2 = null
    }
  }
}
