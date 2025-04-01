import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { CheckoutPageModule } from './pages/checkout-page/checkout-page.module';

@NgModule({
  declarations: [
    AppComponent,
    CheckoutPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CheckoutPageModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
