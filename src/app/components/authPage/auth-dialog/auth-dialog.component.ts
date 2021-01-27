import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss'],
})
export class AuthDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<AuthDialogComponent>,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  login(): void {
    this.auth.login();
    // this.closeDialog();
    // this.router.navigate(['dashboard']);
  }
}
