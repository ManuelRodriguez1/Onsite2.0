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
  f: number = 5
  az: boolean
  azStatus: boolean
  idDoc: any = ''
  cont: number = 0
  alert: number = 1
  //loading
  loading: boolean = true
  //Subscripciones
  sub1: Subscription
  sub2: Subscription

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
                      this.idDoc = id
                      this.proU.projects.emit(info.doc.data())
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
      this.cont++
      this.loading = false
    })
  }

  ngOnDestroy() {
    this.sub1.unsubscribe()
    this.sub2.unsubscribe()
  }

  filterStatus(e: number) {
    this.f = e
  }

  trash(e: any) {
    console.info(e)
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
  }

  azOrder() {
    this.az = !this.az
  }

  azStat() {
    this.azStatus = !this.azStatus
  }
}
