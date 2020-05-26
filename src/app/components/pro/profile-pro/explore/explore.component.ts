import { Component, OnInit } from '@angular/core';
import { ProuserService } from 'src/app/services/prouser.service';
import * as firebase from "firebase/app";
import { Router } from "@angular/router";

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {

  select: number = 0
  modal: number = 0
  projects: any[] = []
  loading: boolean = true
  // Datos usuario
  profile: any = []
  //Informacion proyecto
  infoProject: any[] = []
  lat: number = 51.678418
  long: number = 7.809007
  //Filtro
  filter: any = 'desc'
  //Paginación
  pages: number[] = []
  start: number = -1
  end: number = 5

  constructor(private prouser: ProuserService, public router: Router) { firebase.firestore().disableNetwork() }

  ngOnInit() {
    this.prouser.getInfoHire().snapshotChanges()
      .subscribe((d) => {
        firebase.firestore().enableNetwork()
        d.forEach((j) => {
          this.profile = j.payload.doc.data()
          if (this.profile.project) {
            j.payload.doc.ref.collection("projects").orderBy("creationdate", this.filter)/* .where("creationdate", ">", "May 20, 2019 at 12:31:21 PM UTC-5") */
              .onSnapshot((d) => {
                d.docChanges().map((k) => {
                  if (k.doc.data().status > 0 && k.doc.data().status < 3) {
                    if (k.type === 'modified') {
                      this.projects.map((m) => {
                        if (m[0].creationdate === k.doc.data().creationdate) {
                          m = [k.doc.data(), { "photo": this.profile.photoUrl, "name": this.profile.name + ' ' + this.profile.lastname }]
                        }
                      })
                    } else {
                      this.projects.push([k.doc.data(), { "photo": this.profile.photoUrl, "name": this.profile.name + ' ' + this.profile.lastname }])
                    }
                  }
                })
              })
          }
        })
      })
    firebase.firestore().disableNetwork()
    setTimeout(() => {
      this.pagination()
    }, 2000);
    this.loading = false
  }
  sendInfo(e) {
    this.infoProject = e
    this.select = 1
  }
  apply() {
    this.modal = 1
  }
  hideModal() {
    this.modal = 2
    this.select = 0
  }
  backExplore(){
    location.reload()
  }
  pagination(){
    var page: number
    page =  Math.ceil(this.projects.length / 5)
    for (let i = 1; i <= page; i++) {
      this.pages.push(i)
    }
    console.log(this.pages);
    
  }
}
