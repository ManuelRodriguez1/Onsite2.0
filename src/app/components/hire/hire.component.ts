import { Component, OnInit, NgModule } from "@angular/core";
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
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
  FirstName;
  LastName;
  Email;
  Entercityorzipcode;
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  formData: FormGroup;

  createFormGroup(){
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.minLength(5),Validators.pattern(this.emailPattern)]),
      name: new FormControl('', [Validators.required, Validators.minLength(5),]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(5),]),
      phone: new FormControl('', [Validators.required, Validators.minLength(5),])
    })
  }


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