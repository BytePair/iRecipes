import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { AuthService } from "../../services/auth.service";


@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {};

  onSignIn(form:NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Signing you in...'
    });
    loading.present();
    this.authService.signin(form.value.email, form.value.password)
      .then(data => {
        loading.dismiss();
        console.log(data);
      })
      .catch(error => {
        loading.dismiss();
        this.alertCtrl.create({
          title: 'Sign In Failed',
          message: error.message,
          buttons: ['Ok']
        }).present();
        console.log(error);
      })
  }
}
