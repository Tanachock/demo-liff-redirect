import { Component, OnInit } from '@angular/core';
import liff from '@line/liff';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'poc-open';
  isLoggedIn = false;
  userProfile: any = null;
  isLoading = true;
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
    try {
      this.isLoading = true;
      const result = await liff.openWindow({
        url: 'https://www.youtube.com/watch?v=4Lmcadu8ghM',
        external: false,
      });
      console.log('Payment result:', result);
    } catch (error) {
      console.error('Payment failed', error);
    } finally {
      this.isLoading = false;
    }
  }
}
