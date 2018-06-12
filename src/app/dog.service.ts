import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DogService {

  constructor(private http:HttpClient) { }

  getDogById(id:string) {
    return this.http.get('/api/dog/' + id);
  }

  save(dog) {
    return this.http.post('/api/dog', dog);
  }

  update(dog) {
    return this.http.put('/api/dog/' + dog._id, dog);
  }
}
