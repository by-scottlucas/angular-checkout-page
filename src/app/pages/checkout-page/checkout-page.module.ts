import { CommonModule, CurrencyPipe, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeEn from '@angular/common/locales/en';
import localeEs from '@angular/common/locales/es';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CheckoutButtonComponent } from './components/checkout-button/checkout-button.component';
import { CheckoutFormComponent } from './components/checkout-form/checkout-form.component';
import { FooterComponent } from './components/footer/footer.component';
import { CardPipe } from './pipes/card.pipe';
import { CpfCnpjPipe } from './pipes/cpf-cnpj.pipe';
import { DatePipe } from './pipes/date.pipe';
import { TranslationService } from './services/translation.service';

registerLocaleData(localePt);
registerLocaleData(localeEs);
registerLocaleData(localeEn);

export function localeFactory(translationService: TranslationService) {
  return translationService.getLocaleId();
}

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
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    DatePipe,
    CardPipe,
    CpfCnpjPipe,
    CurrencyPipe,
    {
      provide: LOCALE_ID,
      useFactory: localeFactory,
      deps: [TranslationService],
    },
  ],
  exports: [
    DatePipe,
    CardPipe,
    CpfCnpjPipe,
    FormsModule,
    FooterComponent,
    CheckoutButtonComponent,
    CheckoutFormComponent,
  ],
})
export class CheckoutPageModule {}
