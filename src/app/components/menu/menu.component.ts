import { Component, OnInit , Input} from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
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
 m = "";
  Sesion = true;
    constructor(public af: AngularFireAuth, private router: Router,location: Location,private activatedRoute: ActivatedRoute) {

      this.activatedRoute.queryParams.subscribe(params => {
       this.m=params.Login;
      });
        this.af.authState.subscribe(auth => {

            if (auth) {
                this.Sesion = true;
            } else {
                this.Sesion = false;
            }
        });
    }
  ngOnInit() {
  }
  onSubmit(formData) {

  location.href="/Hireprincipal";

   }
   logout() {
        this.af.auth.signOut();
        console.log('logged out');
          location.href ="./";
    }
}
