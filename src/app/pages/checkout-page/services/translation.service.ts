import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private defaultLanguage = 'pt-BR';
  private currentLanguage = new BehaviorSubject<string>(
    this.getStoredLanguage()
  );
  private translations = new BehaviorSubject<any>({});

  currentLanguage$ = this.currentLanguage.asObservable();
  translations$ = this.translations.asObservable();

  constructor(private http: HttpClient) {
    this.loadTranslations(this.getStoredLanguage());
  }

  setLanguage(language: string): void {
    if (this.currentLanguage.getValue() !== language) {
      this.currentLanguage.next(language);
      sessionStorage.setItem('language', language);
      this.loadTranslations(language);
    }
  }

  getTranslations(): Observable<any> {
    return this.translations.asObservable();
  }

  getLocaleId(): string {
    return this.currentLanguage.getValue();
  }

  private loadTranslations(language: string): void {
    this.http
      .get(`assets/i18n/${language}.json`)
      .subscribe((translations) => this.translations.next(translations));
  }

  private getStoredLanguage(): string {
    return sessionStorage.getItem('language') || this.defaultLanguage;
  }
}
