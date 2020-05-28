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
  users: any[] = []
  //Informacion proyecto
  infoProject: any[] = []
  lat: number = 51.678418
  long: number = 7.809007
  buttonApply: boolean = true
  //Filtro
  filter: any = 'desc'
  //Paginación
  pages: number[] = []
  start: number = 1
  end: number = 5

  constructor(private prouser: ProuserService, public router: Router) { firebase.firestore().disableNetwork() }

  ngOnInit() {
    this.prouser.getInfoHire().snapshotChanges()
      .subscribe((d) => {
        firebase.firestore().enableNetwork()
        d.forEach((j) => {
          var profile: any = j.payload.doc.data()
          if (profile.project) {
            j.payload.doc.ref.collection("projects").orderBy("creationdate", this.filter)/* .where("creationdate", ">", "May 20, 2019 at 12:31:21 PM UTC-5") */
             .onSnapshot((d) => {
                d.docChanges().map((k) => {
                  if (k.doc.data().status > 0 && k.doc.data().status < 3) {
                    if (k.type === 'modified') {
                      this.projects.map((m) => {
                        if (m[0].creationdate === k.doc.data().creationdate) {
                          m = [k.doc.data(), {
                            "idProject": k.doc.id,
                            "idUser": profile.id,
                            "photo": profile.photoUrl,
                            "name": profile.name + ' ' + profile.lastname
                          }]
                        }
                      })
                    } else {
                      this.projects.push([k.doc.data(), {
                        "idProject": k.doc.id,
                        "idUser": profile.id,
                        "photo": profile.photoUrl,
                        "name": profile.name + ' ' + profile.lastname
                      }])
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
    this.prouser.users.subscribe((res) => {
      switch (res) {
        case 1:
          this.users.push(this.prouser.user.uid)
          this.prouser.users.emit(2)
          break;
        case 2:          
          this.prouser.applyProject(this.infoProject[1].idUser, this.infoProject[1].idProject, this.users)
          break;
      }
    })
    this.prouser.similar.subscribe(res => {      
      if(this.users.includes(res)){       
        this.buttonApply = false
      }
    })
  }
  sendInfo(e) {
    this.infoProject = e
    this.select = 1
    this.prouser.getProject(this.infoProject[1].idUser, this.infoProject[1].idProject).get()
      .subscribe((d) => {
        var info: any = d.data()
        if (info.applyUsers) {
          this.users = info.applyUsers
          this.prouser.similar.emit(this.prouser.user.uid)
        }
      })
  }
  apply() {
    this.modal = 1
    this.buttonApply = false
    this.prouser.users.emit(1)
  }
  hideModal() {
    this.modal = 2
    this.select = 0
  }
  backExplore() {
    location.reload()
  }
  pagination() {
    var page: number
    page = Math.ceil(this.projects.length / 5)
    for (let i = 1; i <= page; i++) {
      this.pages.push(i)
    }
  }
  changePag(e: number) {
    this.start = ((e * 5) - 5) == 0 ? 1 : (e * 5) - 5
    this.end = e * 5
  }
}