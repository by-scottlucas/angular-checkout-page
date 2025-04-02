import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CardPipe } from '../../pipes/card.pipe';
import { CpfCnpjPipe } from '../../pipes/cpf-cnpj.pipe';
import { DatePipe } from '../../pipes/date.pipe';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.scss'],
})
export class CheckoutFormComponent implements OnInit {
  checkoutForm: FormGroup;
  cardBrand: string | null = null;
  cardBrandImage = '../../../assets/credit_card_icon.svg';
  translations: any = {};

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private cardPipe: CardPipe,
    private cpfPipe: CpfCnpjPipe,
    private translationService: TranslationService
  ) {
    this.checkoutForm = this.fb.group({
      name: ['', [Validators.required]],
      cardNumber: ['', [Validators.required, Validators.minLength(19)]],
      expiration: [
        '',
        [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)],
      ],
      cvv: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(4)],
      ],
      installments: [1, [Validators.required]],
      cpfCnpj: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.translationService.currentLanguage$.subscribe(() => {
      this.translationService
        .getTranslations()
        .subscribe((translations: any) => {
          this.translations = translations;
        });
    });
  }

  checkCardBrand(event: any) {
    const cardNumber = event.target.value.replace(/\D/g, '');
    this.cardBrandImage = '../../../assets/credit_card_icon.svg';

    if (!cardNumber) {
      this.cardBrand = null;
      return;
    }

    if (cardNumber.startsWith('4')) {
      this.cardBrand = 'visa';
      this.cardBrandImage = '../../../assets/visa.png';
    } else if (
      cardNumber.startsWith('51') ||
      cardNumber.startsWith('52') ||
      cardNumber.startsWith('53') ||
      cardNumber.startsWith('54') ||
      cardNumber.startsWith('55') ||
      (cardNumber.startsWith('2221') && cardNumber.substring(0, 4) <= '2720')
    ) {
      this.cardBrand = 'mastercard';
      this.cardBrandImage = '../../../assets/mastercard.png';
    } else if (cardNumber.startsWith('34') || cardNumber.startsWith('37')) {
      this.cardBrand = 'american-express';
      this.cardBrandImage = '../../../assets/american_exp.png';
    } else if (
      cardNumber.startsWith('30') ||
      cardNumber.startsWith('36') ||
      cardNumber.startsWith('38')
    ) {
      this.cardBrand = 'diners-club';
      this.cardBrandImage = '../../../assets/diners_club.png';
    } else if (cardNumber.startsWith('6062')) {
      this.cardBrand = 'hipercard';
      this.cardBrandImage = '../../../assets/hipercard.png';
    } else {
      this.cardBrand = null;
    }
  }

  formatDocument(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
    this.checkoutForm.patchValue({ cpfCnpj: this.cpfPipe.transform(value) });
  }

  formatExpirationDate(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    let value = inputElement.value.replace(/\D/g, '');

    if (value.length > 2) {
      const month = parseInt(value.substring(0, 2), 10);
      if (month > 12) {
        value = '12' + value.substring(2);
      }
    }

    if (value.length > 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }

    this.checkoutForm.patchValue({
      expiration: value,
    });
  }

  formatCardNumber(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
    this.checkoutForm.patchValue({
      cardNumber: this.cardPipe.transform(value),
    });
  }

  formatCvvNumber(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    let value = inputElement.value.replace(/\D/g, '');
    value = value.substring(0, 4);
    this.checkoutForm.patchValue({ cvv: value });
  }

  onSubmit() {
    if (this.checkoutForm.valid) {
      console.log('Formulário enviado!', this.checkoutForm.value);
    } else {
      console.log('Formulário inválido!');
    }
  }
}
