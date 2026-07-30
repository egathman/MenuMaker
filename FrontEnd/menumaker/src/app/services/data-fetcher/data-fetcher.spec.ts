import { TestBed } from '@angular/core/testing';

import { DataFetcher } from './data-fetcher';

describe('DataFetcher', () => {
  let service: DataFetcher;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataFetcher);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
