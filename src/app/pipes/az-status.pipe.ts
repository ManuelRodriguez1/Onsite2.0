import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'azStatus'
})
export class AzStatusPipe implements PipeTransform {

  transform(value: any, args?: boolean): any {
    if(args){
      return value.sort((a, b) => {
        if(a.statusname < b.statusname){
          return -1
        }
      })
    }else{
      return value.reverse()
    }
  }

}
