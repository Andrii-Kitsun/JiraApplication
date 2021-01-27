import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public auth: AngularFireAuth,
  ) {
    if (authService.isLogged) {
      authService.redirectTo('/dashboard');
    }
  }

  ngOnInit(): void {}

  login() {
    this.authService.login();
  }
}
