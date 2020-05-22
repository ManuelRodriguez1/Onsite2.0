import { Component, OnInit, NgModule } from "@angular/core";
import { NgForm } from '@angular/forms';
import { HireService }  from 'src/app/services/hire.service';
import { AngularFirestore } from "angularfire2/firestore";

@Component({
  selector: "app-hire",
  templateUrl: "./hire.component.html",
  styleUrls: ["./hire.component.css"],
})
export class HireComponent implements OnInit {
  error;
  select = 0;
  page = 0;
  title = ['Enter your information:', 'Select skills'];
  text = ['About You', 'Your Skills'];
  verifyEmail: boolean = false

  constructor(
    private serviceHire: HireService,
    private db: AngularFirestore
  ) {}
  ngOnInit() {}

  next() {
    this.page++;
    this.select = this.page;
  }
  back() {
    this.page--;
    this.select = this.page;
  }

  onSubmit(f: NgForm) {
    var temp = false
    this.db.collection('users_hire').get().subscribe((u) => {
      u.forEach((e) => {
        if (f.value.Email === e.data().email) {
          temp = true
        }
        this.verifyEmail = temp
      })
      if (!this.verifyEmail) {
        this.serviceHire.registerHire(f);
      }
    })
  }
}