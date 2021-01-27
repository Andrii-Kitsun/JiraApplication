import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { IUser } from '../../models/userModel';
import { DatabaseService } from '../../services/database/database.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: AngularFireAuth,
    private database: DatabaseService
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

        this.database.createUser(user);
      });
  }

  logout() {
    return this.auth.signOut();
  }
}
