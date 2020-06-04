import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'az'
})
export class AzPipe implements PipeTransform {

  transform(value: any[], args?: boolean): any {
    if(args){
      return value.sort((a, b) => {
        if(a.projectname < b.projectname){
          return -1
        }
      })
    }else{
      return value.reverse()
    }
  }

}
