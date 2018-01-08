import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, IonicPage, LoadingController } from 'ionic-angular';

import { AuthService } from "../../services/auth.service";


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController ) {};

  onSignUp(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Signing you up...'
    });
    loading.present();
    // use .then() and catch() to get results of promise
    this.authService.signup(form.value.email, form.value.password)
      .then(data => {
        loading.dismiss();
      })
      .catch(error => {
        loading.dismiss();
        this.alertCtrl.create({
          title: 'Sign Up Failed',
          message: error.message,
          buttons: ['Ok']
        }).present();
      });
  }

}
