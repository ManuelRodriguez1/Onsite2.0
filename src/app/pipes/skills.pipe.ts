import { Pipe, PipeTransform } from '@angular/core';
import { ProuserService } from '../services/prouser.service';

@Pipe({
  name: 'skills'
})
export class SkillsPipe implements PipeTransform {

  constructor(private userP: ProuserService) { }

  transform(value: any, args?: any[]): any {
    var projects: any[] = []
    for(let i of value){
      args.map((m)=>{
        if(i.skills.join(' ').trim().includes(m)){
          if(!projects.includes(i)){
            projects.push(i)
          }
        }
      })
    }
    if(args.length == 0){
      this.userP.filterPag.emit(value)
      return value;
    }else{
      this.userP.filterPag.emit(projects)
      return projects
    }
  }

}
