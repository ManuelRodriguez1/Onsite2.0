import { Component, OnInit , Input} from '@angular/core';
import { Router,ActivatedRoute , Event, NavigationEnd} from '@angular/router';
import { Location } from '@angular/common';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore } from "angularfire2/firestore";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
error: any[];
    m = "";
    userMenu="Home";
    Sesion = true;
    estado="";
    UserName="";



    constructor(public af: AngularFireAuth, private router: Router,location: Location,private afstore: AngularFirestore) 
    {
      this.af.authState.subscribe(auth => {
          if (auth) {
              this.Sesion = true;            
          } else {
              this.Sesion = false;
          }
      });
        this.router.events.subscribe((event: Event) => {
          if (event instanceof NavigationEnd) {
              this.paginaMensajeMenu( firebase.auth().currentUser);
          }
        }); 
    }
  ngOnInit() {
  }
  paginaMensajeMenu(user) {
console.log(user);
console.log(user.displayname);

    if(location.pathname=="/Hire" || user.displayname=="hire"){
      this.m="Hirer";
      }else if(location.pathname=="/Pro" || user.displayName=="pro"){
        this.m="Pro";
     }else if(location.pathname=="/Home"){
      this.m="Home";
     }
        
        if(location.pathname=="/Home" || location.pathname=="/Pro" || location.pathname=="/Hire"){
          this.userMenu="Home";
              if (user.displayName) {
                  if(user.displayName=="hire"){
                    this.router.navigateByUrl("/Hireprincipal");
                  }else if(user.displayName=="pro"){
                    this.router.navigateByUrl("/ProfilePro");
                  }
              }
          }

          if(user.displayName=="hire"){
            this.userMenu="Hirer";
            this.UserName="";
          
          }else if(user.displayName=="pro"){
            this.userMenu="Pro";  
            this.UserName="";
           /* this.af.collection('users_pro').doc(this.user.uid).update({
              "certificate": this.customers
            });*/
         }

 
     

      
  }
  onSubmit(formData) {

  this.router.navigateByUrl("/Hireprincipal");

   }
   logout() {
        this.af.auth.signOut();
        console.log('logged out');
        this.router.navigateByUrl("/Home");

    }
}
