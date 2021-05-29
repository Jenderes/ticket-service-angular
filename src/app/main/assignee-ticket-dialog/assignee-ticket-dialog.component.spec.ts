import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssigneeTicketDialogComponent } from './assignee-ticket-dialog.component';

describe('AssigneeTicketDialogComponent', () => {
  let component: AssigneeTicketDialogComponent;
  let fixture: ComponentFixture<AssigneeTicketDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssigneeTicketDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssigneeTicketDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
