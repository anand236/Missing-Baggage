import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(public http: HttpClient) { }

  getOrigin():Observable<any>{
    return this.http.get('../../assets/origin-mock.json')
  }

  getDestination():Observable<any>{
    return this.http.get('../../assets/destination-mock.json')
  }
}
