import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailKeepComponent } from './detail-keep.component';

describe('DetailKeepComponent', () => {
  let component: DetailKeepComponent;
  let fixture: ComponentFixture<DetailKeepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailKeepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailKeepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
