import { Component, OnInit } from '@angular/core';
import * as translations from "../../../assets/translate/pt-BR.json";

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss'],
})
export class CheckoutPageComponent implements OnInit {
  translations: any = translations;

  ngOnInit(): void {
    this.purchaseTotal();
  }

  purchaseTotal() {
    const subtotal = this.translations.checkoutPage.detailSummaryCard.detailsList.find((item: any) => item.label === 'Subtotal')?.value || 0;
    const discount = this.translations.checkoutPage.detailSummaryCard.detailsList.find((item: any) => item.label === 'Desconto')?.value || 0;
    const shipping = this.translations.checkoutPage.detailSummaryCard.detailsList.find((item: any) => item.label === 'Frete')?.value || 0;

    this.translations.checkoutPage.detailSummaryCard.detailsTotal.value = subtotal + shipping - discount;
  }
}
