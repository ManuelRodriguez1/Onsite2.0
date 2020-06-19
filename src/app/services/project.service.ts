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
  newProject(f: NgForm, file: any[], briefMaterial: any[], selectskills: any[], peoples: any[],locationApp,latitude,longitude) {
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
      statusname: 'Pending',
      briefmaterial: briefMaterial
    }, { merge: true }).then(() => {
      this.db.collection('users_hire').doc(this.user.uid).set({
        "project": true
      }, { merge: true })
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
    })
      .catch((error) => {
        alert(error.message)
      })

  }
  /*
    getInfoPro(idPro: string) {
      return this.db.collection("users_pro").doc(idPro)
    }
  
    getInfoProjects(){
      return this.db.collection("users_hire").doc(this.user.uid).collection("projects")
    }
  
    getInfoProject(idProject){
      return this.db.collection("users_hire").doc(this.user.uid).collection("projects").doc(idProject)
    }
  
    updateUrlMaterial(name: string, url: string = '', idProject) {
      this.getInfoProject(idProject).update({
        "briefmaterial": [{ "name": name, "url": url }]
      })
    }
  
    updateSkill(skill: any, idProject){
      this.getInfoProject(idProject).update({
        "skills": skill
      })
    }
  
    updateProject(f: NgForm, briefMaterial: any[], selectskills: any[], selectpeople: any[], idProject) {
      return this.getInfoProject(idProject)
        .update({
          projectname: f.value.projectname,
          creationdate: this.currentDate,
          description: f.value.description,
          location: f.value.location,
          estimated: f.value.estimated,
          startdate: f.value.startdate,
          enddate: f.value.enddate,
          taketest: f.value.taketest,
          passtest: f.value.passtest,
          skills: selectskills,
          people: selectpeople,
          status: f.value.status,
          statusname: 'Active',
          briefmaterial: briefMaterial
        })
    }
  
    updateUrlMat(material: any, idProject){
      this.getInfoProject(idProject).update({
        "briefmaterial": material
      })
    }
  
    deleteMaterial(material: any, idProject){
      this.afs.ref('Users_hire/' + this.user.uid + idProject + "/" + material.name).delete()
    }
  
    updateMaterial(material: any, pos: any, materials: any, idProject){
      this.afs.ref('Users_hire/' + this.user.uid + idProject + "/" + material.target.files[0].name).put(material.target.files[0])
      .then((url) => {
        url.ref.getDownloadURL()
        .then((u) => {
          materials[pos] = { "name": material.target.files[0].name, "url": u }
        })
        .then(() => {
          this.updateUrlMat(materials,idProject)
        })
      })
    }
  
    deleteProject(idProject){
      this.getInfoProject(idProject).update({
        status: 4,
        statusname: 'Deleted'
      })
    }
  
    archivedProject(idProject){
      this.getInfoProject(idProject).update({
        status: 3,
        statusname: 'Archived'
      })
    }
  
    applyRating(idPro: string, userreviews: any[]){
      this.getInfoPro(idPro).update({
        reviews: userreviews
      })
    }*/
}
