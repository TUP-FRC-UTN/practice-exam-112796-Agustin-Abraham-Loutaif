/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OrdenesService } from './ordenes.service';

describe('Service: Ordenes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrdenesService]
    });
  });

  it('should ...', inject([OrdenesService], (service: OrdenesService) => {
    expect(service).toBeTruthy();
  }));
});
