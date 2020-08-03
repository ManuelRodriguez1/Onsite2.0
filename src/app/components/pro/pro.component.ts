import { MapsAPILoader } from "@agm/core";
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProService } from 'src/app/services/pro.service';
// import zipcode from '../../../assets/files/zipcode.json';
declare var $: any

@Component({
  selector: 'app-pro',
  templateUrl: './pro.component.html',
  styleUrls: ['./pro.component.css']
})
export class ProComponent implements OnInit {

  cust = 0;
  select = 0;
  up = true;
  up2 = false;
  page = 0;
  selectskills: any[] = [];
  //selectskills2 = null;
  title = ['Enter your information:', 'Select skills'];
  text = ['About You', 'Your Skills', 'Your Tools'];
  skills = ['Concrete', 'Decorator', 'Drywall', 'Electrical', 'Excavation', 'Flooring', 'General Labor', 'Insulation', 'Interior Finishing Carpentry', 'Iron Worker', 'Landscaper', 'Mason', 'Plastering', 'Plumbing', 'Roofer', 'Waterproof Installation'];
  skills2: any = []
  customers = ['Add a file'];
  uploadDocu: number = 0
  customers2: any[] = [];
  notSame: boolean = false
  file: any[] = []
  checkbox: boolean = false
  verifyEmail: boolean = false
  emailText: string[] = []
  error: string = ''
  correctEmail: any = new RegExp(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,9}$/)
  // zipCodeCity: any = zipcode
  zipcodeSelect: string = 'Searching...'
  // zipcodeSelectActive: boolean = false
  temp: any = true
  progress: number = 0
  progressBar: boolean = false
  tools: any[] = []

  constructor(private servicePro: ProService, private map: MapsAPILoader) { }

  ngOnInit() {

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

    this.servicePro.error.subscribe((res) => {
      this.error = res
      if (this.error != '') {
        this.page = 0
        this.select = 0
        this.verifyEmail = true
      }
    })
  }

  next() {
    this.page++
    this.select = this.page
  }
  back() {
    this.page--;
    this.select = this.page;
  }
  selectskill(e) {
    // this.up = !this.up;

    var i = this.selectskills.indexOf(e);
    var checkbox = $("input[title='input" + e + "']");
    checkbox.prop("checked", !checkbox.prop("checked"));

    if ($(checkbox).is(':checked')) {
      $("#divSkill"+e).addClass("containerSkillNewSelect");
      var i = this.selectskills.indexOf(e);
      if (i == -1) {
        this.selectskills.push(e);
      }
    } else {
      $("#divSkill"+e).removeClass("containerSkillNewSelect");
      var i = this.selectskills.indexOf(e)
      i !== -1 && this.selectskills.splice(i, 1)
    }

  }
  toolsAdd(e: any, tool: string){
    var temp: any = ''
    if(e.code == 'Enter' || e.code == 'Comma'){
      temp = e.code == 'Comma' ? tool.substr(0, tool.length - 1) : tool
      this.tools.push(temp)
      $('#toolsIn').val('')
    }
  }
  close(e) {
    var i = this.selectskills.indexOf(e)
    i !== -1 && this.selectskills.splice(i, 1)
  }
  closeTool(e){
    var i = this.tools.indexOf(e)
    i !== -1 && this.tools.splice(i, 1)
  }
  addcustomer() {
    this.customers.push('Add a file');
    this.cust = this.cust + 1;
  }
  test(f: NgForm) {
    this.servicePro.registerPro(f, this.file, this.customers2, this.selectskills, this.tools)
  }
  uploadDoc(e) {   
    var i = this.cust
    this.file.push(e.target.files[0])
    this.customers[i] = e.target.files[0].name
    this.progressBar = true
    for (let i = 0; i <= 100; i++) {
      setTimeout(() => {
        this.progress++
      }, 100);
    }
    setTimeout(() => {
      this.progressBar = false
      this.progress = 0
    }, 1000)
  }
  check() {
    this.checkbox = !this.checkbox
  }
  
  deleteCert(e: any) {
    var i = this.customers.indexOf(e);
    if (i !== -1) {
      this.customers.splice(i, 1)
      this.file.splice(i, 1)
      this.cust = this.cust - 1
    }
    if (this.customers.length == 0) {
      this.customers = ['Add a file']
      this.cust = 0
    }
  }
}
