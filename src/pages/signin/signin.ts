import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  onSignIn(form:NgForm) {
    console.log(form.value);
  }
}
