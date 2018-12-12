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

}
