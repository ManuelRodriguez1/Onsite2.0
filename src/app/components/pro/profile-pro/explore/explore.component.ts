import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProuserService } from 'src/app/services/prouser.service';
import * as firebase from "firebase/app";
import { Router } from "@angular/router";
import { Subscription } from 'rxjs';
declare var $: any

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit, OnDestroy {

  select: number = 0
  modal: number = 0
  projects: any[] = []
  projects2: any[] = []
  loading: boolean
  users: any[] = []
  users2: any[] = []
  emailV: boolean = false
  //Informacion proyecto
  infoProject: any[] = []
  lat: number = 51.678418
  long: number = 7.809007
  buttonApply: boolean = true
  //Filtro
  searchProject: string = ''
  changeFilter: boolean
  //Paginación
  pages: number[] = []
  start: number = 1
  end: number = 5
  cantResul: number = 5

  suscription0: Subscription
  suscription: Subscription
  suscription2: Subscription
  suscription3: Subscription
  suscription4: Subscription

  constructor(private prouser: ProuserService, public router: Router) {
    this.loading = true
    firebase.firestore().enablePersistence()
  }

  ngOnInit() {
    this.emailV = this.prouser.user.emailVerified
    this.suscription0 = this.prouser.getInfoHire().snapshotChanges()
      .subscribe((d) => {
        var tempProjects: any[] = []
        this.projects = []
        this.projects2 = []
        var cont: number = 0;
        d.forEach((j) => {
          var profile: any = j.payload.doc.data()
          if (profile.project) {
            j.payload.doc.ref.collection("projects")
              .onSnapshot((d) => {
                d.docChanges().map((k) => {
                  if (k.doc.data().status == 1) {
                    if (k.type === 'modified') {
                      // this.projects.map((m) => {
                      //   if (m[0].creationdate === k.doc.data().creationdate) {
                      //     m = [k.doc.data(), {
                      //       "idProject": k.doc.id,
                      //       "idUser": profile.id,
                      //       "photo": profile.photoUrl,
                      //       "name": profile.name + ' ' + profile.lastname
                      //     }]
                      //   }
                      // })
                    } else {
                      tempProjects.push(k.doc.data())
                      tempProjects[cont].idProject = k.doc.id
                      tempProjects[cont].idUser = profile.id
                      tempProjects[cont].photo = profile.photoUrl
                      tempProjects[cont].name = profile.name + ' ' + profile.lastname
                      cont++
                      this.prouser.pagination.emit(tempProjects)
                      this.prouser.filterPag.emit(tempProjects)
                    }
                  }
                })
              })
          }
        })

      })

    this.suscription = this.prouser.pagination.subscribe((res) => {
      setTimeout(() => {
        this.projects = res
        this.loading = false
        this.changeFilter = true
      }, 500);
    })

    this.suscription2 = this.prouser.filterPag.subscribe((res) => {
      this.projects2 = res
      setTimeout(() => {
        this.pagination()
        this.start = 1
        this.end = this.cantResul
      }, 1000)
    })


    this.suscription3 = this.prouser.users.subscribe((res) => {
      switch (res) {
        case 1:
          this.users.push(this.prouser.user.uid)
          this.users2.push(this.prouser.user.uid)
          this.prouser.users.emit(2)
          break;
        case 2:
          var infoPro: any = this.infoProject
          this.prouser.applyProject(infoPro.idUser, infoPro.idProject, this.users, this.users2)
          break;
      }
    })
    this.suscription4 = this.prouser.similar.subscribe(res => {
      if (this.users.includes(res)) {
        this.buttonApply = false
      }
    })

    $(window).scroll(function(){
      if($(window).scrollTop() >= ($(".contenedorfooter").offset().top - $(".contenedorfooter").height() - 110)){
        $(".textv").css({'position':'absolute', 'top': 'auto', 'margin-top': '-16%'})
      } else{
        $(".textv").css({'position':'', 'top': '', 'margin-top': ''})
      }
    })

    console.log(this.projects);
    console.log(this.projects.length);
    
  }
  sendInfo(e) {
    this.infoProject = e
    console.log(this.infoProject);
    this.select = 1
    var infoPro: any = this.infoProject
    this.prouser.getProject(infoPro.idUser, infoPro.idProject).get()
      .subscribe((d) => {
        var info: any = d.data()
        if (info.applyUsers) {
          this.users = info.applyUsers
          this.prouser.similar.emit(this.prouser.user.uid)
        }
        if (info.applyUsers2) {
          this.users2 = info.applyUsers2
        }
      })
    this.prouser.getProjectSameHire(infoPro.idUser).get()
    .subscribe((d)=>{
      d.forEach((p)=>{
        var info = p.data()
        if(info.applyUsers){
          if(info.applyUsers.includes(this.prouser.user.uid)){
            this.buttonApply = false
          }
        }
      })
    })
  }
  apply() {
    this.modal = 1
    this.buttonApply = false
    this.prouser.users.emit(1)
  }
  hideModal() {
    this.modal = 2
    this.select = 0
  }
  backExplore() {
    location.reload()
  }
  profile1(){
 
    location.href="/ProfilePro";
  }
  pagination() {
    this.pages = []
    var page: number
    page = Math.ceil(this.projects2.length / this.cantResul)
    for (let i = 1; i <= page; i++) {
      this.pages.push(i)
    }
  }
  changePag(e: number) {
    this.start = ((e * this.cantResul) - this.cantResul) == 0 ? 1 : (e * this.cantResul) - this.cantResul
    this.end = e * this.cantResul
  }
  nextPage() {
    if (this.end < this.projects2.length) {
      this.start += this.cantResul
      this.end += this.cantResul
    }
  }
  prevPage() {
    if (this.start > 1) {
      this.start -= this.cantResul
      this.end -= this.cantResul
    }
  }
  firstPage() {
    this.start = 1
    this.end = this.cantResul
  }
  lastPage() {
    var i = this.pages[this.pages.length - 1]
    this.changePag(i)
  }

  filterChange() {
    this.changeFilter = !this.changeFilter
  }

  ngOnDestroy() {
    this.suscription0.unsubscribe()
    this.suscription.unsubscribe()
    this.suscription2.unsubscribe()
    this.suscription3.unsubscribe()
    this.suscription4.unsubscribe()
  }

}