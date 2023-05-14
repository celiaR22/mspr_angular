import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardKeepComponent } from './card-keep.component';

describe('CardKeepComponent', () => {
  let component: CardKeepComponent;
  let fixture: ComponentFixture<CardKeepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardKeepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardKeepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
