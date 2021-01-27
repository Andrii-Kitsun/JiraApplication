import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IIssueItem } from 'src/app/models/issueModel';
import { IColumn } from 'src/app/services/database/database.service';
import { AddNewIssueModalComponent } from '../add-new-issue-modal/add-new-issue-modal.component';

@Component({
  selector: 'app-board-column',
  templateUrl: './board-column.component.html',
  styleUrls: ['./board-column.component.scss'],
})
export class BoardColumnComponent implements OnInit {
  constructor(private issueModalWindow: MatDialog) {}

  ngOnInit(): void {}

  @Input() columnData: IColumn;

  openDialog(): void {
    const dialogRef = this.issueModalWindow.open(AddNewIssueModalComponent, {
      data: {
        isEditModal: false,
        columnTitle: this.columnData.title,
      },
    });
  }
}
