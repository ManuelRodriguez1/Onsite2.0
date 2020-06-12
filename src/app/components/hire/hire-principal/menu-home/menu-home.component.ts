import { Component, OnInit, ViewChild } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestore } from 'angularfire2/firestore';
import { NgForm, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ProjectService } from '../../../../services/project.service';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireStorage } from "angularfire2/storage";
import * as $ from 'jquery';

@Component({
  selector: 'app-menu-home',
  templateUrl: './menu-home.component.html',
  styleUrls: ['./menu-home.component.css']
})
export class MenuHomeComponent implements OnInit {
  reviews: any[] = []
  up = false;
  repro: any = ''
  description;
  valStarts;
  selectskills: any[] = [];
  usuariosReviwsTodos: any[] = [];
  teamSkills: any[] = [];
  skills = ['Concrete', 'Decorator', 'Drywall', 'Electrical', 'Excavation', 'Flooring', 'General Labor', 'Insulation', 'Interior Fishing Carpentry', 'Iron Worker', 'Landscaper', 'Mason', 'Plastering', 'Plumbing', 'Roofer', 'Waterproof Installation'];
  private contador = 4000 //Agreg
  projectname;
  peoples: any[] = [];
  people = 0;
  alerta = false;
  aleratEliminar=0;
  howmany = "Select";
  page = 1;
  contadorreviw = 0;
  select = 0;
  HomeFormularioNw = 0;
  files = [{ 'name': 'Add material file', 'url': '' }];
  file: any[] = [];
  countC: number = 0
  skills2Howmany: any[] = [];
  cust = 0;
  router: any;
  projects: any[] = []
  projectsHire: any[] = [];
  projectsHireDeleted: any[] = [];
  section: number = 1;
  text: any[] = ["Project", "Projects", "New Project"];
  righttv = 'text-dashboard';
  user = firebase.auth().currentUser
  user_hire: any = this.db.collection("users_hire").doc(this.user.uid)
  option = 5;
  customers2: any[] = [];
  viewP: any = ''
  profile: any = ''
  profileP: any = ''
  modal: number = 0
  confirm: number = 0
  confirm2 = ''
  error = 0
  apply: any[] = [];
  dataApply: any[] = [];
  LeaveForm = 1
  sProject: string = ''
  visiblePeople = false
  submitted = false;
  pattern: ""
  reviewR;
  rate: number = 0
  estrellitasreviws1 = 0;
  reviewdescripcion = "";
  constructor(private db: AngularFirestore,
    public projectService: ProjectService,
    public afAuth: AngularFireAuth,
    private afs: AngularFireStorage) {

  }
  //mostra lista de skill
  list(e) {
    if (e == 1) {
      this.up = !this.up;
    }
  }
  //Agregar Skill
  selectskill(e) {
    var i = this.selectskills.indexOf(e)
    if (i === -1) {
      this.selectskills.push(e);
      this.peoples.push({ "skill": e, "quantity": "" });
      console.log(this.peoples);
    }
    this.visiblePeople = true
  }
  //Eliminar Skill
  close(e) {
    var i = this.selectskills.indexOf(e)
    if (i !== -1) {
      this.selectskills.splice(i, 1)
      this.peoples.splice(i, 1)
      console.log(this.peoples);
    }
    this.visiblePeople = false
  }


  ngOnInit() {


    //Consulta todos los proyecto apenas detecta un cambio 
    this.db.collection("users_hire").doc(this.user.uid).collection("projects").snapshotChanges()
      .subscribe((d) => {
        d.forEach((d) => {
          this.projects.push(d.payload.doc.data())
        })
        console.log(this.projects)
      })
    //Funcion reviews




    this.projectService.Buscador.subscribe((res) => {

      console.log("de->" + this.reviewdescripcion);
      console.log("est->" + this.estrellitasreviws1);

      if (res) {

        this.reviews = res
        this.reviews.find((res1) => {
          if (res1.id == this.user.uid) {

            res1.descripcion = this.reviewdescripcion;
            res1.rating = this.estrellitasreviws1;

            console.log(this.reviews);

            this.updateReviews();



          } else {


            var contador = 1;
            this.reviews.find((res1) => {
              console.log(this.reviews.length + "====" + contador);
              if (res1.id != this.user.uid && contador == this.reviews.length) {

                this.reviews.push({ "id": this.user.uid, "rating": this.estrellitasreviws1, "descripcion": this.reviewdescripcion })
                console.log(this.reviews);
                this.updateReviews();
              }
              contador++;

            })






          }


        })

        console.log(this.reviews);
      }

      console.log(res);
      console.log("kate");



    })

  }



  //update this.reviews
  updateReviews() {
    console.log("manuel->" + this.profileP.id);
    this.db.collection("users_pro").doc(this.profileP.id).update({
      reviews: this.reviews,
    }).then((res) => {
      location.href = "/Hireprincipal";
    }).catch((error) => {

    })

  }



  //Consulta descripciòn Hire 
  onKey(event) {
    this.contador = 4000 - event.target.value.length
  }

  //Agregar Proyecto BD
  addProject(f: NgForm) {
    this.error = 2
    this.submitted = true
    var aux = []

    //Campos dinamocos para agregar personas segun skill
    $(".addPeople").each(function (index) {
      var skill = $(this).attr("id");
      var quantity = $(this).val();
      if (quantity == "" || quantity == 0) {
        $("#" + skill).removeClass("correctInput");
        $(".a" + skill).html("people is required");
        $("#" + skill).addClass("errorInput");
      } else {
        $(".a" + skill).html("");
        $("#" + skill).removeClass("errorInput");
        $("#" + skill).addClass("correctInput");
      }
      aux.push({ "skill": skill, "quantity": quantity })
    });
    //Validacion campos 
    if (f.status == "INVALID" || f.value.passtest == false || f.value.taketest == false || f.value.passtest === undefined || f.value.taketest === undefined || this.selectskills == []) {
      if (f.value.projectname === undefined || f.value.projectname == "" || f.value.description === undefined || f.value.description == ""
        || f.value.location === undefined || f.value.location == "" || f.value.estimated === undefined || f.value.estimated == "" ||
        this.selectskills.length == 0 || f.value.enddate === undefined || f.value.enddate == "" || f.value.startdate === undefined || f.value.startdate == ""
        || f.value.passtest === undefined || f.value.passtest == false || f.value.taketest === undefined || f.value.taketest == false) {
        this.alerta = true;
      }
    } else if (f.value) {

      var temp = false

      //Crear o editar funcion 
      this.projectService.newProject(f, this.file, this.files, this.selectskills, aux)

      this.modal = 1
      this.section = 1
      this.projects = []
    }

  }



  //Vista crear nuevo proyecto

  next() {
    this.error = 2
    this.page++;
    this.HomeFormularioNw++;
    this.section = 2;
    this.righttv = 'text-new-project';
  }
  //Add files material
  addfiles() {
    this.files.push({ 'name': 'Add material file', 'url': '' });
    this.cust = this.files.length - 1;
  }
  //Modificar files material
  uploadDoc(e) {
    var fileDoc = this.afs.ref('Users_hire/' + this.user.uid + "/" + e.target.files[0].name).put(e.target.files[0])
    fileDoc.then((url) => {
      url.ref.getDownloadURL()
        .then((url) => {
          this.files[this.cust] = { "name": e.target.files[0].name, "url": url }
        })
    })
  }
  //opcion segun filtro vista 
  selectOption(e) {
    this.option = e
  }
  /*
    showModal() {
      this.modal = 1
    }
  */

  hideModal() {
    this.select = 0
    this.HomeFormularioNw = 0
    this.modal = 3

  }
  //Eliminar material
  deleteBriefMaterial(e: any) {
    var i = this.files.indexOf(e);
    if (i !== -1) {
      this.afs.ref('Users_pro/' + this.user.uid + "/" + e.name).delete()
      this.files.splice(i, 1)
      setTimeout(() => {
        this.user_hire.update({
          "briefmaterial": this.files
        })
      }, 200);
    }
    if (this.files.length == 0) {
      this.files = [{ 'name': 'Add material file', 'url': '' }];
      this.countC = 0
    }
  }
  //Modificar estado del proyecto a eliminado 
  delete(idP) {
    this.modal = 2
    this.confirm2 = idP
    if (this.confirm == 1) {
      this.option = this.option + 5
      this.projects = []
      this.db.collection("users_hire").doc(this.user.uid).collection("projects").doc(idP).update({
        status: 4,
        statusname: 'Deleted',
      }).then((url) => {
        this.option = this.option - 5
        this.error = 0
        this.aleratEliminar = 1
        setTimeout(() => {
          this.aleratEliminar = 0
        }, 3000);
    
      })
      this.modal = 3
      this.confirm = 0
    }
    this.aleratEliminar = 0
  }

  //Modificar estado del proyecto a archivado 
  archivedStatus(idP) {
    this.option = this.option + 5

    this.projects = []
    this.db.collection("users_hire").doc(this.user.uid).collection("projects").doc(idP).update({
      status: 3,
      statusname: 'Archived',
    }).then((url) => {
      this.option = this.option - 5
    })


  }
  //ventana emergente confirmar para cambiar estado del proyecto a eliminado 
  confirmDelete() {
    this.confirm = 1
    this.delete(this.confirm2)
    



 
  }

  //Ver proyecto 
  viewProject(p) {
    this.selectskills = p.skills;
    this.peoples = p.people;
    this.files = p.briefmaterial;
    this.righttv = 'text-project'
    this.error = 2
    this.HomeFormularioNw = 2
    this.section = 0;
    this.viewP = p;
    this.apply = this.viewP.applyUsers;
    this.visiblePeople = true;
    if (this.apply) {
      for (var i = 0; i < this.apply.length; i++) {
        this.db.collection("users_pro").doc(this.apply[i]).get()
          .subscribe((data) => {
            this.dataApply.push(data.data());
            console.log(this.dataApply);
            data.data().skills.forEach(element => {
              this.buscar_team_skill(element, data.data());
            });


          })
      }


    }


  }

  //Funcion para buscar team skill segun el proyecto 
  buscar_team_skill(userProSkill, dataApply) {
    if (this.viewP.skills) {
      var i = this.viewP.skills.indexOf(userProSkill)
      if (i === 0) {
        this.teamSkills.push({ "team": userProSkill, "dataApply": dataApply })
        console.log(this.teamSkills);
      }
    }
  }
  //Numero de estrellas reviws
  estrellitasreviws(e) {
    this.estrellitasreviws1 = e;
    this.valStarts = e;
  }
  //Ver el perfil del usuario pro 
  goToProfile(profile) {
    this.HomeFormularioNw = 3
    this.section = 4
    this.profileP = profile;
    console.log(this.profileP.reviews);
    if (this.profileP.reviews) {
      var temp: number = 0
      this.profileP.reviews.forEach((r) => {
        temp += r.rating
        console.log(r.id);

        this.db.collection("users_hire").doc(r.id).snapshotChanges()
          .subscribe((data) => {

            this.repro = data.payload.data()
            console.log(this.repro);
            this.usuariosReviwsTodos.push({ "id": r.id, "rating": r.rating, "descripcion": r.descripcion, "name": this.repro.name, "photoUrl": this.repro.photoUrl });

            if (r.id == this.user.uid) {
              this.reviewR = r.descripcion;
              this.valStarts = r.rating
              this.estrellitasreviws1 = r.rating
            }
          })


      })
      console.log(this.usuariosReviwsTodos);
      this.rate = Math.round(temp / this.profileP.reviews.length)

    }





    console.log(this.profileP);

  }


  //Ver el proyecto segun el id para editar 
  goToEditProject(idP) {
    this.HomeFormularioNw = 1;
    console.log("ok")
  }
  //Mostrar los reviews
  leave() {
    this.LeaveForm = 1
  }
  //Cerrar los reviews
  cancelRate() {
    this.LeaveForm = 0
  }



  //Modificar Reviews
  postReview() {
    var review = $("#reviewR");
    var valStarts = $("#valStarts");


    if (valStarts.val() === 0 || valStarts.val() === undefined || valStarts.val() == "") {
      $("#currentRaterror").html("You must rate to post your review.");
    } else if (review.val() == "" || review.val() === undefined) {
      review.removeClass("correctInput");
      review.addClass("errorInput");
      $("#reviewRerror").html("Your review must be at least 100 characters long.");
    } else {
      review.removeClass("errorInput");
      review.addClass("correctInput");
      $("#reviewRerror").html("");
      $("#currentRaterror").html("");
      // this.LeaveForm = 0


      this.reviewdescripcion = review.val()
      this.estrellitasreviws1 = valStarts.val()
      console.log(this.profileP);

      if (this.profileP.reviews) {
        this.projectService.Buscador.emit(this.profileP.reviews)
      } else {
        this.reviews.push({ "id": this.user.uid, "rating": this.estrellitasreviws1, "descripcion": this.reviewdescripcion })
        this.updateReviews()
      }






    }
  }
}