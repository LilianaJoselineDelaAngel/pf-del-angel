import { TestBed } from '@angular/core/testing';

import { AlumnoListaService } from './alumno-lista.service';

describe('AlumnoListaService', () => {
  let service: AlumnoListaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlumnoListaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
