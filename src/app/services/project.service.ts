import { Injectable, EventEmitter } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFirestore } from "angularfire2/firestore";
import { AngularFireStorage } from "angularfire2/storage";
import * as firebase from "firebase/app";
import { NgForm } from "@angular/forms";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  currentDate = new Date();
  user = firebase.auth().currentUser
  Buscador = new EventEmitter<any>()
  constructor(
    public af: AngularFireAuth,
    private db: AngularFirestore,
    private afs: AngularFireStorage) {
  }
//Crear nuevo proyecto o modificar nuevo proyecto
  newProject(f: NgForm, file: any[],  selectskills: any[], peoples: any[],locationApp,latitude,longitude, ProjectImage: any[]) {
    var idProject;
    if (f.value.id) {
      idProject = f.value.id;
    } else {
      idProject = this.db.createId()
    }
    this.db.collection("users_hire").doc(this.user.uid).collection("projects").doc(idProject).set({
      id: idProject,
      projectname: f.value.projectname,
      creationdate: this.currentDate,
      description: f.value.description,
      googleZipCode: f.value.googleZipCode,
      location: locationApp,
      latitude:latitude,
      longitude:longitude,
      estimated: f.value.estimated,
      startdate: f.value.startdate,
      enddate: f.value.enddate,
      taketest: f.value.taketest,
      passtest: f.value.passtest,
      skills: selectskills,
      people: peoples,
      status: 1,
      statusname: 'Pending'

    }, { merge: true }).then(() => {
      this.db.collection('users_hire').doc(this.user.uid).set({
        "project": true
      }, { merge: true })
      let briefMaterial=[]
      for (let i = 0; i < file.length; i++) {
        var fileDoc = this.afs.ref('Users_hire/' + this.user.uid + idProject + "/" + file[i].name).put(file[i])
        fileDoc.then((url) => {
          url.ref.getDownloadURL()
            .then((url) => {
              briefMaterial.push({ "name": file[i].name, "url": url })
              setTimeout(() => {
                this.db.collection('users_hire').doc(this.user.uid).collection('projects').doc(idProject).set({
                  'briefmaterial': briefMaterial
                }, { merge: true })
              }, 200);
            })
        })
      }
      if(ProjectImage != []){
      
 
          var fileDoc = this.afs.ref('Users_hire/' + this.user.uid + idProject+ "/projects/"+ProjectImage[0].name).put(ProjectImage[0])
          fileDoc.then((url) => {
            url.ref.getDownloadURL()
              .then((url) => {
            
                setTimeout(() => {
                  this.db.collection('users_hire').doc(this.user.uid).collection('projects').doc(idProject).update({
                    "ProjectImage": url
                  })
                }, 200);


              })
          })
        
      }
    })
      .catch((error) => {
        alert(error.message)
      })

  }
 
}
