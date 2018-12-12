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
HomeFormularioNw=0;
skills = ['Concrete', 'Decorator', 'Drywall',
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
    alert("Holaaaaa");
    this.HomeFormularioNw=1;
  }

}
