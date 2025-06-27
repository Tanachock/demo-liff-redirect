import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import liff from '@line/liff';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss']
})
export class PaymentSuccessComponent implements OnInit, OnDestroy {
  currentDate = new Date();
  transactionId = this.generateTransactionId();
  countdown = 5;
  private countdownInterval: any;

  constructor(private router: Router) {}

  ngOnInit() {
    this.startCountdown();
  }

  ngOnDestroy() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  startCountdown() {
    this.countdownInterval = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        this.closeWindow();
      }
    }, 1000);
  }

  generateTransactionId(): string {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `TXN${timestamp.slice(-6)}${random}`;
  }

  goHome() {
    this.router.navigate(['/']);
  }

  viewReceipt() {
    // เปิดใบเสร็จในหน้าต่างใหม่
    window.open(`/receipt/${this.transactionId}`, '_blank');
  }

  closeWindow() {
    try {
      liff.closeWindow();
    } catch (error) {
      console.log('LIFF closeWindow not available, redirecting to home');
      this.router.navigate(['/']);
    }
  }
}
