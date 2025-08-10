import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DividierDiagonal } from './dividier-diagonal';

describe('DividierDiagonal', () => {
  let component: DividierDiagonal;
  let fixture: ComponentFixture<DividierDiagonal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DividierDiagonal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DividierDiagonal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
