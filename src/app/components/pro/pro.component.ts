import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-pro',
  templateUrl: './pro.component.html',
  styleUrls: ['./pro.component.css']
})
export class ProComponent implements OnInit {

  cust = 4;
  select = 0;
  up = false;
  up2 = false;
  page = 0;
  selectskills = null;
  selectskills2 = null;
  title = ['Enter your information:', 'Select skills', ''];
  text = ['About You', 'Your Skills'];
  skills = ['Concrete', 'Decorator', 'Drywall', 'Electrical', 'Excavation', 'Flooring', 'General Labor', 'Insulation', 'Interior Fishing Carpentry', 'Iron Worker', 'Landscaper', 'Mason', 'Plastering', 'Plumbing', 'Roofer', 'Waterproof Installation'];
  skills2: any = []
  customers = ['Customer 1', 'Customer 2', 'Customer 3'];

  constructor(private service: ServiceService) { }

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
    this.selectskills = e;
    this.skills2 = [this.selectskills+' Hanger', this.selectskills+' Apprentice', 'Metal Framer',
    'Metal Framer Apprentice', this.selectskills+' Finisher', 'Fire Taper'];
  }
  selectskill2(e) {
    this.up2 = !this.up2; 
    this.selectskills2 = e
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
  addcustomer() {
    var i = this.cust++;
    this.customers.push('Customer ' + i);
  }
}
