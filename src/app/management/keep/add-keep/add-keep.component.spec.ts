import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddKeepComponent } from './add-keep.component';

describe('AddKeepComponent', () => {
  let component: AddKeepComponent;
  let fixture: ComponentFixture<AddKeepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddKeepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddKeepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
