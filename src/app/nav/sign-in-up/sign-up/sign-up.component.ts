import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PasswordValidation} from '../../../shared/validators/password-validation';
import * as UIkit from 'uikit';
import {AuthService} from '../../../shared/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public signUpForm: FormGroup;
  public showPass: boolean;
  public showCPass: boolean;

  invalidEmail = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {
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

    this.signUpForm.get('email').valueChanges.subscribe(() => {
      this.invalidEmail = false;
    });
  }

  showPassword() {
    this.showPass = !this.showPass;
  }

  showCPassword() {
    this.showCPass = !this.showCPass;
  }

  get email() { return this.signUpForm.get('email'); }

  onCreateAccount() {
    this.authService.createUserWithEmailAndPassword(this.signUpForm.value.email, this.signUpForm.value.password).then(() => {
      this.signInWithEmailAndPassword(this.signUpForm.value.email, this.signUpForm.value.password);
      this.signUpForm.reset();
      UIkit.modal('#sign-modal').hide();
    }).catch(err => {
      if (err.code === 'auth/email-already-in-use') {
        console.log('Email Already in Use');
        document.getElementById('email').classList.remove('ng-valid');
        document.getElementById('email').classList.add('ng-invalid');
        this.invalidEmail = true;
      } else {
        console.log(err);
      }
    });
  }

  signInWithEmailAndPassword(email: string, password: string) {
    this.authService.signInWithEmailAndPassword(email, password).then(() => {
    });
  }
}
