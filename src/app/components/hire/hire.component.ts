import { MapsAPILoader } from "@agm/core";
import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HireService } from 'src/app/services/hire.service';
import { AngularFirestore } from "angularfire2/firestore";
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
  filePicture: any[] = []
  Email;
  alerta=false;
  Entercityorzipcode;
  PhoneNumber;
  imgprev: any = ''
  zipcodeSelectActive: boolean = false
  formData: FormGroup;
  submitted = false;
  correctEmail: any = new RegExp(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,9}$/)
  correctEmailTrue=false;
  zipcodeSelect: string = 'Searching...'
  constructor(
    private serviceHire: HireService,
    private db: AngularFirestore,
    private formBuilder: FormBuilder,
    private map: MapsAPILoader
  ) { }


  onKey(event) {

    if(event.target.value.length>0){
      this.correctEmailTrue=true;
    }

 
  }

  ngOnInit() {

    //zipcode automatico registro
    this.map.load().then(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(p => {
          var latlong = new google.maps.LatLng(p.coords.latitude, p.coords.longitude)
          let geocoder = new google.maps.Geocoder()
          geocoder.geocode({ "location": latlong }, (r, s) => {
            if (s == google.maps.GeocoderStatus.OK) {
              r[0].address_components.map((m) => {
                if (m.types.join('').includes('postal_code')) {
                  this.zipcodeSelect = m.long_name
                }
              })
            }
          })
        })
      }
    })


    this.formData = this.formBuilder.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      PhoneNumber: ['', Validators.required],
      Password: ['', [Validators.required, Validators.minLength(6)]],
      zipcode: ['', [Validators.required, Validators.minLength(5),Validators.maxLength(5)]]
    });

    this.serviceHire.error.subscribe((respError) => {
      this.error = respError;
      this.page=0;

    })
  }

  get f() { return this.formData.controls; }

  next() {
   
    this.submitted = true;
    if(this.formData.valid){
      this.page=1;
    }
    //this.select = this.page
  }
  back() {
    this.page=0;
 
  }
  preview(e:any){
    let reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    this.filePicture.push(e.target.files[0])
    reader.onload = () => {
      this.imgprev = reader.result
    }
    
  }
  

  onSubmit(f) {
   
    console.log(this.formData);
    console.log(f.value.zipcode.length);
   if (this.formData.invalid  || $("#Password").val() == "" ) {
      console.log("Invalid")
      this.alerta=true;
   
    } 
    
    if (this.formData.valid) {
  
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
            this.page=0;
          })
          if (!this.verifyEmail) {
         

            this.serviceHire.registerHire(f,this.filePicture);

            console.log(this.error);


          }
        })
      }
    }
  }
  
  }