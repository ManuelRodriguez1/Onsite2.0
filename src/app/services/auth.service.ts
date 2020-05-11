import { CanActivate, Router,ActivatedRouteSnapshot } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';

//import { AngularFireAuth } from "angularfire2/angularfire2";
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private auth: AngularFireAuth, private router: Router) {}
    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
      return Observable.from(this.auth.authState)
        .take(1)
        .map(state => !!state)
        .do(authenticated => {
      if(!authenticated){
        this.auth.auth.signOut();
        this.router.navigate([ '/Home' ]);
        
      }else{
        const role = route.data.role;
        this.auth.authState.subscribe(authState => {
          if (authState) {
            console.log(authState.displayName+"============"+role);
            if (authState.displayName !== role  ) {
              this.auth.auth.signOut();
             // this.router.navigate(['/Home']);            
             } 
          }
        });

      }
      })
    }




}



    

