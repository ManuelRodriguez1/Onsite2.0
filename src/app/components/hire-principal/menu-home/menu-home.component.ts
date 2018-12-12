import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-home',
  templateUrl: './menu-home.component.html',
  styleUrls: ['./menu-home.component.css']
})
export class MenuHomeComponent implements OnInit {
up=false;
selectskills = [];
up2=false;
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

  constructor() { }

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
  ngOnInit() {
  }
  list(e) {

    if (e == 1) {
      this.up = !this.up;
    } else {
      this.up2 = !this.up2;
    }
  }


  getStarted(){
    this.HomeFormularioNw=1;
  }
  next(){
    alert(this.page);
    this.page++;
    this.HomeFormularioNw=  this.page;
  }
  back() {
    this.page--;
    this.select = this.page;
  }
}
