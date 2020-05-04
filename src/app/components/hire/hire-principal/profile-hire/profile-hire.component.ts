import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-hire',
  templateUrl: './profile-hire.component.html',
  styleUrls: ['./profile-hire.component.css']
})
export class ProfileHireComponent implements OnInit {
  url = '../../../../../assets/iconos/Ellipse 7.svg';
  constructor() { }

  ngOnInit() {
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event:any) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
    }
  }

}
