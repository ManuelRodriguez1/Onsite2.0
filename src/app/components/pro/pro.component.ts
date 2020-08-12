import { MapsAPILoader } from "@agm/core";
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProService } from 'src/app/services/pro.service';
import { ICONS } from './icons';
import { DomSanitizer } from "@angular/platform-browser";
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
  text = ['About You', 'About You', 'Your Skills', 'Your Tools', '', 'Verification'];
  skills = ['Concrete', 'Decorator', 'Drywall', 'Electrical', 'Excavation', 'Flooring', 'General Labor', 'Insulation', 'Interior Finishing Carpentry', 'Iron Worker', 'Landscaper', 'Mason', 'Plastering', 'Plumbing', 'Roofer', 'Waterproof Installation'];
  skills2: any = []
  customers = [];
  uploadDocu: number = 0
  customers2: any[] = [];
  notSame: boolean = false
  file: any[] = []
  checkboxTerms: boolean = false
  verifyEmail: boolean = false
  emailText: string[] = []
  error: string = ''
  correctEmail: any = new RegExp(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,9}$/)
  photo: any = ''
  // zipCodeCity: any = zipcode
  zipcodeSelect: string = 'Searching...'
  // zipcodeSelectActive: boolean = false
  temp: any = true
  progress: number = 0
  progressBar: boolean = false
  tools: any[] = []
  //Icons to register
  icon1: any = ''
  icon2: any = ''
  imgprev: any = ''

  constructor(private servicePro: ProService, private map: MapsAPILoader, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.icon1 = this.sanitizer.bypassSecurityTrustHtml(ICONS[0].icon1)

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

  preview(e: any) {
    this.photo = e
    let reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onload = () => {
      this.imgprev = reader.result
    }
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
      var i = this.selectskills.indexOf(e);
    var checkbox = $("input[title='input" + e + "']");
    checkbox.prop("checked", !checkbox.prop("checked"));

    if ($(checkbox).is(':checked')) {
      $("#divSkill" + e).addClass("containerSkillNewSelect");
      var i = this.selectskills.indexOf(e);
      if (i == -1) {
        this.selectskills.push(e);
      }
    } else {
      $("#divSkill" + e).removeClass("containerSkillNewSelect");
      var i = this.selectskills.indexOf(e)
      i !== -1 && this.selectskills.splice(i, 1)
    }

  }
  toolsAdd(e: any, tool: string) {
    var temp: any = ''
    if (e.code == 'Enter' || e.code == 'Comma') {
      temp = e.code == 'Comma' ? tool.substr(0, tool.length - 1) : tool
      this.tools.push(temp)
      $('#toolsIn').val('')
    }
  }
  close(e) {
    var i = this.selectskills.indexOf(e)
    i !== -1 && this.selectskills.splice(i, 1)
  }
  closeTool(e) {
    var i = this.tools.indexOf(e)
    i !== -1 && this.tools.splice(i, 1)
  }
  test(f: NgForm) {
    this.servicePro.registerPro(f, this.file, this.customers2, this.selectskills, this.tools, this.photo)
    this.page = 5
    this.select = 5
  }
  uploadDoc(e: any, data: number) {  
    if(data == 2){
      this.file.push(e)
      this.customers.push({'name':e.name, 'size':e.size}) 
    } else{
      for(let i = 0; i < e.target.files.length; i++){
        this.file.push(e.target.files[i])
        this.customers.push({'name': e.target.files[i].name, 'size': e.target.files[i].size})
      }
    }
  }
  dropCert(e: any) {
    e.preventDefault()
    if (e.dataTransfer.items) {
      for (let i = 0; i < e.dataTransfer.items.length; i++) {
        if (e.dataTransfer.items[i].kind === 'file') {
          var file = e.dataTransfer.items[i].getAsFile()
          this.uploadDoc(file, 2)
        }
      }
    }
  }
  dragoverCert(e: any) {
    e.preventDefault()
    e.stopPropagation()
  }
  dragleaveCert(e: any) {
    e.preventDefault()
    e.stopPropagation()
  }
  deleteCert(e: any) {
    var i = this.customers.indexOf(e);
    if (i !== -1) {
      this.customers.splice(i, 1)
      this.file.splice(i, 1)
    }
  }
  resend(){
    this.servicePro.firebase.auth().currentUser.sendEmailVerification()
  }
}
