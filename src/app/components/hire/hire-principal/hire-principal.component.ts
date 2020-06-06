import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-hire-principal',
  templateUrl: './hire-principal.component.html',
  styleUrls: ['./hire-principal.component.css']
})
export class HirePrincipalComponent implements OnInit {
  /* text = ['','Your Inbox', 'Projects', 'Explore'];
   righttv = '' 
   select = 0
   lat: number = 51.678418;
   lng: number = 7.809007;
   menushow = false
   project = false
   upf = false;
   HomeFormularioNw = 0;
   page = 1;
   constructor(public af: AngularFireAuth) { }
 */
  ngOnInit() {

  }
  /*
  logout() {
       this.af.auth.signOut();
       console.log('logged out');
         location.href ="/";
   }
   menu(e) {
    switch (e) {
      case 0:
        this.select = 1;
        this.righttv = ''
        break;
      case 1:
        this.select = 1;
        this.menushow = !this.menushow
        this.righttv = 'textv2'
        break;
      case 2:
        this.select = 2;
        this.righttv = 'textv3'
        break;
      case 3:
        this.select = 3;
        this.righttv = 'textv4'
        break;
    }
  }

  next() {
    this.page++;
    this.HomeFormularioNw++;
  }
  back() {
    this.page--;
    this.HomeFormularioNw = this.page;
  } */

}