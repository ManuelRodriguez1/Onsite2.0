import { Component, OnInit, ViewChild,Input } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router  } from '@angular/router';
import { AuthGuard} from '../../services/auth.service'

declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NgbCarouselConfig]  // add NgbCarouselConfig to the component providers
})
export class HomeComponent implements OnInit {

  constructor(config: NgbCarouselConfig, private router: Router,public menuPrincipal:AuthGuard) {




  }
  //array de imagenes home hero slider
  @ViewChild('carousel') carousel: any;

  //array paso 3 home 
  Steps = [
    {
      'codigo':'1','img': '../../../assets/imagenes/Home/Step1.png', 'paso': 'Sign up to Onhive', 'text': 'Sign up as a Pro or as a Hirer. '
    },
    {
      'codigo':'2', 'img': '../../../assets/imagenes/Home/Step2.png',  'paso': 'Set up your profile', 'text': 'Complete your profile with your personal information.'
    },
    {
      'codigo':'3', 'img': '../../../assets/imagenes/Home/Step3.png',  'paso': 'Apply or post', 'text': 'Apply or post a project based on the skills you have or the skills you are looking for.'
    },
    {
      'codigo':'4', 'img': '../../../assets/imagenes/Home/Step4.png',  'paso': 'Start working', 'text': 'Message a Pro or a Hirer to agree on payments and hourly wage.'
    }];

  hire() {

    this.router.navigate(['/Hire']);
    
  }
  pro() {
    this.router.navigate(['/Pro']);
  }
  prev() {
    this.carousel.prev();
  }
  next() {
    this.carousel.next();
  }

  ngOnInit() {
    $(window).scroll(function(){
    var windowHeight = $(window).scrollTop();
    var contenido1 = $("#Howitworks").offset().top;
    var contenido2 = $("#Aboutus").offset().top;
    if (windowHeight >= contenido2) {
      $(".Aboutus").addClass("menuSelect")
      $(".Howitworks").removeClass("menuSelect")
    } else {
      $(".Aboutus").removeClass("menuSelect")
    }

    if (windowHeight >= contenido1) {
      $(".Aboutus").removeClass("menuSelect")
      $(".Howitworks").addClass("menuSelect")
    } else {
      $(".Howitworks").removeClass("menuSelect")
    }
  });
  }



}