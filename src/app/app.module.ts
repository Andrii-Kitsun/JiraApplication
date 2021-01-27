import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { MaterialModule } from './modules/material/material.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BoardColumnComponent } from './components/dashboardPage/board-column/board-column.component';
import { BoardIssueComponent } from './components/dashboardPage/board-issue/board-issue.component';
import { AddNewIssueModalComponent } from './components/dashboardPage/add-new-issue-modal/add-new-issue-modal.component';
import { FooterComponent } from './components/footer/footer.component';
import { IssueListComponent } from './components/dashboardPage/issue-list/issue-list.component';
import { AuthComponent } from './components/authPage/auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BoardColumnComponent,
    BoardIssueComponent,
    AddNewIssueModalComponent,
    FooterComponent,
    IssueListComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
