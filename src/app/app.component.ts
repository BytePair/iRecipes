import { Component, ViewChild } from '@angular/core';
import { MenuController, NavController, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import firebase to handle login
import firebase from 'firebase';

import { TabsPage } from '../pages/tabs/tabs';
import { SigninPage } from "../pages/signin/signin";
import { SignupPage } from "../pages/signup/signup";
import { AuthService } from "../services/auth.service";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any = TabsPage;
  signinPage:any = SigninPage;
  signupPage:any = SignupPage;
  isAuthenticated:boolean = false;
  @ViewChild('nav') nav: NavController;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private authService: AuthService,
    private menuCtrl: MenuController) {

    // initialize firebase with api and auth domain
    firebase.initializeApp({
      apiKey: "AIzaSyA2CjCJrLvNKdi5_PP9lc-hDvPYNKKO7SY",
      authDomain: "udemyrecipes.firebaseapp.com",
    });

    // handle authentication state changes
    firebase.auth().onAuthStateChanged(user => {
      // user is authenticated
      if (user) {
        // set to true and set root to tabs page
        this.isAuthenticated = true;
        this.rootPage = TabsPage;
      }
      // user is not authenticated
      else {
        this.isAuthenticated = false;
        this.rootPage = SigninPage;
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

  }

  onLoad(page:any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  onLogout() {
    this.authService.logoff();
    this.menuCtrl.close();
    this.nav.setRoot(SigninPage);
  }

}
