import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {


  transform(value: string): string {

    value = value.replace(/\D/g, '');

    if (value.length >= 2) {

      // Month validator
      const month = parseInt(value.substring(0, 2), 10);
      if (month < 1 || month > 12) {
        return value.substring(0, 2);
      }

      return value.substring(0, 2) + '/' + value.substring(2, 4);

    } else {
      return value;

    }

  }
}
