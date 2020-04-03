import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadDialogBoxComponent } from './upload-dialog-box.component';

describe('UploadDialogBoxComponent', () => {
  let component: UploadDialogBoxComponent;
  let fixture: ComponentFixture<UploadDialogBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadDialogBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
