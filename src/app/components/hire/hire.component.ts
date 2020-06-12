import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HireService } from 'src/app/services/hire.service';
import { AngularFirestore } from "angularfire2/firestore";
import zipcode from '../../../assets/files/zipcode.json';
import * as $ from 'jquery';
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
  alerta=false;
  Entercityorzipcode;
  PhoneNumber;
  zipCodeCity: any = zipcode
  zipcodeSelect: string = ''
  zipcodeSelectActive: boolean = false
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
      Password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.serviceHire.error.subscribe((respError) => {
      this.error = respError;

    })
  }

  get f() { return this.formData.controls; }

  onSubmit(f) {
    this.submitted = true;
    console.log(this.formData);
    if (this.formData.invalid  || $("#zipcode").val() == "" || $("#Password").val() == "") {
      console.log("Invalid")
      this.alerta=true;
    } if (this.formData.valid) {
      console.log("ok")
      console.log(this.formData.value)
      var temp = false


      if (this.submitted) {
        this.db.collection('users_hire').get().subscribe((u) => {
          u.forEach((e) => {
            if (f.value.Email === e.data().email) {
              temp = true
            }
            this.verifyEmail = temp
          })
          if (!this.verifyEmail) {
            f.value.Zipcode=$("#zipcode").val();

            this.serviceHire.registerHire(f);

            console.log(this.error);


          }
        })
      }
    }
  }
    selecZip(e: string) {
      this.zipcodeSelect = e
      this.zipcodeSelectActive = true
    }
  }