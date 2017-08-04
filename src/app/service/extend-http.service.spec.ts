import { TestBed, inject } from '@angular/core/testing';

import { ExtendedHttpService } from './extend-http.service';

describe('ExtendHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExtendedHttpService]
    });
  });

  it('should be created', inject([ExtendedHttpService], (service: ExtendedHttpService) => {
    expect(service).toBeTruthy();
  }));
});
