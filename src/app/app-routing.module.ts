import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentComponent } from './payment/payment.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { SuccesCloseComponent } from './succes-close/succes-close.component';

const routes: Routes = [
  { path: '', component: PaymentComponent },
  { path: 'payment-success', component: PaymentSuccessComponent },  
  { path: 'succes-close', component: SuccesCloseComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
