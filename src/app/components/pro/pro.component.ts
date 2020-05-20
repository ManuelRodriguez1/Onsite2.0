import { Component, OnInit, NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProService } from 'src/app/services/pro.service';
import { AngularFirestore } from "angularfire2/firestore";

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

  constructor(
    private servicePro: ProService,
    private db: AngularFirestore
  ) { }

  ngOnInit() {

  }
  list(e) {
    if (e == 1) {
      this.up = !this.up;
    } else {
      this.up2 = !this.up2;
    }
  }
  next(email) {
    var temp = false
    this.db.collection('users_pro').get().subscribe((u) => {
      u.forEach((e) => {
        if (email === e.data().email) {
          temp = true
        }
        this.verifyEmail = temp
      })
      if (!this.verifyEmail) {
        this.page++;
        this.select = this.page;
      }
    })
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
    if (e == 2) {
      this.selectskills2 = null
    }
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
