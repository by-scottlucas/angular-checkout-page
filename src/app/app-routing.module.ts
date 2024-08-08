import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ModalComponent } from './components/modal/modal.component';

const routes: Routes = [
  { path: '', redirectTo: 'checkout', pathMatch: 'full' },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'modal', component: ModalComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
