import { TestBed } from '@angular/core/testing';

import { CreditScore } from './credit-score';

describe('CreditScore', () => {
  let service: CreditScore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditScore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
