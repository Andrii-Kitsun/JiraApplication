import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatabaseService } from 'src/app/services/database/database.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { IIssueItem } from 'src/app/models/issueModel';
import { ISelect } from 'src/app/models/selectModel';
import { IUser } from 'src/app/models/userModel';

@Component({
  selector: 'app-add-new-issue-modal',
  templateUrl: './add-new-issue-modal.component.html',
  styleUrls: ['./add-new-issue-modal.component.scss'],
})
export class AddNewIssueModalComponent implements OnInit {
  users: Observable<IUser[]>;

  constructor(
    private database: DatabaseService,
    @Inject(MAT_DIALOG_DATA)
    public modalWindowData: {
      isEditModal: boolean;
      columnTitle: String;
      issueCard: IIssueItem;
    },
    private datePipe: DatePipe,
    private snackBar: MatSnackBar
  ) {
    this.users = this.database.fetchUsers();
  }

  issueStates: ISelect[] = [
    { id: 'To Do', viewValue: 'To Do' },
    { id: 'In Progress', viewValue: 'In Progress' },
    { id: 'Review', viewValue: 'Review' },
    { id: 'Done', viewValue: 'Done' },
  ];
  issueTypes: ISelect[] = [
    { id: 'epic', viewValue: 'Epic' },
    { id: 'userStory', viewValue: 'User Story' },
    { id: 'task', viewValue: 'Task' },
    { id: 'newFeature', viewValue: 'New Feature' },
    { id: 'bug', viewValue: 'Bug' },
  ];
  priorityArr: ISelect[] = [
    { id: 'critical', viewValue: 'Critical' },
    { id: 'major', viewValue: 'Major' },
    { id: 'minor', viewValue: 'Minor' },
    { id: 'trivial', viewValue: 'Trivial' },
  ];

  titleRequired = new FormControl('', [Validators.required]);

  // Default values for form fields
  issue: IIssueItem = {
    id: '',
    title: '',
    columnTitle: this.modalWindowData.columnTitle,
    type: 'task',
    assignee: null,
    priority: 'major',
    dueDate: '',
    description: '',
  };

  selectedDate: Date = new Date();

  ngOnInit(): void {
    if (this.modalWindowData.isEditModal) {
      this.issue = this.modalWindowData.issueCard;
    }
  }

  getErrorMessage(): String {
    if (this.titleRequired.hasError('required')) {
      return 'You must enter a value';
    }

    return '';
  }

  selectUser(selectedUser: IUser): void {
    this.issue.assignee = selectedUser;
  }

  createIssue(): void {
    if (!this.issue.title) {
      const issueTypeObj = this.issueTypes.find(
        (type) => type.id === this.issue.type
      );
      this.issue.title = `New ${issueTypeObj.viewValue}`;
    }

    if (!this.issue.assignee) {
      this.issue.assignee = {
        id: '0',
        name: 'None',
      };
    }

    this.issue.dueDate = this.datePipe.transform(
      new Date(this.selectedDate),
      'yyyy-MM-dd'
    );

    this.database.addIssue(this.issue);
    this.openSnackBar('added');
  }

  deleteIssue(): void {
    this.database.deleteIssue(this.issue);
    this.openSnackBar('deleted');
  }

  editIssue(): void {
    this.database.editIssue(this.issue);
    this.openSnackBar('edited');
  }

  openSnackBar(textAction: String) {
    this.snackBar.open(`The issue ${textAction} successfully`, 'Done', {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }
}
