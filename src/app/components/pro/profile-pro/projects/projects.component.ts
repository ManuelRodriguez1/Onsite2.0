import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  lat: number = 51.678418;
  lng: number = 7.809007;

  constructor(private service: ServiceService) { }

  ngOnInit() {
   
  }
  saludo(e){
    this.service.guardarData(e)
  }
}
