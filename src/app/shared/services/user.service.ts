import {Injectable} from '@angular/core';
import {
  AngularFirestore,
} from 'angularfire2/firestore';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireStorage, AngularFireUploadTask} from 'angularfire2/storage';
import {Observable} from 'rxjs';
import {noUndefined} from '@angular/compiler/src/util';


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
    //   this.afAuth.auth.currentUser.updateEmail(user.email).then(() => {
    //   });
    // }
    return this.afs.doc('users/' + id)
      .update(user);
  }

  deleteUser(): Promise<any> {
    // TODO borrar imagen del user (esta con el id del user)
    const id = window.localStorage.getItem(this.idKey);
    return this.afs.doc('users/' + id)
      .delete();
  }

  addUserPhoto(path: string, file: File): Promise<any> {
    const id = window.localStorage.getItem(this.idKey);
    return this.storage.upload('users/' + id, file).then(data => {
      return this.storage.ref(data.metadata.fullPath).getDownloadURL();
    });
  }

}
