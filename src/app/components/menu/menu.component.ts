import { Component, OnInit , Input} from '@angular/core';
import { Router,ActivatedRoute , Event, NavigationEnd} from '@angular/router';
import { Location } from '@angular/common';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore } from "angularfire2/firestore";
import { getAllRouteGuards } from '@angular/router/src/utils/preactivation';

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
    imageP: any = ''
    profile: any = ''

    UserName="";



    constructor(public af: AngularFireAuth, private router: Router,private afstore: AngularFirestore) 
    {
      if(location.pathname=="/Home" || location.pathname=="/Pro" || location.pathname=="/Hire"){
              
  
        this.userMenu="Home";
                this.af.authState.subscribe(auth => {
                 
                  if(auth){
                    if(auth.displayName=="hire"){
                      this.router.navigate(['/Hireprincipal']);
                    }else if(auth.displayName=="pro"){
                      this.router.navigate(['/ProfilePro']);
  
                    }
                  }
              
                });
                      
                    
                }
        
        
      this.af.authState.subscribe(auth => {
        console.log(auth);
          if (auth) {
              this.Sesion = true;            
          } else {
              this.Sesion = false;
          }
      });
        this.router.events.subscribe((event: Event) => {
          if (event instanceof NavigationEnd) {
              this.paginaMensajeMenu(firebase.auth().currentUser);
          }
        }); 
    }
  ngOnInit() {
  }
  paginaMensajeMenu(user) {
    console.log(user);
    if(user){
      this.estado=user.displayName;
    }

    if(location.pathname=="/Hire" || this.estado=="hire"){
      this.m="Hirer";
      }else if(location.pathname=="/Pro" || this.estado=="pro"){
        this.m="Pro";
     }else if(location.pathname=="/Home"){
      this.m="Home";
      this.userMenu="Home";
     }else{
      this.m="Home";
      this.userMenu="Home";
     }
        
  

          if(this.estado=="hire"){
            this.userMenu="Hirer";
            console.log(user.uid)
           var data = this.afstore.collection("users_hire").doc(user.uid).snapshotChanges()
            data.subscribe((d) => {
              this.profile = d.payload.data()
              console.log(this.profile );
             if(d){
              if (this.profile.photoUrl!="") { this.imageP = this.profile.photoUrl }
              if (this.profile.name!="") { this.UserName = this.profile.name }

             }
             
            })
          
          }else if(this.estado=="pro"){
            this.userMenu="Pro";  
            var data = this.afstore.collection("users_pro").doc(user.uid).snapshotChanges()
            data.subscribe((d) => {
              this.profile = d.payload.data()
              if (this.profile.photoUrl != null) { this.imageP = this.profile.photoUrl }
              if (this.profile.name != null) { this.UserName = this.profile.name }

            })
          
        
          
         }

 

      
  }

   logout() {
        this.af.auth.signOut();
        console.log('logged out');
        this.router.navigateByUrl("/Home");

    }
}
