import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ModalComponent } from './components/modal/modal.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { CpfCnpjPipe } from './pipes/cpf.cnpj.pipe';
import { DatePipe } from './pipes/date.pipe';
import { CardPipe } from './pipes/card.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CheckoutComponent,
    ModalComponent,
    FooterComponent,
    HeaderComponent,
    CpfCnpjPipe,
    DatePipe,
    CardPipe,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [CpfCnpjPipe, DatePipe, CardPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
