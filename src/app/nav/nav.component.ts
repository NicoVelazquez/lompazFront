import {Component, OnInit, ViewChild} from '@angular/core';
import * as UIkit from 'uikit';
import {SignInUpComponent} from './sign-in-up/sign-in-up.component';
import {AuthService} from '../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @ViewChild(SignInUpComponent) child: SignInUpComponent;
  constructor(public auth: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  signIn() {
    UIkit.modal('#sign-modal').show();
    this.child.signIn();
  }

  signUp() {
    UIkit.modal('#sign-modal').show();
    this.child.signUp();
  }

  signOut() {
    console.log('Click');
    this.auth.signOut();
  }
}
