import { Component } from '@angular/core';
import { CardPipe } from 'src/app/pipes/card.pipe';
import { CpfCnpjPipe } from 'src/app/pipes/cpf.cnpj.pipe';
import { DatePipe } from 'src/app/pipes/date.pipe';
import { ValidatorsService } from 'src/app/services/validators.service';

declare var bootstrap: any; // Declaração do bootstrap para usar a classe Tooltip

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {

  inputName!: string;
  inputCardNumber!: string;
  inputExpiration!: string;
  inputCvv!: string;
  inputInstallments: number = 1;
  inputCpfCnpj: string = '';


  cardBrandImage = '../../../assets/credit_card_icon.svg';
  cardBrand: string | null = null;

  constructor(
    private datePipe: DatePipe,
    private cardPipe: CardPipe,
    private cpfPipe: CpfCnpjPipe,
    private validatorsService: ValidatorsService
  ) { }

  ngAfterViewInit() {

    // Seleciona todos os elementos com data-bs-toggle="tooltip"
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));

    // Inicializa o tooltip com trigger de click
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl, {
        trigger: 'click'
      });
    });

  }
  

  checkCardBrand(event: any) {

    const cardNumber = event.target.value;

    switch (true) {

      case cardNumber.startsWith('4'):
        this.cardBrand = 'visa';
        this.cardBrandImage = "../../../assets/visa_icon.png";
        break;

      case cardNumber.startsWith('5'):
        this.cardBrand = 'mastercard';
        this.cardBrandImage = "../../../assets/mastercard_icon.png";
        break;

      case cardNumber.startsWith('3'):
        this.cardBrand = 'american-express';
        this.cardBrandImage = "../../../assets/american_express_icon.png";
        break;

      case cardNumber.startsWith('6'):
        this.cardBrand = 'hipercard';
        this.cardBrandImage = "../../../assets/hipercard_icon.png";
        break;

      default:
        this.cardBrand = null;
        this.cardBrandImage = '../../../assets/credit_card_icon.svg';

    }

  }


  formatCpfCnpj(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
    this.inputCpfCnpj = this.cpfPipe.transform(this.inputCpfCnpj);

    const validate = this.validatorsService.validateDocument(this.inputCpfCnpj);

    console.log(validate)
  }

  formatExpirationDate(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
    this.inputExpiration = this.datePipe.transform(value);
  }

  formatCardNumber(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
    this.inputCardNumber = this.cardPipe.transform(value);
  }

  formatCvvNumber(event: Event): void {

    const inputElement = event.target as HTMLInputElement;
    let value = inputElement.value;
  
    value = value.replace(/\D/g, '');
  
    if (value.length > 4) {
      value = value.substring(0, 4);
    }
  
    inputElement.value = value;
  
    this.inputCvv = value;

  }
  

}
