import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProuserService } from 'src/app/services/prouser.service';
import * as firebase from "firebase";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['../explore/explore.component.css', './projects.component.css']
})
export class ProjectsComponent implements OnInit, OnDestroy {

  //List projects
  projects: any[] = []
  projects2: any[] = []
  f: number = 5
  az: boolean
  azStatus: boolean
  idDoc: any = ''
  cont: number = 0
  alert: number = 1
  chat: boolean = false
  //Paginación
  pages: number[] = []
  start: number = 1
  end: number = 5
  cantResul: number = 10
  //loading
  loading: boolean = true
  //Subscripciones
  sub1: Subscription
  sub2: Subscription
  sub3: Subscription

  constructor(private proU: ProuserService) { firebase.firestore().enablePersistence() }

  ngOnInit() {
    this.sub1 = this.proU.getInfoHire().snapshotChanges()
      .subscribe((h) => {
        this.projects = []
        h.forEach((p) => {
          var data: any = p.payload.doc.data()
          var id: any = p.payload.doc.id
          if (data.project) {
            p.payload.doc.ref.collection("projects").orderBy("creationdate", "desc")
              .onSnapshot((proj) => {
                proj.docChanges().map((info) => {
                  if (info.doc.data().applyUsers) {
                    if (info.doc.data().applyUsers.includes(this.proU.user.uid)) {
                      this.proU.getChatExist().doc(id + '|' + this.proU.user.uid).get()
                        .subscribe((v) => {
                          this.chat = v.exists
                          this.idDoc = id
                          this.proU.projects.emit(info.doc.data())
                        })
                    }
                  }
                })
              })
          }
        })
      })

    this.sub2 = this.proU.projects.subscribe((res) => {
      this.projects.push(res)
      this.projects[this.cont].idDoc = this.idDoc
      this.projects[this.cont].chat = this.chat
      this.cont++
      this.loading = false
      this.proU.pagination.emit(this.projects)
    })

    this.sub3 = this.proU.pagination.subscribe((res) => {
      this.projects2 = res
      setTimeout(() => {
        this.pagination()
        this.start = 1
        this.end = this.cantResul
      }, 100)
    })


  }

  ngOnDestroy() {
    this.sub1.unsubscribe()
    this.sub2.unsubscribe()
    this.sub3.unsubscribe()
  }

  filterStatus(e: number) {
    this.f = e
  }

  trash(e: any) {
    this.f = this.f + 5
    setTimeout(() => {
      this.f = this.f - 5
    }, 200);
    var users: any[] = e.applyUsers
    var i = users.indexOf(this.proU.user.uid)
    i !== -1 && users.splice(i, 1)
    this.proU.getInfoHire().doc(e.idDoc).collection("projects").doc(e.id)
      .update({
        "applyUsers": users
      })
    this.alert = 0
    setTimeout(() => {
      this.alert = 1
    }, 3000);
    var j = this.projects.indexOf(e)
    this.projects.splice(j, 1)
    this.proU.pagination.emit(this.projects)
  }

  //Ir al Inbox especifico
  messages(p: any) {
    localStorage.setItem('key', p.idDoc + '|' + this.proU.user.uid)
  }

  azOrder() {
    this.az = !this.az
  }

  azStat() {
    this.azStatus = !this.azStatus
  }

  pagination() {
    this.pages = []
    var page: number
    page = Math.ceil(this.projects2.length / this.cantResul)
    for (let i = 1; i <= page; i++) {
      this.pages.push(i)
    }
  }
  changePag(e: number) {
    this.start = ((e * this.cantResul) - this.cantResul) == 0 ? 1 : (e * this.cantResul) - this.cantResul
    this.end = e * this.cantResul
  }
  nextPage() {
    if (this.end < this.projects2.length) {
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
}
