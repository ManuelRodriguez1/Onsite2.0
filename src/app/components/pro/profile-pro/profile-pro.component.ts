import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as crypto from "crypto-js";
import { AngularFirestore } from 'angularfire2/firestore';
import { ProuserService } from 'src/app/services/prouser.service';
declare var $: any

@Component({
  selector: 'app-profile-pro',
  templateUrl: './profile-pro.component.html',
  styleUrls: ['./profile-pro.component.css']
})
export class ProfileProComponent implements OnInit {

  text = 'Profile';
  righttv = ''
  select = 2
  lat: number = 51.678418;
  lng: number = 7.809007;
  menushow: boolean = false
  project: boolean = false
  alert: number = 1
  repro: any = ''
  usuariosReviwsTodos: any[] = [];
  // Variables eventos
  up: boolean = false
  skills: any[] = ['Concrete', 'Decorator', 'Drywall', 'Electrical', 'Excavation', 'Flooring', 'General Labor', 'Insulation', 'Interior Fishing Carpentry', 'Iron Worker', 'Landscaper', 'Mason', 'Plastering', 'Plumbing', 'Roofer', 'Waterproof Installation'];
  selectskills: any[] = [];
  customers = [{ 'name': 'Add certificate file', 'url': '' }];
  cv = [{ "name": 'Add a file', "url": '' }]
  cvClose: boolean = false
  countC: number = 0
  // Datos usuario
  cust: number = 0
  imageP: any = ''
  profile: any = ''
  credential: any
  password: string = ''
  //Validar correo
  emailVal: boolean = true
  correctEmail: any = new RegExp(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,9}$/)
  //Rating
  rate: number = 0
  rating: any[] = []

  constructor(
    private prouser: ProuserService,
    private db: AngularFirestore
  ) { }
  //Show data of User
  ngOnInit() {
    this.prouser.getInfo().snapshotChanges().subscribe((d) => {
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
    $('html').on('click', () => {
      this.up = false
    })
    $("#clickSkills, .skillselct").click(function (e) {
      e.stopPropagation()
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
            console.log(this.repro);
            this.usuariosReviwsTodos.push({ "id": r.id, "rating": r.rating, "descripcion": r.descripcion, "name": this.repro.name, "photoUrl": this.repro.photoUrl });

           /* if (r.id == this.user.uid) {
              this.reviewR = r.descripcion;
              this.valStarts = r.rating
              this.estrellitasreviws1 = r.rating
            }*/
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
  }
  //Section CV
  uploadCV(e: any) {
    this.prouser.addCV(e)
  }
  deleteCV(e: any) {
    this.prouser.deleteCv(e)
  }
  //Section Skills
  list() {
    this.up = !this.up;
  }

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
  }
  //Section Certificate
  addcustomer() {
    this.customers.push({ 'name': 'Add certificate file', 'url': '' });
    this.cust = this.customers.length - 1;
  }

  uploadCert(e) {
    this.prouser.updateCert(e, this.cust, this.customers)
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

}
