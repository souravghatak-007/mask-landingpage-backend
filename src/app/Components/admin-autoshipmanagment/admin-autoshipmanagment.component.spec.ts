import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAutoshipmanagmentComponent } from './admin-autoshipmanagment.component';

describe('AdminAutoshipmanagmentComponent', () => {
  let component: AdminAutoshipmanagmentComponent;
  let fixture: ComponentFixture<AdminAutoshipmanagmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAutoshipmanagmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAutoshipmanagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
