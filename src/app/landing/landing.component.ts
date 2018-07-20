import { Component, OnInit } from '@angular/core';
import * as UIkit from 'uikit';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    UIkit.notification({
      message: 'Hola',
      status: 'primary',
      pos: 'bottom-center'
    });
  }

}
