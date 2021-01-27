import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewIssueModalComponent } from './add-new-issue-modal.component';

describe('AddNewIssueModalComponent', () => {
  let component: AddNewIssueModalComponent;
  let fixture: ComponentFixture<AddNewIssueModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewIssueModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewIssueModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
