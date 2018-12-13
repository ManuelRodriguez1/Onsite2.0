import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
error: any[];
  m = "menuHome";
  Sesion = true;
    constructor(public af: AngularFireAuth, private router: Router,location: Location) {
        this.af.authState.subscribe(auth => {
            if (auth) {
                this.Sesion = true;
            } else {
                this.Sesion = false;
            }
            console.log(this.Sesion);
        });


        if(location.path() != ''){
          if(location.path() == '/Hire' || location.path() == '/Hireprincipal'){
              this.m = "menuHire";
          }else if(location.path() == '/Pro' ){
              this.m = "menuPro";
          }
         }
    }


  ngOnInit() {

  }
  onSubmit(formData) {

  location.href="/Hireprincipal";

   }
   logout() {
        this.af.auth.signOut();
        console.log('logged out');
        this.router.navigateByUrl('/');
    }
}
