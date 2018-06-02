import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dog',
  templateUrl: './dog.component.html',
  styleUrls: ['./dog.component.css']
})
export class DogComponent implements OnInit {
  breeds: any;
  dogs: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('/api/breeds').subscribe(data => {
      console.log('breeds: ' + data);
      this.breeds = data;
 });
  }
}
