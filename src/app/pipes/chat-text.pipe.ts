import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chatText'
})
export class ChatTextPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    var temp: any[] = []
    for (let i of value) {
      if (i.name.toLowerCase().includes(args.toLowerCase()) || i.projectname.toLowerCase().includes(args.toLowerCase())) {
        temp.push(i)
      }
    }
    if (args == '') {
      return value
    } else {
      return temp
    }
  }

}
