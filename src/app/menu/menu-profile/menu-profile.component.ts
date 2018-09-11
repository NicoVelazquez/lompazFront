import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PasswordValidation} from '../../shared/validators/password-validation';
import * as UIkit from 'uikit';
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu-profile',
  templateUrl: './menu-profile.component.html',
  styleUrls: ['./menu-profile.component.css']
})
export class MenuProfileComponent implements OnInit {

  // No habria que tener esta variable, se deberia cambiar la image del user TODO
  imageUrl: any;
  sexes = [{'name': 'Femenino', 'checked': true}, {'name': 'Masculino', 'checked': false}];
  public profileForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {
    this.profileForm = fb.group({
      'password': new FormControl(null, [Validators.required]),
      'confirmPassword': new FormControl(null, [Validators.required]),
    }, {
      validator: PasswordValidation.MatchPassword
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
          UIkit.notification({
            message: 'Imagen guardados exitosamente',
            status: 'primary',
            pos: 'top-right'
          });
        };
        reader.readAsDataURL(event.target.files[0]);
      }
    }, 1000);
  }

  check(index: string) {
    for (const sex of this.sexes) {
      sex.checked = false;
    }
    this.sexes[index].checked = !this.sexes[index].checked;
  }

  saveProfile() {
    console.log(this.profileForm.value);
    console.log((<HTMLInputElement>document.getElementById('name')).value);
    console.log((<HTMLInputElement>document.getElementById('lastname')).value);
    console.log((<HTMLInputElement>document.getElementById('email')).value);
    console.log((<HTMLInputElement>document.getElementById('new-password')).value);
    console.log((<HTMLInputElement>document.getElementById('birthday')).value);
    console.log(this.sexes.filter(s => s.checked).map(s => s.name));
    UIkit.notification({
      message: 'Cambios guardados exitosamente',
      status: 'primary',
      pos: 'top-right'
    });
    this.profileForm.reset();
  }

  deleteUser() {
    UIkit.modal('#confirmDeleteUser').show();
  }

  confirmDeleteUser() {
    // Eliminar el usuario de la base TODO
    UIkit.notification({
      message: 'Usuario eliminado exitosamente',
      status: 'primary',
      pos: 'top-right'
    });
    UIkit.modal('#confirmDeleteUser').hide();
    this.router.navigate(['']);
    //  Tambien deberia hacer el logout TODO
  }

}
