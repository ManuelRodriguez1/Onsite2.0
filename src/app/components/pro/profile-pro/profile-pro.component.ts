import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-profile-pro',
  templateUrl: './profile-pro.component.html',
  styleUrls: ['./profile-pro.component.css']
})
export class ProfileProComponent implements OnInit {

  text = 'Profile';
  righttv = '' 
  select = 0
  lat: number = 51.678418;
  lng: number = 7.809007;
  menushow = false
  project = false
  constructor() { }

  ngOnInit() {

  }

}
