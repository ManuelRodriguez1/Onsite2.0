import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'order'
})
export class OrderPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    var projects: any[] = []
    setTimeout(() => {
      for(let i of value){
        // var temp = value[i][0].creationdate
        // console.log(temp);
        console.log(i[0].creationdate);
        
      }
    }, 300);
    return value;
  }

}
