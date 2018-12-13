import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {

  skills = ['Concrete', 'Decorator', 'Drywall', 'Electrical', 'Excavation', 'Flooring', 'General Labor', 'Insulation', 'Interior Fishing Carpentry', 'Iron Worker', 'Landscaper', 'Mason', 'Plastering', 'Plumbing', 'Roofer', 'Waterproof Installation'];
  lat: number = 51.678418;
  lng: number = 7.809007;
  dots = []
  constructor() { }

  ngOnInit() {
    for (let i = 0; i < (this.skills.length / 4); i++) {
      this.dots.push(i)
    }
  }

}
