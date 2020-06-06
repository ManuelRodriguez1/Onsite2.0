import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HireService } from 'src/app/services/hire.service';
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
  PhoneNumber;
  // private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  formData: FormGroup;
  submitted = false;

  constructor(
    private serviceHire: HireService,
    private db: AngularFirestore,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.formData = this.formBuilder.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      PhoneNumber: ['', Validators.required],
      Zipcode: ['', Validators.required],
      Password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.serviceHire.error.subscribe((respError) => {
      this.error = respError;

    })
  }
  /*
    next() {
      this.page++;
      this.select = this.page;
    }
    back() {
      this.page--;
      this.select = this.page;
    }
  */
  get f() { return this.formData.controls; }

  onSubmit(f) {
    this.submitted = true;
    if (this.formData.invalid) {
      console.log("Invalid")
    } if (this.formData.valid) {
      console.log("ok")
      console.log(this.formData.value)
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

          console.log(this.error);


        }
      })
    }
  }

}