import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-profile-pro',
  templateUrl: './profile-pro.component.html',
  styleUrls: ['./profile-pro.component.css']
})
export class ProfileProComponent implements OnInit {

  text = ['Home', 'Your Inbox', 'Projects', 'Explore'];
  righttv = '' 
  select = 0
  lat: number = 51.678418;
  lng: number = 7.809007;
  menushow = false
  project = false
  constructor() { }

  ngOnInit() {

  }

  menus(e) {
    switch (e) {
      case 0:
        this.select = 0;
        this.righttv = ''
        break;
      case 1:
        this.select = 1;
        this.menushow = !this.menushow
        this.righttv = 'textv2'
        break;
      case 2:
        this.select = 2;
        this.righttv = 'textv3'
        break;
      case 3:
        this.select = 3;
        this.righttv = 'textv4'
        break;
    }

  }

}
