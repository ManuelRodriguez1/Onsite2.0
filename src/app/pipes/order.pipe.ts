import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'order'
})
export class OrderPipe implements PipeTransform {

  transform(value: any[], args?: boolean): any {
      if(args){
        return value.reverse()
      }else{
        return value.reverse()
      }
  }

}
