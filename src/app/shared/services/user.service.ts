import {Injectable} from '@angular/core';
import {
  AngularFirestore,
} from 'angularfire2/firestore';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireStorage, AngularFireUploadTask} from 'angularfire2/storage';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  idKey = 'id';

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private storage: AngularFireStorage) {
  }

  getUser(): Observable<any> {
    const id = window.localStorage.getItem(this.idKey);
    return this.afs.doc('users/' + id)
      .valueChanges();
  }

  updateUser(user: any): Promise<any> {
    const id = window.localStorage.getItem(this.idKey);
    // if (emailChanged) {
    //   console.log('entro');
    //   this.afAuth.auth.currentUser.updateEmail(user.email).then(() => {
    //     console.log('email cambiado');
    //   });
    // }
    return this.afs.doc('users/' + id)
      .update(user);
  }

  deleteUser(): Promise<any> {
    // TODO borrar imagen del user (esta con el id del user)
    const id = window.localStorage.getItem(this.idKey);
    this.afAuth.auth.currentUser.delete();
    return this.afs.doc('users/' + id)
      .delete();
  }

  addUserPhoto(path: string, file: File): Promise<any> {
    return this.storage.upload('users/' + path, file).then(data => {
      return this.storage.ref(data.metadata.fullPath).getDownloadURL();
    });
  }

}
