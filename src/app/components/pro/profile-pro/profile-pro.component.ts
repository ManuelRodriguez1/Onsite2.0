import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as crypto from "crypto-js";
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
  menushow:boolean = false
  project: boolean = false
  alert: number = 1
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

  constructor(
    private prouser: ProuserService
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
      if (this.profile.certificate != null) {
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
    })
  }
  //Show Option
  selectOption(e) {
    this.select = e
  }
  // Update account information
  accountForm(f: NgForm) {
    if (this.prouser.updateAccount(f, this.profile.name, this.profile.lastname, this.profile.description)) {
      $("#name").val('')
      $("#lastname").val('')
      $("#description").val('')
    }

    if (f.value.email.trim() != '') {
      if (/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,9}$/.test(f.value.email)) {
        this.prouser.updateEmail(this.credential, f.value.email)
        $("#email").val('')
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
