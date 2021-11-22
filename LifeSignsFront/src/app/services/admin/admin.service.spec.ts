
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Unit } from '../util/unit';

import { AdminService } from './admin.service';

describe('AdminService', () => {
  let service: AdminService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[AdminService]
    });
    service = TestBed.inject(AdminService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have getAllUsers() return response', () => {
    service.getAllUsers().subscribe(response => {
      expect(response.length).toBeGreaterThan(1);
    });
    const req = httpMock.expectOne("http://localhost:9025/LifeSigns/user");
    expect(req.request.method).toBe("GET");
  });

  it('should have getAllUnits() return response', () => {
    service.getAllUnits().subscribe(response => {
      expect(response.length).toBeGreaterThan(1);
    });
    const req = httpMock.expectOne("http://localhost:9025/LifeSigns/admin/units");
    expect(req.request.method).toBe("GET");
  });

  it('should have getUnit() return response', () => {
    service.getUnit(1).subscribe(response => {
      expect(response).toBeTruthy();
    });
    const req = httpMock.expectOne("http://localhost:9025/LifeSigns/admin/assigned-unit/1");
    expect(req.request.method).toBe("GET");
  });

  it('should have insertOrUpdateUnitAssignment() return response', () => {
    service.insertOrUpdateUnitAssignment(1, new Unit('', 1)).subscribe(response => {
      expect(response).toBeTruthy();
    });
    const req = httpMock.expectOne("http://localhost:9025/LifeSigns/admin/assign-units/1");
    expect(req.request.method).toBe("POST");
  });
});
