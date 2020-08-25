import { Component, OnInit, Input, OnChanges, HostListener } from '@angular/core';
import { Router, ActivatedRoute, Event, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore } from "angularfire2/firestore";
import { getAllRouteGuards } from '@angular/router/src/utils/preactivation';
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
  user: any
  UserName = "";
  message: string;
  editMessage: string;
  uid: any = ''


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

    if (this.estado == 'pro') {
      this.afstore.collection("users_hire").snapshotChanges().subscribe((i) => {
        i.forEach((j) => {
          var data: any = j.payload.doc.data()
          if (data.project) {
            j.payload.doc.ref.collection("projects").onSnapshot((k) => {
              k.docChanges().forEach((l) => {
                var user = l.doc.data().applyUsers
                if (user.includes(this.uid)) {
                  if (l.type == 'modified') {
                    if (!user.includes(this.uid)) {
                      //Usuario ha sido eliminado de un proyecto
                    }
                  }
                }
              })
            })
          }
        })
      })
      this.afstore.collection("Chat").snapshotChanges().subscribe((a)=>{
        a.forEach((b)=>{
          if(b.payload.doc.id.includes(this.uid)){
            var info: any = b.payload.doc.data()
            if(info[info.length - 1].offer){
              //Usuario a recibido una oferta
            }
            if(info[info.length - 1].id != this.uid){
              //Usuario a recibido un nuevo mensaje
            }
          }
        })
      })
    }
  }
  logout() {
    this.af.auth.signOut();
    location.href = "/"


  }
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
