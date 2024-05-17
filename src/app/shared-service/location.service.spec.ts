import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LocationService } from './location.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('LocationService', () => {
  let service: LocationService;
  let mockHttpClient : jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[LocationService]
    });
    service = TestBed.inject(LocationService);
    mockHttpClient = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should cal getorigin api", ()=>{
    const response = {data:['HYD', "MAA"]};
    mockHttpClient.get.and.returnValue(of(response));

    service.getOrigin().subscribe(item => {
      expect(item).toEqual(response);
    })
  });

  it("should cal getdestination api", ()=>{
    const response = {data:['DEL', "UP"]};
    mockHttpClient.get.and.returnValue(of(response));

    service.getDestination().subscribe(item => {
      expect(response).toEqual(response);
    })
  });


});
