import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketInformationDialogComponent } from './ticket-information-dialog.component';

describe('TicketInformationDialogComponent', () => {
  let component: TicketInformationDialogComponent;
  let fixture: ComponentFixture<TicketInformationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketInformationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketInformationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
