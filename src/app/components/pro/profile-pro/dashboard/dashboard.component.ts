import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProuserService } from 'src/app/services/prouser.service';
import * as firebase from "firebase";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../explore/explore.component.css', './dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  //List projects
  projects: any[] = []
  infoPro: any[] = []
  select: number = 0
  //Loading
  loading: boolean = true
  applyPro: number = 0
  info: boolean = true
  inter: any
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
          if (data.project) {
            p.payload.doc.ref.collection("projects").orderBy("creationdate", "desc")
              .onSnapshot((proj) => {
                proj.docChanges().map((info) => {
                  if (info.doc.data().applyUsers) {
                    if (info.doc.data().applyUsers.includes(this.proU.user.uid)) {
                      this.proU.projects.emit(info.doc.data())
                    }
                  }
                })
              })
          }
        })
      })
      console.log(this.projects);

    this.sub2 = this.proU.projects.subscribe((res) => {
      this.projects.push(res)
      this.loading = false
    })

    this.inter = setInterval(() => {
      if (this.projects.length == 0) {
        this.applyPro = 1
        this.loading = false
      } else {
        clearInterval(this.inter)
      }
    }, 1000)
  }

  infoProject(e: any){
    this.select = 1
    this.infoPro = e
  }

  ngOnDestroy() {
    this.sub1.unsubscribe()
    this.sub2.unsubscribe()
  }
  openExplorePro(){
    location.href="/ExplorePro";
  }

}
