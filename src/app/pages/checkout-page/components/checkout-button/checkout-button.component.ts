import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-checkout-button',
  templateUrl: './checkout-button.component.html',
  styleUrls: ['./checkout-button.component.scss']
})
export class CheckoutButtonComponent implements OnInit, OnDestroy {
  translations: any = {};
  private languageSubscription: Subscription | undefined;

  constructor(private translationService: TranslationService) {}

  ngOnInit(): void {
    this.languageSubscription = this.translationService.currentLanguage$.subscribe((language: string) => {
      this.translations = this.translationService.getTranslations(language);
    });
  }

  ngOnDestroy(): void {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }
}
