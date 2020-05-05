import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

import { Project } from '../Model/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  projectsCollection;
  projects: Observable<Project[]>;
  projectDoc;

  constructor(public db: AngularFirestore) {
    this.projects = this.db.collection('projects_hire').valueChanges();
  }

  getProjects(){
    return this.projects;
  }

}
