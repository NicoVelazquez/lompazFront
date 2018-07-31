import {Component, OnInit} from '@angular/core';
import * as UIkit from 'uikit';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  // No habria que tener esta variable, se deberia cambiar la image del user TODO
  imageUrl: any;

  public profileForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private aRouter: ActivatedRoute) {
    this.profileForm = fb.group({
      'name': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit() {
  }

  readUrl(event: any) {
    // Se podria agregar un spinner TODO
    setTimeout(() => {
      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (event2: ProgressEvent) => {
          // Agregar la imagen a la base TODO
          // No habria que tener esta variable, se deberia cambiar la image del user TODO
          this.imageUrl = (<FileReader>event2.target).result;
        };
        reader.readAsDataURL(event.target.files[0]);
      }
    }, 1000);
  }

  saveUser() {
    console.log(this.profileForm.value);
    this.aRouter.params.subscribe(params => {
      this.router.navigate(['profile/' + params['id']]);
    });
  }
}
