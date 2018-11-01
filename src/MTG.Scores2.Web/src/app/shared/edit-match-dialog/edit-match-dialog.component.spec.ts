import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMatchDialogComponent } from './edit-match-dialog.component';

describe('EditMatchDialogComponent', () => {
  let component: EditMatchDialogComponent;
  let fixture: ComponentFixture<EditMatchDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMatchDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMatchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
