import { CurrencyPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslationService } from './services/translation.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss'],
})
export class CheckoutPageComponent implements OnInit, OnDestroy {
  translations: any = {};
  language: string = 'pt-BR';
  private languageSubscription: Subscription | undefined;
  availableLanguages: { value: string; label: string }[] = [];

  constructor(
    private currencyPipe: CurrencyPipe,
    private translationService: TranslationService,
  ) {}

  ngOnInit(): void {
    this.languageSubscription = this.translationService.currentLanguage$.subscribe((language: string) => {
      this.language = language;
      this.translationService.getTranslations().subscribe((translations: any) => {
        this.translations = translations;
        this.purchaseTotal();
      });
    });

    this.setAvailableLanguages();
  }

  ngOnDestroy(): void {
    this.languageSubscription?.unsubscribe();
  }

  purchaseTotal() {
    if (!this.translations?.checkoutPage?.detailSummaryCard?.detailsList) {
      return;
    }

    let subtotal = 0;
    let discount = 0;
    let shipping = 0;

    this.translations.checkoutPage.detailSummaryCard.detailsList.forEach((item: any) => {
      if (item.subtotal) {
        subtotal = item.value;
      } else if (item.discount) {
        discount = item.value;
      } else if (item.shipping) {
        shipping = item.value;
      }
    });

    const total = subtotal + shipping - discount;
    if (this.translations.checkoutPage.detailSummaryCard.detailsTotal) {
      this.translations.checkoutPage.detailSummaryCard.detailsTotal.value = total;
    }
  }

  getFormattedCurrency(value: number): string {
    let currencyCode = 'BRL';
    if (this.language === 'en-US') {
      currencyCode = 'USD';
    } else if (this.language === 'es') {
      currencyCode = 'EUR';
    }

    return this.currencyPipe.transform(value, currencyCode, 'symbol', '1.2-2') || '';
  }

  changeLanguage(language: string) {
    this.translationService.setLanguage(language);
  }

  private setAvailableLanguages() {
    this.availableLanguages = [
      { value: 'pt-BR', label: 'Português (BR)' },
      { value: 'es', label: 'Español' },
      { value: 'en-US', label: 'English (US)' }
    ];
  }
}
