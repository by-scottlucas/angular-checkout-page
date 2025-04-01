import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CheckoutButtonComponent } from './components/checkout-button/checkout-button.component';
import { CheckoutFormComponent } from './components/checkout-form/checkout-form.component';
import { FooterComponent } from './components/footer/footer.component';
import { CardPipe } from './pipes/card.pipe';
import { CpfCnpjPipe } from './pipes/cpf-cnpj.pipe';
import { DatePipe } from './pipes/date.pipe';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    DatePipe,
    CardPipe,
    CpfCnpjPipe,
    FooterComponent,
    CheckoutFormComponent,
    CheckoutButtonComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [
    DatePipe,
    CardPipe,
    CpfCnpjPipe,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
  ],
  exports:[
    DatePipe,
    CardPipe,
    CpfCnpjPipe,
    FooterComponent,
    CheckoutButtonComponent,
    CheckoutFormComponent,
  ]
})
export class CheckoutPageModule { }
