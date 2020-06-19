import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chatSearch'
})
export class ChatSearchPipe implements PipeTransform {

  transform(value: any, args: boolean): any {
    var data: any[] = []
    value.map((m)=>{
      if(!m.noRead){
        data.push(m)
      }
    })    
    if(args){
      return data
    }else{
      return value;
    }
  }

}
