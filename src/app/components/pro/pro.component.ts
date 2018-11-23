import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pro',
  templateUrl: './pro.component.html',
  styleUrls: ['./pro.component.css']
})
export class ProComponent implements OnInit {

  title = ['Enter your information:', 'hola mundo'];
  select = 0;
  constructor() { }

  ngOnInit() {
  }

}
