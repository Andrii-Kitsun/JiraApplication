import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  constructor(
    private authService: AuthService,
    public auth: AngularFireAuth,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login() {
    this.authService.login().then(() => {
      this.router.navigate(['dashboard']);
    });
  }
}
