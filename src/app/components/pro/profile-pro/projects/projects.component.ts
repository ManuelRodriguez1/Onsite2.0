import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  lat: number = 51.678418;
  lng: number = 7.809007;

  constructor() { }

  ngOnInit() {
  }

}
