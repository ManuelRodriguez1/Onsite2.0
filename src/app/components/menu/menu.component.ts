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
  
  }

  flechaUsuario() {

    if (this.popad == false) {
      this.popad = true;
    } else if (this.popad == true) {
      this.popad = false;
    }
  }

  paginaMensajeMenu(user, url) {

    if (url == "/Home" || url == "/Pro" || url == "/Hire") {

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
      console.log(user.uid)
      var data = this.afstore.collection("users_hire").doc(user.uid).snapshotChanges()
      data.subscribe((d) => {
        this.profile = d.payload.data()
        console.log(this.profile);
        if (this.profile) {
          if (this.profile.photoUrl != "") { this.imageP = this.profile.photoUrl }
          if (this.profile.name != "") { this.UserName = this.profile.name }
        }
      })
    } else if (this.estado == "pro") {

      this.userMenu = "Pro";
      var data = this.afstore.collection("users_pro").doc(user.uid).snapshotChanges()
      data.subscribe((d) => {
        this.profile = d.payload.data()
        console.log(this.profile);
        if (this.profile) {
          if (this.profile.photoUrl != "") { this.imageP = this.profile.photoUrl }
          if (this.profile.name != "") { this.UserName = this.profile.name }
        }
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
