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
  //Loading
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

    this.sub2 = this.proU.projects.subscribe((res) => {
      this.projects.push(res)
      this.loading = false
    })
  }

  ngOnDestroy(){
    this.sub1.unsubscribe()
    this.sub2.unsubscribe()
  }

}
