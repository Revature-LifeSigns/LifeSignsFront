import { TestBed } from '@angular/core/testing';

import { DoctorService } from './doctor.service';

describe('DoctorService', () => {
  let service: DoctorService;
  let mockStream: jasmine.SpyObj<DoctorService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DoctorService]
    });
    service = TestBed.inject(DoctorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
