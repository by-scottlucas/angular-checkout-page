import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'card'
})
export class CardPipe implements PipeTransform {

  transform(value: string): string {
    // Remove qualquer caractere não numérico
    value = value.replace(/\D/g, '');

    // Limita o valor a 16 dígitos
    value = value.substring(0, 16);

    // Adiciona espaço a cada 4 dígitos
    return value.replace(/(.{4})(?!$)/g, '$1 ');
  }

}
