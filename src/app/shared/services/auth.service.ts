import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {
  AngularFirestore,
} from 'angularfire2/firestore';


@Injectable()
export class AuthService {
  tokenKey = 'token';
  idKey = 'id';
  currentUser = null;

  constructor(private http: HttpClient, private router: Router, private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    afAuth.authState.subscribe(userData => {
      if (userData !== null) {
        this.afs.doc('users/' + userData.uid).valueChanges().subscribe(user => {
          this.setId(userData.uid);
          this.currentUser = user;
        });
      }
    });
  }

  public isLoggedIn() {
    return this.getId() !== null;
  }

  public isAdmin() {
    if (this.currentUser !== null) {
      return this.currentUser.admin;
    } else {
      return false;
    }
  }

  createUserWithEmailAndPassword(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(data => {
      this.afs.collection('users').doc(data.user.uid).set({
        email: data.user.email,
        admin: false
      }).then(() => {
        console.log('se guardo el usuario en la base');
      });
    });
  }

  signInWithEmailAndPassword(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signOut() {
    this.removeId();
    this.afAuth.auth.signOut();
  }

  public setId(id) {
    return window.localStorage.setItem(this.idKey, id);
  }

  public getId() {
    return window.localStorage.getItem(this.idKey);
  }

  public removeId() {
    return window.localStorage.removeItem(this.idKey);
  }

  // public login(credentials: any): Promise<any> {
  //   return this.http.post<any>('http://localhost:9000/session', credentials).toPromise();
  // }

  // public logOut() {
  //   this.removeToken();
  //   this.removeId();
  //   this.router.navigate(['/']);
  // }
  //
  // public getToken() {
  //   return window.localStorage.getItem(this.tokenKey);
  // }
  //
  // public setToken(token) {
  //   return window.localStorage.setItem(this.tokenKey, token);
  // }
  //
  // public removeToken() {
  //   return window.localStorage.removeItem(this.tokenKey);
  // }
  //

}
