import { Pipe, PipeTransform } from '@angular/core';
import { ProuserService } from '../services/prouser.service';

@Pipe({
  name: 'distance'
})
export class DistancePipe implements PipeTransform {

  constructor(private userP: ProuserService) { }

  transform(value: any, args?: any): any {
    var projects: any[] = []
    for(let i of value){
      var temp: number = i.distance/160934.708788644 
      if(temp < args){
        projects.push(i)
      }
    }
    if(args > 30){
      console.log(args);
      this.userP.filterPag.emit(value)
      return value;
    }else{
      this.userP.filterPag.emit(projects)
      return projects
    }
  }

}
