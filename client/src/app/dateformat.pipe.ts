import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateformat'
})
export class DateformatPipe implements PipeTransform {

  transform(value: string): string {
    const date = new Date(value);
    return date.getDate()+" "+date.toLocaleString('en-US', {month: 'long',})+" "+date.getFullYear()+" Time: "+date.getHours()+":"+date.getMinutes();
  }

}
