import { Pipe, PipeTransform } from '@angular/core';
import { ProuserService } from '../services/prouser.service';

@Pipe({
  name: 'search'
})
export class LatestPipe implements PipeTransform {

  constructor(private userP: ProuserService) { }

  transform(value: any, args?: any): any {
    var projects: any[] = []
    for (let i of value) {
      // if (i.projectname.toLowerCase().includes(args.toLowerCase().trim()) || i.skills.sort().join(' ').toLowerCase().includes(args.toLowerCase().trim())) {       
      //   projects.push(i)
      // }
      if (i.projectname.toLowerCase().includes(args.toLowerCase().trim())) {       
        projects.push(i)
      }
    }
    if (args == '') {
      this.userP.filterPag.emit(value)
      return value
    } else {
      this.userP.filterPag.emit(projects)
      return projects
    }
  }
}
