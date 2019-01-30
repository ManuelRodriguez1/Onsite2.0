import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hire-principal',
  templateUrl: './hire-principal.component.html',
  styleUrls: ['./hire-principal.component.css']
})
export class HirePrincipalComponent implements OnInit {
  menuVista = "Projects";
    m = 4;
      menushow = false
  constructor() { }

  ngOnInit() {
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
          this.menuVista = "Start";
      }
      this.m = e;
  }
}
