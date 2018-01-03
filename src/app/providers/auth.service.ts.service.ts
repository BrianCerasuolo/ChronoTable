import { Injectable } from '@angular/core';
import { AngularFireAuth} from 'angularfire2/auth';
import { firebase } from '@firebase/app';
import { Observable } from 'rxjs/Observable';
interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
}

@Injectable()
export class AuthService {

  user: User;

  constructor(public af: AngularFireAuth) { }
  loginWithPopup() {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('email');
    provider.addScope('profile');

    this.af.auth.signInWithPopup(provider).then(function(result){
      this.user.uid = result.user.uid;
      this.user.email = result.user.email;
      this.user.photoURL = result.user.photoURL;
      this.user.displayName = result.user.displayName; 
    });
  }

  loginWithEmail(email){

  }

  logout() {
    //return this.af.auth.logout();
  }
}