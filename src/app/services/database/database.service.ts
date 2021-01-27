import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IIssueItem } from 'src/app/models/issueModel';
import { IUser } from 'src/app/models/userModel';

export interface IColumn {
  title: String;
  issues: Observable<IIssueItem[]>;
}

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private issueCollection: AngularFirestoreCollection<IIssueItem>;
  private items: Observable<IIssueItem[]>;
  private itemDoc: AngularFirestoreDocument<IIssueItem>;

  private userCollection: AngularFirestoreCollection<IUser>;
  private userDoc: AngularFirestoreDocument<IUser>;

  constructor(private afs: AngularFirestore) {
    this.issueCollection = afs.collection<IIssueItem>('issues');
    this.userCollection = afs.collection<IUser>('users');

    this.items = afs
      .collection('issues')
      .snapshotChanges()
      .pipe(
        map((changes) => {
          return changes.map((a) => {
            const data = a.payload.doc.data() as IIssueItem;
            data.id = a.payload.doc.id;
            return data;
          });
        })
      );
  }

  fetchData(): IColumn[] {
    let todoArr = this.items.pipe(
      map((data) => {
        return data.filter((item) => {
          return item.columnTitle === 'To Do';
        });
      })
    );

    let inProgressArr = this.items.pipe(
      map((data) => {
        return data.filter((item) => {
          return item.columnTitle === 'In Progress';
        });
      })
    );

    let reviewArr = this.items.pipe(
      map((data) => {
        return data.filter((item) => {
          return item.columnTitle === 'Review';
        });
      })
    );

    let doneArr = this.items.pipe(
      map((data) => {
        return data.filter((item) => {
          return item.columnTitle === 'Done';
        });
      })
    );

    return [
      { title: 'To Do', issues: todoArr },
      { title: 'In Progress', issues: inProgressArr },
      { title: 'Review', issues: reviewArr },
      { title: 'Done', issues: doneArr },
    ];
  }

  addIssue(item: IIssueItem) {
    this.issueCollection.add(item);
  }

  deleteIssue(issue: IIssueItem) {
    this.itemDoc = this.afs.doc(`issues/${issue.id}`);
    this.itemDoc.delete();
  }

  editIssue(issue: IIssueItem) {
    this.itemDoc = this.afs.doc(`issues/${issue.id}`);
    this.itemDoc.set(issue);
  }

  fetchUsers() {
    return this.userCollection.valueChanges();
  }

  createUser(user: IUser) {
    this.userDoc = this.afs.doc(`users/${user.id}`);
    this.userDoc.set(user);
  }
}
