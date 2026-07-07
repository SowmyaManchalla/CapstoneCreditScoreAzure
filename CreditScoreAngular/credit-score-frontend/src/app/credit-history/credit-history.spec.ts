import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditHistoryComponent } from './credit-history';

describe('CreditHistoryComponent', () => {
  let component: CreditHistoryComponent;
  let fixture: ComponentFixture<CreditHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditHistoryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreditHistoryComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
