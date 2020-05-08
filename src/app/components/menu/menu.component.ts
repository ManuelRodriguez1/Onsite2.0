import { Component, OnInit , Input} from '@angular/core';
import { Router,ActivatedRoute , Event, NavigationEnd} from '@angular/router';
import { Location } from '@angular/common';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
error: any[];
 m = "Home";
 userMenu="Home";
  Sesion = true;
  estado="";


    constructor(public af: AngularFireAuth, private router: Router,location: Location,private activatedRoute: ActivatedRoute) 
    {
      this.af.authState.subscribe(auth => {
        console.log(auth);

          if (auth) {
              this.Sesion = true;
              this.estado = auth.displayName;
            
          } else {
              this.Sesion = false;
          }

      });
        this.router.events.subscribe((event: Event) => {
          if (event instanceof NavigationEnd) {
       
              this.paginaMensajeMenu();
          }
        });

       
    }
  ngOnInit() {

  }
  paginaMensajeMenu() {

    if(location.pathname=="/Hire" || location.pathname=="/Hireprincipal"){
      this.m="Hirer";
      }else if(location.pathname=="/Pro"|| location.pathname=="/ProfilePro"){
        this.m="Pro";
     }
        
        if(location.pathname=="/Home" || location.pathname=="/Pro" || location.pathname=="/Hire"){
          this.userMenu="Home";
          this.m="Home";
          this.af.authState.subscribe(auth => {
              if (auth) {
                  if(auth.displayName=="hire"){
                    location.href ="/Hireprincipal";
                  }else if(auth.displayName=="Pro"){
                    location.href ="/ProfilePro";

                  }
                
              }
    
          });

          
           
         
          }



      if(location.pathname=="/Hireprincipal"){
      this.userMenu="Hirer";
      }
      if(location.pathname=="/ProfilePro"){
      this.userMenu="Pro";
      }
     

      
  }
  onSubmit(formData) {

  this.router.navigateByUrl("/Hireprincipal");

   }
   logout() {
        this.af.auth.signOut();
        console.log('logged out');
          location.href ="./";
    }
}
