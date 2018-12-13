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

  images = ['./assets/imagenes/Fondobanner.png', './assets/imagenes/Fondobanner.png',
    './assets/imagenes/Fondobanner.png', './assets/imagenes/Fondobanner.png'];
    @ViewChild('carousel') carousel: any;
    Steps = [
      {
        'paso':'1', 'text':'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent acmy challenge to you is how do we make this more appealing and 2020 design-wise but i prefer this approach - lets play with colors'
      },
      {
        'paso':'2', 'text':'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent acmy challenge to you is how do we make this more appealing and 2020 design-wise but i prefer this approach - lets play with colors'
      },
      {
        'paso':'3', 'text':'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent acmy challenge to you is how do we make this more appealing and 2020 design-wise but i prefer this approach - lets play with colors'
      },
      {
        'paso':'4', 'text':'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent acmy challenge to you is how do we make this more appealing and 2020 design-wise but i prefer this approach - lets play with colors'
      }];
  constructor(config: NgbCarouselConfig,private router: Router) {


    // customize default values of carousels used by this component tree
    config.interval = 8000;
    config.wrap=true;
    config.showNavigationArrows = false;

  }
hire(){
  //  this.router.navigateByUrl('/Hire');
  location.href ="/Hire";

}

pro(){
    //  this.router.navigateByUrl('/Pro');
      location.href ="/Pro";
}
  prev() {
    this.carousel.prev();
  }
  next() {
    this.carousel.next();
  }
  ngOnInit() {
    $(document).ready(function(){


  });


  }
  slides = [
    {img: "0",imagensuperior: "../../../assets/imagenes/img1seccion4Home.png",subtitulo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet dui leo. Etiam nec sodales justo. Etiam tortor nibh, interdum at sapien a, pharetra venenatis dui. Nulla egestas interdum nibh sit amet luctus.",name:"Name - Name."},
    {img: "1",imagensuperior: "../../../assets/imagenes/img2seccion4Home.png",subtitulo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet dui leo. Etiam nec sodales justo. Etiam tortor nibh, interdum at sapien a, pharetra venenatis dui. Nulla egestas interdum nibh sit amet luctus.",name:"Name - Name."},
    {img: "2",imagensuperior: "../../../assets/imagenes/img3seccion4Home.png",subtitulo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet dui leo. Etiam nec sodales justo. Etiam tortor nibh, interdum at sapien a, pharetra venenatis dui. Nulla egestas interdum nibh sit amet luctus.",name:"Name - Name."},
    {img: "3",imagensuperior: "../../../assets/imagenes/img1seccion4Home.png",subtitulo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet dui leo. Etiam nec sodales justo. Etiam tortor nibh, interdum at sapien a, pharetra venenatis dui. Nulla egestas interdum nibh sit amet luctus.",name:"Name - Name."}
  ];
  slideConfig = {"slidesToShow": 3, "slidesToScroll": 3,"dots": true,"infinite": true,"autoplay": true,"autoplaySpeed": 1500,"prevArrow":"<div class='slick-prevew '></div>",
  "nextArrow":"<div class='slick-nextsig '></div>",};


  slickInit(e) {
    console.log('slick initialized');
  }

  breakpoint(e) {
  }

  afterChange(e) {

  }

  beforeChange(e) {
  }



  slideConfigseccion2= {"slidesToShow": 1, "slidesToScroll": 1,"dots": true,"infinite": true,"autoplay": true,"autoplaySpeed": 1500000,"prevArrow":"<div class='slick-prevew '></div>",
"nextArrow":"<div  class='slick-nextsig '></div>","fade": true};
slidesseccion2 = [
  {img: "0",imagenderecha: "../../../assets/imagenes/seccion2img1.png",titulo: "Lorem ipsum dolor sit amet",subtitulo:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet dui leo. Etiam nec sodales justo. Etiam tortor nibh, interdum at sapien a, pharetra venenatis dui. Nulla egestas interdum nibh sit amet luctus. Etiam suscipit mauris quis turpis vehicula tincidunt. Mauris vitae sapien eu nulla pharetra vehicula. Nam porta enim id vestibulum consequat. "},
  {img: "1",imagenderecha: "../../../assets/imagenes/seccion2img1.png",titulo: "Lorem ipsum dolor sit amet",subtitulo:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet dui leo. Etiam nec sodales justo. Etiam tortor nibh, interdum at sapien a, pharetra venenatis dui. Nulla egestas interdum nibh sit amet luctus. Etiam suscipit mauris quis turpis vehicula tincidunt. Mauris vitae sapien eu nulla pharetra vehicula. Nam porta enim id vestibulum consequat. "},
  {img: "2",imagenderecha: "../../../assets/imagenes/seccion2img1.png",titulo: "Lorem ipsum dolor sit amet",subtitulo:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet dui leo. Etiam nec sodales justo. Etiam tortor nibh, interdum at sapien a, pharetra venenatis dui. Nulla egestas interdum nibh sit amet luctus. Etiam suscipit mauris quis turpis vehicula tincidunt. Mauris vitae sapien eu nulla pharetra vehicula. Nam porta enim id vestibulum consequat. "},
  {img: "3",imagenderecha: "../../../assets/imagenes/seccion2img1.png",titulo: "Lorem ipsum dolor sit amet",subtitulo:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet dui leo. Etiam nec sodales justo. Etiam tortor nibh, interdum at sapien a, pharetra venenatis dui. Nulla egestas interdum nibh sit amet luctus. Etiam suscipit mauris quis turpis vehicula tincidunt. Mauris vitae sapien eu nulla pharetra vehicula. Nam porta enim id vestibulum consequat. "}
];
}



// ,"dotsClass": 'slide-dots'
