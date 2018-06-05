import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-dog-detail',
  templateUrl: './dog-detail.component.html',
  styleUrls: ['./dog-detail.component.css']
})
export class DogDetailComponent implements OnInit {
  dog: any;
  breeds: any;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    // this.route.params.subscribe( params => console.log(params) );
   }

  ngOnInit() {

    this.dog = this.route.params.subscribe(params => {
      this.http.get('/api/dog/' + params['id']).subscribe(data => {
        this.dog = data;
      });
    });


    this.http.get('/api/breed').subscribe(data => {
      this.breeds = data;
    });
  }

}
