import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as crypto from "crypto-js";
import { AngularFirestore } from 'angularfire2/firestore';
import { ProuserService } from 'src/app/services/prouser.service';
import { Subscription } from 'rxjs';
declare var $: any

@Component({
  selector: 'app-profile-pro',
  templateUrl: './profile-pro.component.html',
  styleUrls: ['./profile-pro.component.css']
})
export class ProfileProComponent implements OnInit, OnDestroy {

  text = 'Profile';
  righttv = ''
  select = 2
  lat: number = 51.678418;
  lng: number = 7.809007;
  menushow: boolean = false
  project: boolean = false
  alert: number = 1
  repro: any = ''
  textAlert: string = ''
  tobe: string = 'has'
  usuariosReviwsTodos: any[] = [];
  // Variables eventos
  up: boolean = false
  skills: any[] = ['Concrete', 'Decorator', 'Drywall', 'Electrical', 'Excavation', 'Flooring', 'General Labor', 'Insulation', 'Interior Finishing Carpentry', 'Iron Worker', 'Landscaper', 'Mason', 'Plastering', 'Plumbing', 'Roofer', 'Waterproof Installation'];
  selectskills: any[] = [];
  customers = [{ 'name': 'Add certificate file', 'url': '' }];
  cv = [{ "name": 'Add a file', "url": '' }]
  cvClose: boolean = false
  countC: number = 0
  uploadDoc: number = 0
  uploadDoc2: number = 0
  plus: boolean = false
  // Datos usuario
  cust: number = 0
  imageP: any = ''
  profile: any = ''
  credential: any
  password: string = ''
  tools: any[] = []
  //Validar correo
  emailVal: boolean = true
  correctEmail: any = new RegExp(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,9}$/)
  //Rating
  rate: number = 0
  rating: any[] = []
  //Reviews
  limit: number = 2
  //Subscripciones
  sub1: Subscription

  constructor(
    private prouser: ProuserService,
    private db: AngularFirestore
  ) { 
    
  }
  //Show data of User
  ngOnInit() {
    //boton slkill se cierre
   $(document).on("click", (e) => {

      var container = $(".btnPointer");
      var container2close=$(".list-group-scroll");
      if (!container.is(e.target) && container.has(e.target).length === 0 && !container2close.is(e.target) && container2close.has(e.target).length === 0) {
        this.up = false;
      }
    
    });

    this.sub1 = this.prouser.getInfo().snapshotChanges().subscribe((d) => {
      this.profile = d.payload.data()
      this.selectskills = this.profile.skills
      this.password = crypto.AES.decrypt(this.profile.password, 'N@!o').toString(crypto.enc.Utf8)
      setTimeout(() => {
        this.credential = this.prouser.credential(this.profile.email, this.password)
      }, 100);

      if (this.profile.certificate != null && this.profile.certificate.length != 0) {
        this.countC = this.customers.length; this.customers = this.profile.certificate
      }
      if (this.profile.certificate != '') {
        if (this.profile.certificate[0].name == 'Add certificate file') {
          this.countC = 0
        }
      }

      if (this.profile.tools) { this.tools = this.profile.tools }

      if (this.profile.photoUrl != null) { this.imageP = this.profile.photoUrl }

      if (this.profile.cvUrl != null) {
        this.cv = this.profile.cvUrl
        if (this.profile.cvUrl[0].name == 'Add a file') { this.cvClose = false }
        else { this.cvClose = true }
      }

      if (this.profile.reviews) {
        var temp: number = 0
        this.profile.reviews.forEach((r) => {
          temp += parseInt(r.rating)
        })
        this.rate = Math.round(temp / this.profile.reviews.length)
      }

    })

    $(window).scroll(function () {
      if ($(window).scrollTop() >= ($(".contenedorfooter").offset().top - $(".contenedorfooter").height() - 110)) {
        $(".textv").css({ 'position': 'absolute', 'top': 'auto', 'margin-top': '-16%' })
      } else {
        $(".textv").css({ 'position': '', 'top': '', 'margin-top': '' })
      }
    })
  }
  //Show Option
  selectOption(e) {
    this.usuariosReviwsTodos = [];
    this.select = e
    if (this.profile.reviews) {
      var temp: number = 0
      this.profile.reviews.forEach((r) => {
        temp += r.rating
        console.log(r.id);

        this.db.collection("users_hire").doc(r.id).snapshotChanges()
          .subscribe((data) => {
            this.repro = data.payload.data()
            this.usuariosReviwsTodos.push({ "id": r.id, "rating": r.rating, "descripcion": r.descripcion, "name": this.repro.name, "photoUrl": this.repro.photoUrl });
          })


      })
      console.log(this.usuariosReviwsTodos);

    }


  }
  // Update account information
  accountForm(f: NgForm) {

    this.prouser.updateAccount(f, this.profile.name, this.profile.lastname, this.profile.description)

    if (f.value.email.trim() != '' && f.value.email != this.prouser.user.email) {
      if (/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,9}$/.test(f.value.email)) {
        this.prouser.updateEmail(this.credential, f.value.email)
      } else {
        this.emailVal = false
      }
    }

    this.alert = 0
    this.textAlert = 'account information'
    this.tobe = 'has'
    setTimeout(() => {
      this.alert = 1
    }, 3000);

  }
  //Update Password
  passForm(f: NgForm) {
    if (f.value.pass1 == f.value.pass2) {
      this.prouser.updatePassword(this.credential, f.value.pass2)
        .then(() => {
          $("#cPass, #pass1, #pass2").val('')
          setTimeout(() => {
            $("#cPass, #pass1, #pass2").removeClass("errorInput correctInput")
            $("#cPass, #pass1, #pass2").next('span').attr('hidden', true)
            this.alert = 0
            this.textAlert = 'password'
            this.tobe = 'has'
            setTimeout(() => {
              this.alert = 1
            }, 3000);
          }, 200);
        })
    }
  }
  //Update Image Profile
  imageProfile(e: any) {
    this.prouser.updateProfileImg(e)
    this.textAlert = 'profile picture'
    this.tobe = 'has'
    this.alert = 0
    setTimeout(() => {
      this.alert = 1
    }, 3000);
  }
  //Section CV
  uploadCV(e: any) {
    for (let i = 0; i <= 100; i++) {
      setTimeout(() => {
        this.uploadDoc2 = i
      }, 1000);
    }
    setTimeout(() => {
      this.prouser.addCV(e)
    }, 1000);
  }
  deleteCV(e: any) {
    this.prouser.deleteCv(e)
  }
  //Section Skills
  selectskill(e) {
    var i = this.selectskills.indexOf(e)
    i === -1 && this.selectskills.push(e);
  }

  close(e) {
    var i = this.selectskills.indexOf(e)
    i !== -1 && this.selectskills.splice(i, 1)
  }

  updateSkills() {
    this.prouser.updateSkill(this.selectskills)
    this.alert = 0
    this.textAlert = 'skills'
    this.tobe = 'have'
    setTimeout(() => {
      this.alert = 1
    }, 3000);
  }
  //Actualizar tools
  toolsAdd(e: any, tool: string) {
    var temp: any = ''
    if (e.code == 'Enter' || e.code == 'Comma') {
      temp = e.code == 'Comma' ? tool.substr(0, tool.length - 1) : tool
      this.tools.push(temp)
      $('#toolsIn').val('')
    }
  }
  closeTool(e) {
    var i = this.tools.indexOf(e)
    i !== -1 && this.tools.splice(i, 1)
  }

  updateTools() {
    this.prouser.updateTool(this.tools)
    this.alert = 0
    this.textAlert = 'tools'
    this.tobe = 'have'
    setTimeout(() => {
      this.alert = 1
    }, 3000);
  }
  //Section Certificate
  addcustomer() {
    this.customers.push({ 'name': 'Add certificate file', 'url': '' });
    this.cust = this.customers.length - 1;
    this.uploadDoc = 0
    this.plus = false
  }

  uploadCert(e) {
    this.plus = true
    this.prouser.updateCert(e, this.cust, this.customers)
    for (let i = 0; i <= 100; i++) {
      setTimeout(() => {
        this.uploadDoc = i
      }, 1000);
    }
  }

  deleteCert(e: any) {
    var i = this.customers.indexOf(e);
    if (i !== -1) {
      this.prouser.deleteCert(e)
      this.customers.splice(i, 1)
      setTimeout(() => {
        this.prouser.updateUrlCert(this.customers)
      }, 200);
    }
    if (this.customers.length == 0) {
      this.customers = [{ 'name': 'Add certificate file', 'url': '' }];
      this.countC = 0
    }
  }

  ngOnDestroy() {
    this.sub1.unsubscribe()
  }

}
