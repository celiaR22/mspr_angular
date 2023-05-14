import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeepComponent } from './keep.component';

describe('KeepComponent', () => {
  let component: KeepComponent;
  let fixture: ComponentFixture<KeepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
