import { TestBed } from '@angular/core/testing';

import { PenerimaService } from './penerima.service';

describe('PenerimaService', () => {
  let service: PenerimaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PenerimaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
