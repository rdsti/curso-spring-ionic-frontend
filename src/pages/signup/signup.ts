import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  signupUser() {

    console.log("enviou o form");

  }

}
