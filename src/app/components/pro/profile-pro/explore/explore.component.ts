import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {

  select: number = 1
  modal: number = 0

  constructor() { }

  ngOnInit() {

  }
  sendInfo(){
    return false
  }
  apply(){
    this.modal = 1
  }
  hideModal(){
    this.modal = 2
    this.select = 0
  }
}
