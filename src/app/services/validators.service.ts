import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { } 
  
  validateDocument(document: string): boolean {

    const documentCharacters = document.replace(/\D/g, '');
  
    if (documentCharacters.length === 11) {
      // CPF
      return this.validateCpf(documentCharacters);

    } else if (documentCharacters.length === 14) {
      // CNPJ
      return this.validateCnpj(documentCharacters);
      
    }
  
    return false;
  }
  
  validateCpf(cpf: string): boolean {
  
    cpf = cpf.replace(/\D/g, '');
  
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
      return false;
    }
  
    const weights1 = [10, 9, 8, 7, 6, 5, 4, 3, 2];
    const weights2 = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];

    const calculateDigit = (char: string, weights: number[]) => {
      let sum = 0;
      for (let i = 0; i < char.length; i++) {
        sum += parseInt(char.charAt(i)) * weights[i];
      }
      const remainder = sum % 11;
      return remainder < 2 ? 0 : 11 - remainder;
    };
  
    const digit1 = calculateDigit(cpf.substring(0, 9), weights1);
    const digit2 = calculateDigit(cpf.substring(0, 9) + digit1, weights2);
  
    return cpf === cpf.substring(0, 9) + digit1 + digit2;

  }
  
  
  validateCnpj(cnpj: string): boolean {
  
    cnpj = cnpj.replace(/\D/g, '');
  
    if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) {
      return false;
    }
  
    const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    const calculateDigit = (char: string, weights: number[]) => {
      let sum = 0;
      for (let i = 0; i < char.length; i++) {
        sum += parseInt(char.charAt(i)) * weights[i];
      }
      const remainder = sum % 11;
      return remainder < 2 ? 0 : 11 - remainder;
    };
  
    const digit1 = calculateDigit(cnpj.substring(0, 12), weights1);
    const digit2 = calculateDigit(cnpj.substring(0, 12) + digit1, weights2);
  
    return cnpj === cnpj.substring(0, 12) + digit1 + digit2;
  }

}
