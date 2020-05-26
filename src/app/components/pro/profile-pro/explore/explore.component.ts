import { Component, OnInit } from '@angular/core';
import { ProuserService } from 'src/app/services/prouser.service';
import * as firebase from "firebase/app";

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {

  select: number = 0
  modal: number = 0
  projects: any[] = []
  loading: boolean
  // Datos usuario
  name: string
  lastname: string
  photo: string
  //Informacion proyecto
  infoProject: any[] = []
  lat: number = 51.678418
  long: number = 7.809007
  //Filtro
  filter: any = 'desc'

  constructor(private prouser: ProuserService) { firebase.firestore().disableNetwork() }

  ngOnInit() {
    this.loading = true
    this.prouser.getInfoHire().snapshotChanges()
      .subscribe((d) => {
        firebase.firestore().enableNetwork()
        d.forEach((j) => {
          if (j.payload.doc.data().project) {
            this.name = j.payload.doc.data().name
            this.lastname = j.payload.doc.data().lastname
            this.photo = j.payload.doc.data().photoUrl
            j.payload.doc.ref.collection("projects").orderBy("creationdate", this.filter)/* .where("creationdate", ">", "May 20, 2019 at 12:31:21 PM UTC-5") */
              .onSnapshot((d) => {
                d.docChanges().map((k) => {
                  if (k.doc.data().status > 0 && k.doc.data().status < 3) {
                    if (k.type === 'modified') {
                      this.projects.map((m) => {
                        if (m[0].creationdate === k.doc.data().creationdate) {
                          m = [k.doc.data(), { "photo": this.photo, "name": this.name + ' ' + this.lastname }]
                        }
                      })
                    } else {
                      this.projects.push([k.doc.data(), { "photo": this.photo, "name": this.name + ' ' + this.lastname }])
                    }
                  }
                })
              })
          }
        })
      })
    firebase.firestore().disableNetwork()
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
}
