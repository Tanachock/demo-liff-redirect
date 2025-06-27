import { Component } from '@angular/core';
import liff from '@line/liff';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
  isLoading = false;
  isLoggedIn = false;
  userProfile: any = null;
  liffId = '2007577313-mJJ7N5XO';

  async ngOnInit() {
    await this.initializeLiff();
  }

  async initializeLiff() {
    try {
      this.isLoading = true;
      await liff.init({ liffId: this.liffId });
      console.log('LIFF initialized successfully');
      
      if (liff.isLoggedIn()) {
        this.isLoggedIn = true;
        await this.getUserProfile();
      } else {
        console.log('User is not logged in');
        await this.autoLogin();
      }
    } catch (error) {
      console.error('LIFF initialization failed', error);
    } finally {
      this.isLoading = false;
    }
  }

  async autoLogin() {
    try {
      console.log('Attempting auto login...');
      if (!liff.isLoggedIn()) {
        liff.login();
      }
    } catch (error) {
      console.error('Auto login failed', error);
    }
  }

  async login() {
    try {
      this.isLoading = true;
      if (!liff.isLoggedIn()) {
        liff.login();
      }
    } catch (error) {
      console.error('Login failed', error);
    } finally {
      this.isLoading = false;
    }
  }

  async logout() {
    try {
      this.isLoading = true;
      if (liff.isLoggedIn()) {
        liff.logout();
        this.isLoggedIn = false;
        this.userProfile = null;
      }
    } catch (error) {
      console.error('Logout failed', error);
    } finally {
      this.isLoading = false;
    }
  }

  async getUserProfile() {
    try {
      if (liff.isLoggedIn()) {
        this.userProfile = await liff.getProfile();
        console.log('User profile:', this.userProfile);
      }
    } catch (error) {
      console.error('Failed to get user profile', error);
    }
  }

  async pay() {
    liff.closeWindow();
    try {
      await liff.openWindow({
        url: 'https://900d-2001-fb1-29-1e53-dc47-eea2-5509-b6e8.ngrok-free.app?openExternalBrowser=1',
        external: false
      });
    } catch (error) {
      console.error('Payment failed', error);
    }
  }
}
