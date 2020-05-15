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

  constructor(private af: AngularFirestore) { /* firebase.firestore().enablePersistence() */ }

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
                  console.warn("test modified");
                  //Probar con map y reemplazar el dato existente exitos https://es.stackoverflow.com/questions/125780/reemplazar-dato-en-un-arreglo
                }
              })
            })
        })
      })
    this.loading = false
  }
  sendInfo() {
    return false
  }
  apply() {
    this.modal = 1
  }
  hideModal() {
    this.modal = 2
    this.select = 0
  }
}
