import { Component, ChangeDetectorRef } from '@angular/core';
import { AuthService, User } from './providers/auth.service.ts.service';
import { Observable } from 'rxjs/Observable';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit() { 
    this.authService.loggedInUser.subscribe((user: User) => {
      this.loggedInUser = user;
      console.log(this.loggedInUser);
      this.cdRef.detectChanges();
    }, 
    error => console.log(error))
   }

  constructor(private authService: AuthService, private cdRef:ChangeDetectorRef){
  }
  loggedInUser: User;
  title = 'yoooo';
  currentState = "default";

  login(){
    this.authService.loginWithPopup();
  }

  logout(){
    this.authService.logout();
  }

  showLogin(){
    this.currentState = 'login'
    this.login();
  }
}

