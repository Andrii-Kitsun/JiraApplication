import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    public auth: AngularFireAuth,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {}

  logout() {
    this.authService.logout();
  }
}
