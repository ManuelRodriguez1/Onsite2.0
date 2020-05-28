import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProuserService } from 'src/app/services/prouser.service';
import * as firebase from "firebase/app";
import { Router } from "@angular/router";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit, OnDestroy {

  select: number = 0
  modal: number = 0
  projects: any[] = []
  loading: boolean
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
  cantResul: number = 5

  suscription: Subscription

  constructor(private prouser: ProuserService, public router: Router) { 
    this.loading = true }

  ngOnInit() {
    this.prouser.getInfoHire().snapshotChanges()
      .subscribe((d) => {
        var tempProjects: any[] = []
        d.forEach((j) => {
          var profile: any = j.payload.doc.data()
          if (profile.project) {
            j.payload.doc.ref.collection("projects").orderBy("creationdate", this.filter)
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
                      tempProjects.push([k.doc.data(), {
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
        this.prouser.pagination.emit(tempProjects)
        this.loading = false
      })

    this.suscription = this.prouser.pagination.subscribe((res) => {
      this.projects = res
      setTimeout(() => {
        this.pagination()
      }, 1000);
    })
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
      if (this.users.includes(res)) {
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
    page = Math.ceil(this.projects.length / this.cantResul)
    for (let i = 1; i <= page; i++) {
      this.pages.push(i)
    }
  }
  changePag(e: number) {
    this.start = ((e * this.cantResul) - this.cantResul) == 0 ? 1 : (e * this.cantResul) - this.cantResul
    this.end = e * this.cantResul
  }
  nextPage() {
    if (this.end < this.projects.length) {
      this.start += this.cantResul
      this.end += this.cantResul
    }
  }
  prevPage() {
    if (this.start > 1) {
      this.start -= this.cantResul
      this.end -= this.cantResul
    }
  }
  firstPage() {
    this.start = 1
    this.end = this.cantResul
  }
  lastPage() {
    var i = this.pages[this.pages.length - 1]
    this.changePag(i)
  }

  ngOnDestroy(){
    this.suscription.unsubscribe()
  }
}