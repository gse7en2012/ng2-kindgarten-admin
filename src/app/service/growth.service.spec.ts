import { TestBed, inject } from '@angular/core/testing';

import { GrowthService } from './growth.service';

describe('GrowthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GrowthService]
    });
  });

  it('should be created', inject([GrowthService], (service: GrowthService) => {
    expect(service).toBeTruthy();
  }));
});
