import { TestBed } from '@angular/core/testing';
import { HttpService } from './http-service.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('HttpServiceService', () => {
  let service: HttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[HttpClient,HttpHandler]
    });
    service = TestBed.inject(HttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
