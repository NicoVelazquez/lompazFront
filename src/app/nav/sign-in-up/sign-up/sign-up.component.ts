import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PasswordValidation} from '../../../shared/validators/password-validation';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public signUpForm: FormGroup;
  public showPass: boolean;
  public showCPass: boolean;

  constructor(private fb: FormBuilder) {
    this.signUpForm = fb.group({
      'email': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required]),
      'confirmPassword': new FormControl(null, [Validators.required]),
    }, {
      validator: PasswordValidation.MatchPassword
    });
  }

  ngOnInit() {
    this.showPass = false;
    this.showCPass = false;
  }

  showPassword() {
    this.showPass = !this.showPass;
  }
  showCPassword() {
    this.showCPass = !this.showCPass;
  }
}
