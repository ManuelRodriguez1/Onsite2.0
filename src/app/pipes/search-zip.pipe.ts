import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchZip'
})
export class SearchZipPipe implements PipeTransform {

  transform(value: any[], args?: any): any {
    var zipcode: any[] = []
    var cont: number = 0
    if (args) {
      setTimeout(() => {
        value.forEach((val) => {
          if (val.Zipcode.includes(args.toLowerCase()) || val.City.toLowerCase().includes(args.toLowerCase())) {
            cont++;
            if (cont <= 5) {
              zipcode.push({'city': val.City,'zip': val.Zipcode})
            }
          }
        })
      }, 300);
      return zipcode
    }else{
      return null;
    }
  }

}
