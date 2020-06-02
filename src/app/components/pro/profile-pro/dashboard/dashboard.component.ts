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
  //Loading
  loading: boolean = true
  applyPro: number = 0
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
                    }else{
                      this.proU.projects.emit(null)
                    }
                  }
                })
              })
          }
        })
      })

    this.sub2 = this.proU.projects.subscribe((res) => {
      if(res != null){
        this.projects.push(res)
      }else{
        this.applyPro = 1
      }
      this.loading = false
    })
  }

  ngOnDestroy(){
    this.sub1.unsubscribe()
    this.sub2.unsubscribe()
  }

}
