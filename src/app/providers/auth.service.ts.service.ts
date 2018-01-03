import { Injectable } from '@angular/core';
import { AngularFireAuth} from 'angularfire2/auth';
import { firebase } from '@firebase/app';
import { Observable } from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

// interface User {

// }

export class User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
}

@Injectable()
export class AuthService {

  private _loggedInUser: BehaviorSubject<User> = new BehaviorSubject(null);
  
  public readonly loggedInUser: Observable<User> = this._loggedInUser.asObservable();

  constructor(public af: AngularFireAuth) {
    this.af.authState.subscribe((auth) => {
      console.log("this is auth: ", auth);
    })
   }

  loginWithPopup() {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('email');
    provider.addScope('profile');

     this.af.auth.signInWithPopup(provider).then((result) => this.assignUser(result));
    //this.assignUser({uid:"hi", user: {email: "yo", photoURL: "sup", displayName: "name"}});
  }

  loginWithEmail(email){

  }
  assignUser(userResult){
    var user = new User();
    user.uid = userResult.uid;
    user.email = userResult.user.email;
    user.photoURL = userResult.user.photoURL;
    user.displayName = userResult.user.displayName;

    this._loggedInUser.next(Object.assign({}, user));
  }

  logout() {
    this.af.auth.signOut();
    this._loggedInUser.next(null);
  }
}