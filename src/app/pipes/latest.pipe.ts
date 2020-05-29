import { Pipe, PipeTransform } from '@angular/core';
import { ProuserService } from '../services/prouser.service';

@Pipe({
  name: 'search'
})
export class LatestPipe implements PipeTransform {

  constructor(private userP: ProuserService) { }

  transform(value: any, args?: any): any {
    var projects: any[] = []
    setTimeout(() => {
      for (let i of value) {
        if (i[0].projectname.toLowerCase().includes(args.toLowerCase())) {
          projects.push(i)
        }
      }
    }, 300);
    this.userP.filterPag.emit(projects)

    return projects
  }
}
