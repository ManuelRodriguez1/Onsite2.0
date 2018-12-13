import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from "angularfire2/auth";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  database = firebase.database();
  constructor(public afAuth: AngularFireAuth) { }

  ngOnInit() {
  }
  test(f: NgForm){
   
      this.database.ref('/subscribers').push({
        subscribe: f.value.subscribe
        
      }).then(()=>{
        console.log('funciona!')
      })
    
  }
}
