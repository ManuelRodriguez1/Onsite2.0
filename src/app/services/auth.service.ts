import { CanActivate, Router,ActivatedRouteSnapshot } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable, EventEmitter } from "@angular/core";
import { Observable } from "rxjs";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';

//import { AngularFireAuth } from "angularfire2/angularfire2";
@Injectable()
export class AuthGuard implements CanActivate {
  MenuPrincipal=new EventEmitter<any>();
    constructor(private auth: AngularFireAuth, private router: Router) {}
    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
      return Observable.from(this.auth.authState)
        .take(1)
        .map(state => !!state)
        .do(authenticated => {
      if(!authenticated){
        this.auth.auth.signOut();
        this.router.navigate(['/Home'])
        
      }else{
        var role = ''
        this.auth.authState.subscribe(authState => {
          if(route.data.role === undefined){
            role = authState.displayName
          }else{
            role = route.data.role;
          }
          if (authState) {
            if (authState.displayName !== role  ) {
              if(authState.displayName=="hire"){
                //location.href="/Hireprincipal";
                this.router.navigate(['/Hireprincipal'])

              }else if(authState.displayName=="pro"){
                this.router.navigate(['/Profilepro'])
                //location.href="/Profilepro";

              }else{
                this.router.navigate(['/Home'])
               // location.href="/Home";
              }
              

            } 
          }
        });

      }
      })
    }




}



    

