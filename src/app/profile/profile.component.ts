import {Component, OnInit} from '@angular/core';
import * as UIkit from 'uikit';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  // No habria que tener esta variable, se deberia cambiar la image del user TODO
  imageUrl: any;

  constructor(private router: Router, private aRouter: ActivatedRoute) {
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

  editUser() {
    this.aRouter.params.subscribe(params => {
      this.router.navigate(['profile/' + params['id'] + '/edit']);
    });
  }

  deleteUser() {

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
