import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'order'
})
export class OrderPipe implements PipeTransform {

  transform(value: any[], args?: boolean): any {
      if(!args){
        return value.sort((a, b) => a.creationdate.seconds - b.creationdate.seconds)
      }else{
        return value.sort((a, b) => b.creationdate.seconds - a.creationdate.seconds)
      }
  }

}
