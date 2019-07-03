import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import * as UIkit from 'uikit';
import {Router} from '@angular/router';
import {UserService} from '../../shared/services/user.service';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-menu-profile',
  templateUrl: './menu-profile.component.html',
  styleUrls: ['./menu-profile.component.css']
})
export class MenuProfileComponent implements OnInit {

  sexes = [{'name': 'Femenino', 'checked': false}, {'name': 'Masculino', 'checked': false}];
  user: any;
  public profileForm: FormGroup;

  loading = false;

  constructor(private router: Router, private fb: FormBuilder, private userService: UserService, private authService: AuthService) {
    this.profileForm = fb.group({
      'name': new FormControl(null, [Validators.required]),
      'lastname': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required]),
      'birthday': new FormControl(null, [Validators.required]),
      // 'password': new FormControl(null, [Validators.required]),
      // 'confirmPassword': new FormControl(null, [Validators.required]),
    }, {
      // validator: PasswordValidation.MatchPassword
    });
    this.profileForm.get('email').disable();

    this.userService.getUser().subscribe(data => {
      this.user = data;
      console.log(this.user);
      if (this.user !== undefined) {
        this.profileForm.patchValue({
          name: this.user.name,
          lastname: this.user.lastname,
          email: this.user.email,
          birthday: this.user.birthday,
        });
        this.sexes.forEach(s => {
          if (s.name === this.user.sex) {
            s.checked = true;
          }
        });
      }
    });
  }

  ngOnInit() {
  }

  readUrl(event: any) {
    this.loading = true;
    setTimeout(() => {
      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (event2: ProgressEvent) => {
          this.userService.addUserPhoto(this.authService.currentUser.id, event.target.files[0]).then(data => {
            data.subscribe(url => {
              this.user.photoUrl = url;
              this.loading = false;
              this.userService.updateUser(this.user).then(() => {
                UIkit.notification({
                  message: 'Imagen guardados exitosamente',
                  status: 'primary',
                  pos: 'top-right'
                });
              });
            });
          });
        };
        reader.readAsDataURL(event.target.files[0]);
      }
    }, 1000);
  }

  check(index: number) {
    for (const sex of this.sexes) {
      sex.checked = false;
    }
    this.sexes[index].checked = !this.sexes[index].checked;
  }

  saveProfile() {
    const newUser = this.profileForm.value;
    newUser.sex = this.sexes.filter(s => s.checked).map(s => s.name)[0];
    // this.userService.updateUser(newUser, this.user.email !== this.profileForm.value.email).then(() => {
    this.userService.updateUser(newUser).then(() => {
      UIkit.notification({
        message: 'Cambios guardados exitosamente',
        status: 'primary',
        pos: 'top-right'
      });
    });
  }

  deleteUser() {
    UIkit.modal('#confirmDeleteUser').show();
  }

  confirmDeleteUser() {
    this.userService.deleteUser().then(() => {
      this.authService.deleteUser();
      UIkit.notification({
        message: 'Usuario eliminado exitosamente',
        status: 'primary',
        pos: 'top-right'
      });
      this.router.navigate(['']);
      UIkit.modal('#confirmDeleteUser').hide();
    });
  }

}
