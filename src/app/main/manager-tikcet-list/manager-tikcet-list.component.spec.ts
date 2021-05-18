import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerTikcetListComponent } from './manager-tikcet-list.component';

describe('ManagerTikcetListComponent', () => {
  let component: ManagerTikcetListComponent;
  let fixture: ComponentFixture<ManagerTikcetListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerTikcetListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerTikcetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
