import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NgbCarouselConfig]  // add NgbCarouselConfig to the component providers
})
export class HomeComponent implements OnInit {

  constructor(config: NgbCarouselConfig, private router: Router) {


    // customize default values of carousels used by this component tree
    config.interval = 8000;
    config.wrap = true;
    config.showNavigationArrows = false;

  }
  //array de imagenes home hero slider
  images = ['./assets/imagenes/Fondobanner.png', './assets/imagenes/Fondobanner.png'];
  @ViewChild('carousel') carousel: any;

  //array paso 3 home 
  Steps = [
    {
      'paso': '1', 'text': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent acfefefefefefef Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent acfefefefefefef.'
    },
    {
      'paso': '2', 'text': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent acfefefefefefef Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent acfefefefefefef.'
    },
    {
      'paso': '3', 'text': '3Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent acfefefefefefef Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent acfefefefefefef.'
    },
    {
      'paso': '4', 'text': '4Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent acfefefefefefef Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent acfefefefefefef.'
    }];

  hire() {
    this.router.navigateByUrl('/Hire');
    // location.href ="/Hire";

  }

  pro() {
    this.router.navigateByUrl('/Pro');
    // location.href ="/Pro";
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




}