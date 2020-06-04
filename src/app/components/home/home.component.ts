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
      'img': '../../../assets/imagenes/Home/Step1.png', 'paso': 'Sign up to Onhive', 'text': 'Sign up as a Pro or as a Hirer. '
    },
    {
      'img': '../../../assets/imagenes/Home/Step2.png',  'paso': 'Set up your profile', 'text': 'Complete your profile with your personal information.'
    },
    {
      'img': '../../../assets/imagenes/Home/Step3.png',  'paso': 'Apply or post', 'text': 'Apply or post a project based on the skills you have or the skills you are looking for.'
    },
    {
      'img': '../../../assets/imagenes/Home/Step1.png',  'paso': 'Start working', 'text': 'Message a Pro or a Hirer to agree on payments and hourly wage.'
    }];

  hire() {
    this.router.navigateByUrl("/Hire");
  }
  pro() {
    this.router.navigateByUrl("/Pro");
  }
  prev() {
    this.carousel.prev();
  }
  next() {
    this.carousel.next();
  }

  ngOnInit() {

  }

  // array paso 4 slider home 
  /*
  slides = [
    { img: "0", imagensuperior: "../../../assets/imagenes/img1seccion4Home.png", subtitulo: "1Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet dui leo. Etiam nec sodales justo. Etiam tortor nibh, interdum at sapien a, pharetra venenatis dui. Nulla egestas interdum nibh sit amet luctus.", name: "Name - Name." },
    { img: "1", imagensuperior: "../../../assets/imagenes/img2seccion4Home.png", subtitulo: "2Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet dui leo. Etiam nec sodales justo. Etiam tortor nibh, interdum at sapien a, pharetra venenatis dui. Nulla egestas interdum nibh sit amet luctus.", name: "Name - Name." },
    { img: "2", imagensuperior: "../../../assets/imagenes/img3seccion4Home.png", subtitulo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet dui leo. Etiam nec sodales justo. Etiam tortor nibh, interdum at sapien a, pharetra venenatis dui. Nulla egestas interdum nibh sit amet luctus.", name: "Name - Name." },
    { img: "3", imagensuperior: "../../../assets/imagenes/img1seccion4Home.png", subtitulo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet dui leo. Etiam nec sodales justo. Etiam tortor nibh, interdum at sapien a, pharetra venenatis dui. Nulla egestas interdum nibh sit amet luctus.", name: "Name - Name." }
  ];


  slideConfig = {
    "slidesToShow": 3,
    "slidesToScroll": 3,
    responsive: [

      {
        breakpoint: 900,
        settings: {
          variableWidth: false,
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 800,
        settings: {
          variableWidth: false,
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 680,
        settings: {
          variableWidth: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false
        }
      }
    ],
    "dots": true, "infinite": true, "autoplay": true, "autoplaySpeed": 15000, "prevArrow": "<div class='slick-prevew '></div>",
    "nextArrow": "<div class='slick-nextsig '></div>",
  };

*/


}