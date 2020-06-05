import { Component, OnInit, NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProService } from 'src/app/services/pro.service';
//import  * as zipcode from "../../../assets/files/zipcode.json";

@Component({
  selector: 'app-pro',
  templateUrl: './pro.component.html',
  styleUrls: ['./pro.component.css']
})
export class ProComponent implements OnInit {

  cust = 0;
  select = 0;
  up = false;
  up2 = false;
  page = 0;
  selectskills: any[] = [];
  selectskills2 = null;
  title = ['Enter your information:', 'Select skills'];
  text = ['About You', 'Your Skills'];
  skills = ['Concrete', 'Decorator', 'Drywall', 'Electrical', 'Excavation', 'Flooring', 'General Labor', 'Insulation', 'Interior Fishing Carpentry', 'Iron Worker', 'Landscaper', 'Mason', 'Plastering', 'Plumbing', 'Roofer', 'Waterproof Installation'];
  skills2: any = []
  customers = ['Add certificate file'];
  customers2: any[] = [];
  notSame: boolean = false
  file: any[] = []
  checkbox: boolean = false
  verifyEmail: boolean = false
  emailText: string[] = []
  error: string = ''
  correctEmail: any = new RegExp(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,9}$/)
 // zipCodeCity: any = zipcode

  constructor(private servicePro: ProService) { }

  ngOnInit() {
    this.servicePro.error.subscribe((res) => {
      this.error = res
      if (this.error != '') {
        this.page = 0
        this.select = 0
        this.verifyEmail = true
      }
    })  
   // console.log(this.zipCodeCity);
    
  }

  list(e) {
    if (e == 1) {
      this.up = !this.up;
    } else {
      this.up2 = !this.up2;
    }
  }
  next() {
    this.page++
    this.select = this.page
  }
  back() {
    this.page--;
    this.select = this.page;
  }
  selectskill(e) {
    // this.up = !this.up;
    var i = this.selectskills.indexOf(e)
    i === -1 && this.selectskills.push(e);
    this.skills2 = [this.selectskills + ' Hanger', this.selectskills + ' Apprentice', 'Metal Framer',
      'Metal Framer Apprentice', this.selectskills + ' Finisher', 'Fire Taper'];
  }
  selectskill2(e) {
    this.up2 = !this.up2;
    this.selectskills2 = e
  }
  close(e) {
    var i = this.selectskills.indexOf(e)
    i !== -1 && this.selectskills.splice(i, 1)
    e == 2 && this.selectskills2 == null
  }
  addcustomer() {
    this.customers.push('Add certificate file');
    this.cust = this.cust + 1;
  }
  test(f: NgForm) {
    this.servicePro.registerPro(f, this.file, this.customers2, this.selectskills)
  }
  uploadDoc(e) {
    var i = this.cust
    this.file.push(e.target.files[0])
    this.customers[i] = e.target.files[0].name
  }
  check() {
    this.checkbox = !this.checkbox
  }
}
