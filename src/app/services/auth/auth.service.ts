import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { IUser } from '../../models/userModel';
import { DatabaseService } from '../../services/database/database.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLogged: boolean = JSON.parse(localStorage.isLogged || 'false');

  constructor(
    private auth: AngularFireAuth,
    private database: DatabaseService,
    private router: Router
  ) {}

  login() {
    return this.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((data) => {
        const userData = data.additionalUserInfo.profile as IUser;
        const user: IUser = {
          id: userData.id,
          name: userData.name,
        };

        localStorage.isLogged = true;
        this.database.createUser(user);
      })
      .then(() => {
        this.router.navigateByUrl('/dashboard');
      });
  }

  logout() {
    return this.auth.signOut().then(() => {
      this.router.navigateByUrl('/login');
      localStorage.isLogged = false;
    });
  }

  redirectTo(url: string): void {
    this.router.navigateByUrl(url);
  }
}
