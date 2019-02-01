import { Component, OnInit } from '@angular/core';
import { Options,LabelType } from 'ng5-slider';


@Component({
  selector: 'app-menu-explore',
  templateUrl: './menu-explore.component.html',
  styleUrls: ['./menu-explore.component.css']
})
export class MenuExploreComponent implements OnInit {
upf=false;
up6=false;
  Enterradiusinmiles = "Enter radius in miles";
  skills2Howmany: any = ["1", "2", "3", "4", "5"];
  value: number =1;
   options: Options = {
     floor: 1.00,
     ceil: 100.00,
     translate: (value: number, label: LabelType): string => {

           return '$' + value+".00";

     }
   };
  constructor() { }

  ngOnInit() {
  }

    skills1 = ['Concrete', 'Decorator', 'Drywall',
      'Electrical', 'Excavation', 'Flooring',
      'General Labor', 'Insulation', 'Interior Fishing Carpentry',
      'Iron Worker', 'Landscaper', 'Mason',
      'Plastering', 'Plumbing', 'Roofer', 'Waterproof Installation'];


list3(){
    this.upf= !this.upf;
}
list5() {
  this.up6 = !this.up6;
}


}
