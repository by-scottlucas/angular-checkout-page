import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslationService } from 'src/app/services/translation.service';
import { Subscription } from 'rxjs';

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
