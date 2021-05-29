import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketListWithoutUserassigneeComponent } from './ticket-list-without-userassignee.component';

describe('TicketListWithoutUserassigneeComponent', () => {
  let component: TicketListWithoutUserassigneeComponent;
  let fixture: ComponentFixture<TicketListWithoutUserassigneeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketListWithoutUserassigneeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketListWithoutUserassigneeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
