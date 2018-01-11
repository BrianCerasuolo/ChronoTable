import { Injectable } from '@angular/core';
import { AngularFireAuth} from 'angularfire2/auth';
import { firebase } from '@firebase/app';
import { Observable } from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { AngularFirestore } from 'angularfire2/firestore';
import {Moment} from 'moment/moment';

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

  constructor(public af: AngularFireAuth, public afs: AngularFirestore) {
    this.af.authState.subscribe((auth) => {
      console.log("this is auth: ", auth);
    })
   }

  loginWithPopup() {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('email');
    provider.addScope('profile');

     this.af.auth.signInWithPopup(provider).then((result) => this.assignUser(result));
  }

  loginWithEmail(email){

  }
  
  assignUser(userResult){

    this.afs.doc(`users/${userResult.user.uid}`).ref.get().then((user) => {
      if (!user.exists) {
        this.afs.collection('users').doc(userResult.user.uid)
          .set({createdAt: new Date().toISOString() })
            .then(() =>{ 
                var user = new User();
                user.uid = userResult.user.uid;
                user.email = userResult.user.email;
                user.photoURL = userResult.user.photoURL;
                user.displayName = userResult.user.displayName;

                this._loggedInUser.next(Object.assign({}, user));
            });
        } 
    }).catch(function(error) {
        console.log("Error getting document:", error);
    })
  };  

  logout() {
    this.af.auth.signOut();
    this._loggedInUser.next(null);
  }
}