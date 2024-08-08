import { Component } from '@angular/core';

declare var bootstrap: any; // Declaração do bootstrap para usar a classe Tooltip

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {

  cardBrandImage = '../../../assets/credit_card_icon.svg';

  cardBrand: string | null = null;

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

}
