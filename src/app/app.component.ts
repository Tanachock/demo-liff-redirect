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
  liffId = '2007577313-mJJ7N5XO';

  async ngOnInit() {
    await this.initializeLiff();
  }

  async initializeLiff() {
    try {
      await liff.init({ liffId: this.liffId });
      console.log('LIFF initialized successfully');
      
      if (liff.isLoggedIn()) {
        this.isLoggedIn = true;
        await this.getUserProfile();
      } else {
        console.log('User is not logged in');
      }
    } catch (error) {
      console.error('LIFF initialization failed', error);
    }
  }

  async login() {
    try {
      if (!liff.isLoggedIn()) {
        liff.login();
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  }

  async logout() {
    try {
      if (liff.isLoggedIn()) {
        liff.logout();
        this.isLoggedIn = false;
        this.userProfile = null;
      }
    } catch (error) {
      console.error('Logout failed', error);
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
}
