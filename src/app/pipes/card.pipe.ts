import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'card'
})
export class CardPipe implements PipeTransform {

  transform(value: string): string {

    value = value.replace(/\D/g, '');

    value = value.substring(0, 16);

    return value.replace(/(.{4})(?!$)/g, '$1 ');
    
  }

}
