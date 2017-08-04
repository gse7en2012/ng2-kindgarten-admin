import { TestBed, inject } from '@angular/core/testing';

import { KgService } from './kg.service';

describe('KgService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KgService]
    });
  });

  it('should be created', inject([KgService], (service: KgService) => {
    expect(service).toBeTruthy();
  }));
});
