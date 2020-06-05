import { Pipe, PipeTransform } from '@angular/core';
import { ProuserService } from '../services/prouser.service';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args?: number): any {
    var pro: any[] = []
      for(let i of value){
        if(i.status == args){
          pro.push(i)
        }
      }
    if(args == 5){
      return value
    }else{
      return pro
    }
    
  }

}
