import { Component, OnInit, Output } from '@angular/core';
import * as firebase from 'firebase/app';
import { ServiceService } from 'src/app/services/service.service';
@Component({
  selector: 'app-menu-projects',
  templateUrl: './menu-projects.component.html',
  styleUrls: ['./menu-projects.component.css']
})
export class MenuProjectsComponent implements OnInit {
  up = false;
  selectskills = [];
  up2 = false;
  page = 1;
  select = 0;
  Homeprojects = 1;
  childData = [];
  perfilIndividuals = [];
  selectsproject = [];
  ProfilesResena1 = 0;
  childDatarese = 0;
  ProfilesResena() {
    this.childDatarese = 1;
    this.ProfilesResena1 = 1;
  }
  database = firebase.database();
  datos: any[]
  user = firebase.auth().currentUser.email
  constructor(private service: ServiceService) { }
  ngOnInit() {
    this.datos = []
    this.database.ref('users_pro/')
      .on('value', e => {
        e.forEach(i => {
          this.datos.push(i.val())
        })
      })
    this.childData = this.VerDatosTiempoReal();
  }
  messageboton(email) {
    // var newuser = this.user.replace('.','-')
    var newuserdestinatario = email
    this.service.GuardarDatos(newuserdestinatario)
    // this.database.ref('/chat/'+newuser+"-"+newuserdestinatario).push({
    //     message: this.user
    // })
  }
  perfilPro(x) {
    this.Homeprojects = 2;
    this.perfilIndividuals = x;
  }
  VerDatosTiempoReal() {
    var returnArr = [];
    //console.log(childKey);
    firebase.database().ref("projectsHire/").once('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        returnArr.push(childData);
      });
    });
    return returnArr;
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
    { nombre: "Excavation at 280 S", staus: "Active" },
    { nombre: "Fireside Lodge", staus: "Active" },
    { nombre: "Gallaria", staus: "Active" },
    { nombre: "Haute Corner", staus: "Active", },
    { nombre: "prueba4", staus: "Active", }
  ];
  perfilprojects = [
    { fotoperfil: "../../../../assets/imagenes/profileproject/profile1.svg", nombre: "Jimmy is helping with", subtitulo: "Drywall", estrellas: "../../../../assets/imagenes/profileproject/estrellas.svg" },
    { fotoperfil: "../../../../assets/imagenes/profileproject/profile1.svg", nombre: "Jimmy is helping with", subtitulo: "Drywall", estrellas: "../../../../assets/imagenes/profileproject/estrellas.svg" },
    { fotoperfil: "../../../../assets/imagenes/profileproject/profile1.svg", nombre: "Jimmy is helping with", subtitulo: "Drywall", estrellas: "../../../../assets/imagenes/profileproject/estrellas.svg" },
    { fotoperfil: "../../../../assets/imagenes/profileproject/profile1.svg", nombre: "Jimmy is helping with", subtitulo: "Drywall", estrellas: "../../../../assets/imagenes/profileproject/estrellas.svg" },
    { fotoperfil: "../../../../assets/imagenes/profileproject/profile1.svg", nombre: "Jimmy is helping with", subtitulo: "Drywall", estrellas: "../../../../assets/imagenes/profileproject/estrellas.svg" },
    { fotoperfil: "../../../../assets/imagenes/profileproject/profile1.svg", nombre: "Jimmy is helping with", subtitulo: "Drywall", estrellas: "../../../../assets/imagenes/profileproject/estrellas.svg" },
    { fotoperfil: "../../../../assets/imagenes/profileproject/profile1.svg", nombre: "Jimmy is helping with", subtitulo: "Drywall", estrellas: "../../../../assets/imagenes/profileproject/estrellas.svg" },
    { fotoperfil: "../../../../assets/imagenes/profileproject/profile1.svg", nombre: "Jimmy is helping with", subtitulo: "Drywall", estrellas: "../../../../assets/imagenes/profileproject/estrellas.svg" },
    { fotoperfil: "../../../../assets/imagenes/profileproject/profile1.svg", nombre: "Jimmy is helping with", subtitulo: "Drywall", estrellas: "../../../../assets/imagenes/profileproject/estrellas.svg" },
  ];
  Projectsworkers = [
    { status: "Active", category: "Drywall", Specialized: "Drywall Apprentice", people: "4" },
    { status: "Active", category: "Drywall", Specialized: "Drywall Apprentice", people: "4" },
    { status: "Active", category: "Drywall", Specialized: "Drywall Apprentice", people: "4" },
    { status: "Active", category: "Drywall", Specialized: "Drywall Apprentice", people: "4" },
    { status: "Active", category: "Drywall", Specialized: "Drywall Apprentice", people: "4" },
    { status: "Active", category: "Drywall", Specialized: "Drywall Apprentice", people: "4" },
    { status: "Active", category: "Drywall", Specialized: "Drywall Apprentice", people: "4" }
  ];
  list(e) {
    if (e == 1) {
      this.up = !this.up;
    } else {
      this.up2 = !this.up2;
    }
  }
}
