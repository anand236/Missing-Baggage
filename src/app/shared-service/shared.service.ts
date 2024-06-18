import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {JsonData} from './constants'
@Injectable({
  providedIn: 'root'
})

export class SharedService {

  constructor(
    private http: HttpClient
  ) { }

  getData(): Observable<JsonData[]> {
    return this.http.get<JsonData[]>('https://jsonplaceholder.typicode.com/posts')
  }
}
