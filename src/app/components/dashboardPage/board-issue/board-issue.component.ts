import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatTooltipDefaultOptions,
  MAT_TOOLTIP_DEFAULT_OPTIONS,
} from '@angular/material/tooltip';

import { IIssueItem } from 'src/app/models/issueModel';

import { AddNewIssueModalComponent } from '../add-new-issue-modal/add-new-issue-modal.component';

export const issueCardTooltipConfig: MatTooltipDefaultOptions = {
  showDelay: 700,
  hideDelay: 300,
  touchendHideDelay: 500,
};

@Component({
  selector: 'app-board-issue',
  templateUrl: './board-issue.component.html',
  styleUrls: ['./board-issue.component.scss'],
  providers: [
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: issueCardTooltipConfig },
  ],
})
export class BoardIssueComponent implements OnInit {
  constructor(private issueModalWindow: MatDialog) {}

  @Input() issueItem: IIssueItem;

  ngOnInit(): void {}

  editIssue() {
    const modalRef = this.issueModalWindow.open(AddNewIssueModalComponent, {
      data: {
        isEditModal: true,
        issueCard: this.issueItem,
      },
    });
  }
}
