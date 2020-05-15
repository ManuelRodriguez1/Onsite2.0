import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'latest'
})
export class LatestPipe implements PipeTransform {

  transform(value: any[], args?: string): any {
   
    // for (let i = 0; i < value.length; i++) {
    //   if(value[i][0].t < value[i+1][0].t){
    //     if(args == 'first'){
    //       let temp = value[i+1]
    //       value[i+1] = value[i]
    //       value[i] = temp
    //       console.warn(temp);   
    //     }else{
    //       let temp = value[i]
    //       value[i] = value[i+1]
    //       value[i+1] = temp
    //       console.info(temp)
    //     }
    //   }
    // }  
    return value
  }

}
