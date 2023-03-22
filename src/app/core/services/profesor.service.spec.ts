import { TestBed } from '@angular/core/testing';

import { ProfesorService } from './profesor.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProfesorService', () => {
  let service: ProfesorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfesorService);
    providers: [HttpClientTestingModule];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
