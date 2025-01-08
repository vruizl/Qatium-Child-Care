import { TestBed } from '@angular/core/testing';

import { ChildCareService } from './child-care.service';

describe('ChildCareService', () => {
  let service: ChildCareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChildCareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
