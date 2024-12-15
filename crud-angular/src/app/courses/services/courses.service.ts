import { Injectable } from '@angular/core';

import { Course } from '../model/course';
import { HttpClient } from '@angular/common/http';
import { first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private httpClient: HttpClient) { }

  private readonly API = 'api/courses';

  list() {
    return this.httpClient.get<Course[]>(this.API)
    .pipe(
      first(),
    );
  }

  loadById(id: string){
     return this.httpClient.get<Course>(`${this.API}/${id}`)
  }

  save(record: Partial<Course>){
    if(record._id){
      console.log('update');
      return this.update(record);
    }
    return this.create(record);
  }

  private create(record: Partial<Course>){
    return this.httpClient.post<Course>(this.API, record).pipe(first());
  }

  private update(record: Partial<Course>){
    return this.httpClient.put<Course>(`${this.API}/${record._id}`, record).pipe(first());
  }

  remove(id: string){
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
  }
}
