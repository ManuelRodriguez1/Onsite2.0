import { Component, OnInit, Input, OnChanges, HostListener } from '@angular/core';
import { Router, ActivatedRoute, Event, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore } from "angularfire2/firestore";
// import { getAllRouteGuards } from '@angular/router/src/utils/preactivation';
import * as $ from 'jquery';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Input() nombreMenu: string = "belxy";


  error: any[];
  m = "";
  userMenu = "Home";
  Sesion = true;
  estado = "";
  imageP: any = ''
  profile: any = ''
  popad = false;
  notific = false;
  user: any
  UserName = "";
  message: string;
  editMessage: string;
  uid: any = ''
  notificacion = 1;
  Notifications: any[] = []
  removeProject: any[] = []
  notify: any = []
  folder: string = ''
  dateToday = new Date().getTime()




  constructor(public af: AngularFireAuth, private router: Router, private afstore: AngularFirestore, private route: ActivatedRoute) {


    this.af.authState.subscribe(auth => {
      if (auth) {
        this.Sesion = true;
      } else {
        this.Sesion = false;
      }
    });


    this.router.events.subscribe(path => {
      if (path instanceof NavigationEnd) {
        this.paginaMensajeMenu(firebase.auth().currentUser, path.url);
      }

    });

   
  }
  ngOnInit() {
    $(document).ready(function () {
      if (window.location.pathname == '/VerificationEmail') {
        $(".verifyUser").hide()
      }
    })
    $(window).scroll(function () {
      var windowHeight = $(window).scrollTop();

      if ($("#Aboutus").length == 1) {

        var contenido2 = $("#Aboutus").offset().top;
        if (windowHeight >= contenido2) {
          $(".Aboutus").addClass("menuSelect")
          $(".Howitworks").removeClass("menuSelect")
        } else {
          $(".Aboutus").removeClass("menuSelect")
        }

      }

      if ($("#Howitworks").length == 1) {
        var contenido1 = $("#Howitworks").offset().top;
        if (windowHeight >= contenido1) {
          $(".Aboutus").removeClass("menuSelect")
          $(".Howitworks").addClass("menuSelect")
        } else {
          $(".Howitworks").removeClass("menuSelect")
        }
      }


    });
    // if (localStorage.getItem('notificaciones') && localStorage.getItem('notificaciones') !== undefined) {
    //   this.notify = JSON.parse(localStorage.getItem('notificaciones'))
    // }

  }

  flechaUsuario() {

    if (this.popad == false) {
      this.popad = true;
    } else if (this.popad == true) {
      this.popad = false;
    }
  }

  paginaMensajeMenu(user, url) {


    if (url == "/Home" || url == "/Pro" || url == "/Hire" || url == "/") {

      this.userMenu = "Home";
      this.af.authState.subscribe(auth => {
        if (auth) {
          if (auth.displayName == "hire") {
            this.router.navigate(['/Hireprincipal']);
          } else if (auth.displayName == "pro") {
            this.router.navigate(['/ProfilePro']);
          }
        }
      });
    }


    if (user) {
      this.estado = user.displayName;
      this.user = user.emailVerified
      this.uid = user.uid
    }
    if (url == "/Hire" || this.estado == "hire") {
      this.m = "Hirer";
    } else if (url == "/Pro" || this.estado == "pro") {
      this.m = "Pro";
    } else if (url == "/Home") {
      this.m = "Home";
      this.userMenu = "Home";
    } else {
      this.m = "Home";
      this.userMenu = "Home";
    }
    if (this.estado == "hire") {
      this.userMenu = "Hirer";

      var data = this.afstore.collection("users_hire").doc(user.uid).snapshotChanges()
      data.subscribe((d) => {
        this.profile = d.payload.data()

        if (this.profile) {
          if (this.profile.photoUrl != "") { this.imageP = this.profile.photoUrl }
          if (this.profile.name != "") { this.UserName = this.profile.name }
        }
      })

      this.afstore.collection("users_hire").doc(user.uid).set({
        verifyUser: this.user,
      }, { merge: true }).then(() => {
      })

    } else if (this.estado == "pro") {

      this.userMenu = "Pro";
      var data = this.afstore.collection("users_pro").doc(user.uid).snapshotChanges()
      data.subscribe((d) => {
        this.profile = d.payload.data()

        if (this.profile) {
          if (this.profile.photoUrl != "") { this.imageP = this.profile.photoUrl }
          if (this.profile.name != "") { this.UserName = this.profile.name }
        }
      })
    }

    if(this.af.auth.currentUser.displayName == 'pro'){
      this.folder = 'users_pro'
    }else{
      this.folder = 'users_hire'
    }
    
    this.afstore.collection(this.folder).doc(this.af.auth.currentUser.uid).snapshotChanges()
    .subscribe((n)=>{
      var t: any = n.payload.data()
      if(t.notifications){
        this.notify = t.notifications
      }else{
        console.log('nothing'); 
      }
    })

    // if (this.estado == 'pro') {
    //   this.afstore.collection("users_hire").stateChanges().subscribe((i) => {
    //     i.forEach((j) => {
    //       var data: any = j.payload.doc.data()
    //       var img = ''
    //       if (data.project) {
    //         if (data.photoUrl && data.photoUrl != '') {
    //           img = data.photoUrl
    //         }
    //         j.payload.doc.ref.collection("projects").onSnapshot({ includeMetadataChanges: true }, (k) => {
    //           k.docChanges({ includeMetadataChanges: true }).forEach((l) => {
    //             var user: any[] = l.doc.data().applyUsers
    //             if (user) {
    //               if (user.includes(this.uid)) {
    //                 this.removeProject.push(l.doc.id)
    //               }
    //               if (l.type == 'modified') {
    //                 if (this.removeProject.includes(l.doc.id)) {
    //                   if (!user.includes(this.uid)) {
    //                     //Usuario ha sido eliminado de un proyecto
    //                     this.Notifications.push({ 'id': data.id + 'remove', 'name': data.name + ' ' + data.lastname, 'project': l.doc.data().projectname, 'img': img, 'type': 'remove' })
    //                     this.notificar(data.id + 'remove', data.name + ' ' + data.lastname, l.doc.data().projectname, img, 'remove')
    //                   }
    //                 }
    //               }
    //             }
    //           })
    //         })
    //       }
    //     })
    //   })
    //   this.afstore.collection("Chat").stateChanges().subscribe((a) => {
    //     a.forEach((b) => {
    //       if (b.payload.doc.id.includes(this.uid)) {
    //         var info: any = b.payload.doc.data()
    //         var id = b.payload.doc.id.split("|")
    //         var hirer = ''
    //         var project = ''
    //         var img = ''
    //         let o = {}
    //         this.afstore.collection("users_hire").doc(id[0]).get().map((m) => {
    //           hirer = m.data().name + m.data().lastname
    //           if (m.data().photoUrl && m.data().photoUrl != '') {
    //             img = m.data().photoUrl
    //           }
    //           if (info.chat[info.chat.length - 1].offer) {
    //             m.ref.collection("projects").doc(info.chat[info.chat.length - 1].projectId).get().then((t) => {
    //               project = t.data().projectname
    //             }).then(() => {
    //               //Usuario a recibido una oferta
    //               this.Notifications.push({ 'id': id[0] + 'offer', 'name': hirer, 'project': project, 'img': img, 'type': 'offer' })
    //               this.Notifications = this.Notifications.filter(f => o[f.id] ? false : o[f.id] = true)
    //               this.notificar(id[0] + 'offer', hirer, project, img, 'offer')
    //             })
    //           }
    //         }).toPromise().then(() => {
    //           if (info.chat[info.chat.length - 1].id != this.uid) {
    //             //Usuario a recibido un nuevo mensaje
    //             this.Notifications.push({ 'id': id[0] + 'chat', 'name': hirer, 'project': project, 'img': img, 'type': 'chat' })
    //             this.Notifications = this.Notifications.filter(f => o[f.id] ? false : o[f.id] = true)
    //             this.notificar(id[0] + 'offer', hirer, project, img, 'chat')
    //           }
    //         })
    //       }
    //     })
    //   })
    // }
  }
  logout() {
    this.af.auth.signOut();
    location.href = "/"
  }
  // notificar(id, name, project, img, type) {
  //   var temp: any = ''
  //   let o = {}
  //   if (this.notify.length > 0) {
  //     temp = JSON.parse(localStorage.getItem('notificaciones'))
  //     temp.push({ 'id': id, 'name': name, 'project': project, 'img': img, 'type': type })
  //     localStorage.setItem('notificaciones', JSON.stringify(temp))
  //     this.notify = JSON.parse(localStorage.getItem('notificaciones'))
  //     this.notify = this.notify.filter(f => o[f.id] ? false : o[f.id] = true)
  //   } else {
  //     localStorage.setItem('notificaciones', JSON.stringify(this.Notifications))
  //     this.notify = JSON.parse(localStorage.getItem('notificaciones'))
  //     this.notify = this.notify.filter(f => o[f.id] ? false : o[f.id] = true)
  //   }
  // }
  // closeNotify(e: any){
  //   var i = this.notify.indexOf(e)
  //    i !== -1 && this.notify.splice(i)

  // }
  navigateabout() {
    $('body,html').stop(true, true).animate({
      scrollTop: $("#Aboutus").offset().top
    }, 1000);
  }
  navigateHowitworks() {
    $('body,html').stop(true, true).animate({
      scrollTop: $("#Howitworks").offset().top
    }, 1000);
  }
}
