import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerTicketListComponent } from './manager-ticket-list.component';

describe('ManagerTikcetListComponent', () => {
  let component: ManagerTicketListComponent;
  let fixture: ComponentFixture<ManagerTicketListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerTicketListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerTicketListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
