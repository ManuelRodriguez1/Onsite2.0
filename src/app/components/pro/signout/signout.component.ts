import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from "@angular/router";

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styles: [`button{
    position: fixed;
    right: 0;
    top: 0;
    z-index: 100;
  }`]
})
export class SignoutComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, private route: Router) { }

  ngOnInit() {
  }
   cerrar(){
    this.afAuth.auth.signOut().then(() =>{ 
      alert("Sesion cerrada")
      this.route.navigateByUrl('/')
    })
   }
}
