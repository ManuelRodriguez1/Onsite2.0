import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as crypto from "crypto-js";
import { HireuserService } from 'src/app/services/hireuser.service';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from "firebase";
declare var $: any

@Component({
  selector: 'app-profile-hire',
  templateUrl: './profile-hire.component.html',
  styleUrls: ['./profile-hire.component.css']
})
export class ProfileHireComponent implements OnInit {
  text = 'Profile';
  righttv = ''
  select = 1

  imageP: any = ''
  user = firebase.auth().currentUser
  name: string = ''
  lastName: string = ''
  email: string = ''
  currentPassword: string = ''
  profile: any = ''
  profileStatus: any = ''
  password: string = ''
  profileCompleted: boolean = false
  projects: any[] = []
  projectsCompleted: any[] = []
  credential: any
  emailVerified: any
  countProject = 0
  emailVal: boolean = true
  alert: number = 1
  textAlert: string = ''
  zipcode: string = '';
  constructor(
    private af: AngularFirestore,
    private hireuser: HireuserService
  ) { }

  ngOnInit() {
    this.emailVerified = this.user.emailVerified
    this.af.collection("users_hire").doc(this.user.uid).collection("projects").ref.where("status", ">", 0)
      .onSnapshot({ includeMetadataChanges: true }, (d) => {
        d.docChanges().forEach((d) => {
          this.projects.push([d.doc.data()])
      
          if (d.doc.data().status === 2) {
            this.projectsCompleted.push(d.doc.data())
          } 
          //else if (d.type === 'removed') {
            //this.projects.forEach((data) => {
              //if (data[0].t == d.doc.data().t) {
                //this.projects.splice(this.projects.indexOf(data), 1)
              //}
           // })
          //}
        })
      })
    this.hireuser.getInfoUser().snapshotChanges().subscribe((d) => {
      this.profile = d.payload.data()
  
    
    
      if (this.profile) {
          if(this.profile.password){
            this.password = crypto.AES.decrypt(this.profile.password, 'N@!o').toString(crypto.enc.Utf8)
            setTimeout(() => {
              this.credential = this.hireuser.getCredential(this.profile.email, this.password)
            }, 800);
          }
       

        if (this.profile.photoUrl != null) {
          this.imageP = this.profile.photoUrl
        }
        if (this.profile.zipcode) {
          this.zipcode = this.profile.zipcode
        }
        if (this.profile.photoUrl != null && this.emailVerified != false) {
          this.profileCompleted = true
        }
      }

    })
  }

  imageProfile(e: any) {
    this.hireuser.updateProfileImg(e)

    this.alert = 0
    this.textAlert = 'picture'
    setTimeout(() => {
      this.alert = 1
    }, 3000);
  }

  accountForm(f: NgForm) {
    if (this.hireuser.updateAccount(f, this.profile.name, this.profile.lastname)) {
  
    }
    if (f.value.email.trim() != '') {
      if (/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,9}$/.test(f.value.email)) {
        this.hireuser.updateEmail(this.credential, f.value.email)

        this.alert = 0
        this.textAlert = 'account information'
        setTimeout(() => {
          this.alert = 1
        }, 3000);
      } else {
        this.emailVal = false
       
      }
    }

   

  }

  locationForm(f: NgForm){
    this.hireuser.updateUlocation(f.value.zipcode)
    this.alert = 0
    this.textAlert = 'location'
    setTimeout(() => {
      this.alert = 1
    }, 3000);
    
  }
  passForm(f: NgForm) {
    if (f.value.pass1 == f.value.pass2) {
      this.hireuser.updatePassword(this.credential, f.value.pass2)
        .then(() => {
          $("#cPass, #pass1, #pass2").val('')
          setTimeout(() => {
            $("#cPass, #pass1, #pass2").removeClass("errorInput correctInput")
            $("#cPass, #pass1, #pass2").next('span').attr('hidden', true)
            this.alert = 0
            this.textAlert="Password";
            setTimeout(() => {
              this.alert = 1
           
            }, 3000);
          }, 200);
        })
    }
  }

  selectOption(e) {
    this.select = e
  }

}