import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-profile-pro',
  templateUrl: './profile-pro.component.html',
  styleUrls: ['./profile-pro.component.css']
})
export class ProfileProComponent implements OnInit {

  text = ['Home', 'Your Inbox', 'Explore'];
  select = 2
  lat: number = 51.678418;
  lng: number = 7.809007;
  constructor() { }

  ngOnInit() {
   
  }

}
