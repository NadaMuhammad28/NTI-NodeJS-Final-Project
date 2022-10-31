import { TestBed } from '@angular/core/testing';

import { ConfirmorderGuard } from './confirmorder.guard';

describe('ConfirmorderGuard', () => {
  let guard: ConfirmorderGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ConfirmorderGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
