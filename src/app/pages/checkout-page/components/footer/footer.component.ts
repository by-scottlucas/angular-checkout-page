import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {
  translations: any = {};
  private languageSubscription: Subscription | undefined;

  constructor(private translationService: TranslationService) {}

  ngOnInit(): void {
    this.languageSubscription = this.translationService.currentLanguage$.subscribe(() => {
      this.translationService.getTranslations().subscribe((translations: any) => {
        this.translations = translations;
      });
    });
  }

  ngOnDestroy(): void {
    this.languageSubscription?.unsubscribe();
  }
}
