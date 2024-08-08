import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpf'
})
export class CpfCnpjPipe implements PipeTransform {

  transform(value: string): string {

    if (!value) return value;

    const inputCharacater = value.replace(/\D/g, '');

    if (inputCharacater.length === 11) {
      // CPF
      return inputCharacater.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

    } else if(inputCharacater.length === 14){
      //CNPJ
      return inputCharacater.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');

    }

    return value;

  }


}
