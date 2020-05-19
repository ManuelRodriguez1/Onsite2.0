import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase/app";
import { AngularFirestore } from "angularfire2/firestore";

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
  user: any = firebase.auth().currentUser
  // Datos usuario
  name: string
  lastname: string
  photo: string
  //Informacion proyecto
  infoProject: any[] = [] 
  lat: number = 51.678418
  long: number = 7.809007

  constructor(private af: AngularFirestore) { firebase.firestore().enablePersistence() }

  ngOnInit() {
    this.loading = true
    this.af.collection("users_hire").ref.where("project", "==", true)
      .onSnapshot((d) => {
        d.docChanges().forEach((d) => {
          this.name = d.doc.data().name
          this.lastname = d.doc.data().lastname
          this.photo = d.doc.data().photoUrl
          d.doc.ref.collection("projects").where("status", ">", 0).where("status", "<", 3)
            .onSnapshot({ includeMetadataChanges: true }, (d) => {
              d.docChanges().forEach((d) => {                
                this.projects.push([d.doc.data(), { "photo": this.photo, "name": this.name + ' ' + this.lastname }])
                if(d.type === 'modified'){
                  this.projects.forEach((data)=>{
                    if(data[0].t == d.doc.data().t){
                      this.projects.splice(data, 1)
                    }
                  })
                }
              })
            })
        })
      })
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
