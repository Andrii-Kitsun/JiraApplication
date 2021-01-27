import { Component, OnInit } from '@angular/core';

import {
  DatabaseService,
  IColumn,
} from 'src/app/services/database/database.service';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.scss'],
})
export class IssueListComponent implements OnInit {
  board: IColumn[];

  constructor(private database: DatabaseService) {
    this.board = database.fetchData();
  }

  ngOnInit(): void {}
}
