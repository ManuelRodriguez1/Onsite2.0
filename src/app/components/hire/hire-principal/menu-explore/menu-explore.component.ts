import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import {FormControl, Validators} from '@angular/forms';
import firebase = require('firebase');

@Component({
  selector: 'app-menu-explore',
  templateUrl: './menu-explore.component.html',
  styleUrls: ['./menu-explore.component.css']
})

export class MenuExploreComponent implements OnInit {
  idhhh = '';
  profile: any = ''
  LeaveForm = 0
  ctrl = new FormControl(null, Validators.required)
  user = firebase.auth().currentUser

  constructor(
    private route: ActivatedRoute,
    private af: AngularFirestore,
    ) { }

  ngOnInit() {
    this.idhhh = this.route.snapshot.paramMap.get('id');
    console.log(this.route.snapshot.paramMap.get('id'))
    this.af.collection("users_pro").doc(this.route.snapshot.paramMap.get('id')).snapshotChanges().subscribe((d) => {
      this.profile = d.payload.data()
      console.log(this.profile)
    })
    console.log(this.user.uid)
  }
  leave(){
    this.LeaveForm = 1
  }
  cancelRate(){
    this.LeaveForm = 0
  }
}