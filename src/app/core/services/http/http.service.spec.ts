import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { HttpService } from './http.service';
import { DemoClass, ApiMethod } from './const';
import { environment } from '@env';
import { stringify } from 'querystring';

describe('HttpService', () => {
  let service: HttpService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpService],
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.inject(HttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#requestCall', () => {
    const mock = new DemoClass(1, "test");

    it('should request a GET call and should return valid response', () => {
      service.requestCall<DemoClass>('test', ApiMethod.GET, 1).subscribe(response => {
        expect(response).toBeInstanceOf(DemoClass);
        expect(response.id).toBe(mock.id);
        expect(response.text).toEqual(mock.text);
      });

      const request = httpTestingController.expectOne(`${environment.baseDomain}/test/1`);
      expect(request.request.method).toEqual(ApiMethod[ApiMethod.GET]);

      request.flush(mock);
    });

    it('should request a POST call and should return valid response', () => {
      service.requestCall<DemoClass>('test', ApiMethod.POST, 1).subscribe(response => {
        expect(response).toBeInstanceOf(DemoClass);
        expect(response.id).toBe(mock.id);
        expect(response.text).toEqual(mock.text);
      });
      
      const request = httpTestingController.expectOne(`${environment.baseDomain}/test`);
      expect(request.request.method).toEqual(ApiMethod[ApiMethod.POST]);
    });

    it('should request a PUT call', () => {
      service.requestCall<DemoClass>('test', ApiMethod.PUT, 1).subscribe(response => {
        expect(response).toBeInstanceOf(DemoClass);
        expect(response.id).toBe(mock.id);
        expect(response.text).toEqual(mock.text);
      });
      
      const request = httpTestingController.expectOne(`${environment.baseDomain}/test`);
      expect(request.request.method).toEqual(ApiMethod[ApiMethod.PUT]);
    });

    it('should request a DELETE call', () => {
      service.requestCall<DemoClass>('test', ApiMethod.DELETE, 1).subscribe(response => {
        expect(response).toBeInstanceOf(DemoClass);
        expect(response.id).toBe(mock.id);
        expect(response.text).toEqual(mock.text);
      });
      
      const request = httpTestingController.expectOne(`${environment.baseDomain}/test`);
      expect(request.request.method).toEqual(ApiMethod[ApiMethod.DELETE]);
    });
  })
});
