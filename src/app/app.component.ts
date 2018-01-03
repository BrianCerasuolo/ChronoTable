import { Component } from '@angular/core';
import { AuthService } from './providers/auth.service.ts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService: AuthService){

  }

  login(){
    this.authService.loginWithPopup();
  }
  title = 'yoooo';
  currentState = "default";

  showLogin(){
    this.currentState = 'login'
    this.login();
  }
}

