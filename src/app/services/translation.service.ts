import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import * as enUSTranslations from '../../assets/translate/en-US.json';
import * as esTranslations from '../../assets/translate/es.json';
import * as ptBRTranslations from '../../assets/translate/pt-BR.json';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private defaultLanguage = 'pt-BR';
  private currentLanguage = new BehaviorSubject<string>(this.getStoredLanguage());
  private translations: any = {
    'pt-BR': ptBRTranslations,
    'es': esTranslations,
    'en-US': enUSTranslations, // Corrigido para 'en-US'
  };

  currentLanguage$ = this.currentLanguage.asObservable();

  constructor() {
    // Garante que o valor inicial do BehaviorSubject seja consistente com o sessionStorage
    if (!this.getStoredLanguage()) {
        this.setLanguage(this.defaultLanguage);
    }
  }

  setLanguage(language: string): void {
    if (this.translations[language]) {
      this.currentLanguage.next(language);
      sessionStorage.setItem('language', language);
    } else {
      console.warn(`Idioma "${language}" não encontrado. Usando idioma padrão "${this.defaultLanguage}".`);
      this.currentLanguage.next(this.defaultLanguage);
      sessionStorage.setItem('language', this.defaultLanguage);
    }
  }

  getTranslations(language: string) {
    return this.translations[language] || this.translations[this.defaultLanguage];
  }

  getLocaleId(): string {
    const language = this.currentLanguage.getValue();
    switch (language) {
      case 'pt-BR':
        return 'pt-BR';
      case 'es':
        return 'es';
      case 'en-US':
        return 'en-US';
      default:
        return 'pt-BR';
    }
  }

  private getStoredLanguage(): string {
    return sessionStorage.getItem('language') || this.defaultLanguage;
  }
}
