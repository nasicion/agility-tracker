import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dog',
  templateUrl: './dog.component.html',
  styleUrls: ['./dog.component.css']
})
export class DogComponent implements OnInit {
  breeds: any;
  dogs: any;

  constructor(private http: HttpClient, private router:Router) { }

  ngOnInit() {
    this.http.get('/api/dog').subscribe(data => {
      this.dogs = data;
    });
  }

  filterDogs(event) {
    var filter = event.srcElement.value;
    if(filter) {
      this.http.get('/api/dog/filter/'+filter).subscribe(data => {
        this.dogs = data;
      });
    }
  }

  dogSelection(id) {
    this.router.navigate(['/dog/', id]);
  }
}
