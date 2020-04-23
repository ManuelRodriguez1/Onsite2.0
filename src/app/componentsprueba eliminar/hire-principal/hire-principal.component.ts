import { Component, OnInit} from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-hire-principal',
  templateUrl: './hire-principal.component.html',
  styleUrls: ['./hire-principal.component.css']
})
export class HirePrincipalComponent implements OnInit {
  upf = false;


  //public CData: number;

  menuVista = "Explore";
    m = 4;
      menushow = false
  constructor(public af: AngularFireAuth) { }

  ngOnInit() {

  }
  logout() {
       this.af.auth.signOut();
       console.log('logged out');
         location.href ="/";
   }
  menu(e) {
      if (e == 1) {
          this.menuVista = "Home";
      } else if (e == 2) {
          this.menuVista = "Inbox";
          this.menushow = !this.menushow
      } else if (e == 3) {
          this.menuVista = "Projects";
      } else if (e == 4) {
          this.menuVista = "Explore";
      } else if (e == 5) {
        this.logout();
      }
      this.m = e;
  }
}
