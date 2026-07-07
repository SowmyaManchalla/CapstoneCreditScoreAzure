import { TestBed } from '@angular/core/testing';

import { CreditHistory } from './credit-history';

describe('CreditHistory', () => {
  let service: CreditHistory;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditHistory);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
