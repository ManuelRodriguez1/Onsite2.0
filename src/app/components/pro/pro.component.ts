import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pro',
  templateUrl: './pro.component.html',
  styleUrls: ['./pro.component.css']
})
export class ProComponent implements OnInit {

  title = ['Enter your information:', 'Select skills', ''];
  text = ['About You', 'Your Skills'];
  skills = ['Concrete', 'Decorator', 'Drywall',
    'Electrical', 'Excavation', 'Flooring',
    'General Labor', 'Insulation', 'Interior Fishing Carpentry',
    'Iron Worker', 'Landscaper', 'Mason',
    'Plastering', 'Plumbing', 'Roofer', 'Waterproof Installation'];
  skills2 = ['Drywall Hanger', 'Drywall Apprentice', 'Metal Framer',
    'Metal Framer Apprentice', 'Drywall Finisher', 'Fire Taper'];
  customers = ['Customer 1', 'Customer 2', 'Customer 3'];
  cust = 4;
  select = 0;
  up = false;
  up2 = false;
  page = 0;
  selectskills = [];
  selectskills2 = [];
  constructor() { }

  ngOnInit() {

  }
  list(e) {
    if (e == 1) {
      this.up = !this.up;
    } else {
      this.up2 = !this.up2;
    }
  }
  next() {
    this.page++;
    this.select = this.page;
  }
  back() {
    this.page--;
    this.select = this.page;
  }
  selectskill(e) {
    this.up = !this.up;
    var add = true;
    if (this.selectskills.length == 0) {
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
  }
  selectskill2(e){
    if (this.selectskills2.length == 0) {
      this.selectskills2.push(e);
    }
  }
  close(e) {
    for (let i = 0; i < this.selectskills.length; i++) {
      if (this.selectskills[i] == e) {
        this.selectskills.splice(i, 1);
      }
    }
  }
  addcustomer(){
    var i = this.cust++;
    this.customers.push('Customer '+i);
  }
}
