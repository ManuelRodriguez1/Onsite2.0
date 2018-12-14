import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-projects',
  templateUrl: './menu-projects.component.html',
  styleUrls: ['./menu-projects.component.css']
})
export class MenuProjectsComponent implements OnInit {
  up=false;
  selectskills = [];
  up2=false;
  page = 1;
  select = 0;
  Homeprojects=1;

  projects = ['proyecto1', 'proyecto2', 'proyecto3',
  'proyecto4', 'proyecto5', 'proyecto6'];
  selectsproject = [];
  
  constructor() { }

  ngOnInit() {
  }
  selectskill(e) {
    this.up = !this.up;
    var add = true;
    if (this.selectskills.length == 0) {
      this.selectskills.push(e);
    }
    for (let i = 0; i < this.selectskills.length; i++) {
      if (this.selectskills[i] == e) {
        add = false;
      }
    }
    if (add) {
      this.selectskills.push(e);
    }
  }

  projectsinforma = [
    {nombre: "Excavation at 280 S",staus: "Active"},
    {nombre: "Fireside Lodge",staus: "Active"},
    {nombre: "Gallaria",staus: "Active"},
    {nombre: "Haute Corner",staus: "Active",},
    {nombre: "prueba4",staus: "Active",}
  ];
  perfilprojects = [
    {fotoperfil: "../../../../assets/imagenes/profileproject/profile1.svg",nombre: "Jimmy is helping with",subtitulo:"Drywall",estrellas:"../../../../assets/imagenes/profileproject/estrellas.svg"},
    {fotoperfil: "../../../../assets/imagenes/profileproject/profile1.svg",nombre: "Jimmy is helping with",subtitulo:"Drywall",estrellas:"../../../../assets/imagenes/profileproject/estrellas.svg"},
    {fotoperfil: "../../../../assets/imagenes/profileproject/profile1.svg",nombre: "Jimmy is helping with",subtitulo:"Drywall",estrellas:"../../../../assets/imagenes/profileproject/estrellas.svg"},
    {fotoperfil: "../../../../assets/imagenes/profileproject/profile1.svg",nombre: "Jimmy is helping with",subtitulo:"Drywall",estrellas:"../../../../assets/imagenes/profileproject/estrellas.svg"},
    {fotoperfil: "../../../../assets/imagenes/profileproject/profile1.svg",nombre: "Jimmy is helping with",subtitulo:"Drywall",estrellas:"../../../../assets/imagenes/profileproject/estrellas.svg"}
  ];

  Projectsworkers = [
    {status: "Active",category: "Drywall",Specialized:"Drywall Apprentice",people:"4"},
    {status: "Active",category: "Drywall",Specialized:"Drywall Apprentice",people:"4"},
    {status: "Active",category: "Drywall",Specialized:"Drywall Apprentice",people:"4"},
    {status: "Active",category: "Drywall",Specialized:"Drywall Apprentice",people:"4"},
    {status: "Active",category: "Drywall",Specialized:"Drywall Apprentice",people:"4"},
    {status: "Active",category: "Drywall",Specialized:"Drywall Apprentice",people:"4"},
    {status: "Active",category: "Drywall",Specialized:"Drywall Apprentice",people:"4"}
  ];

  list(e) {

    if (e == 1) {
      this.up = !this.up;
    } else {
      this.up2 = !this.up2;
    }
  }
}
