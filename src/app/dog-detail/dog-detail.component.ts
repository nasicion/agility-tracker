import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

import { BackButtonComponent } from "../back-button/back-button.component";
import { OwnerService } from "../owner.service";

@Component({
  selector: 'app-dog-detail',
  templateUrl: './dog-detail.component.html',
  styleUrls: ['./dog-detail.component.css']
})
export class DogDetailComponent implements OnInit {
  dog: any;
  breeds: any;

  constructor(private http: HttpClient, private route: ActivatedRoute, private backButton:BackButtonComponent, private ownerService:OwnerService) {
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

//https://stackoverflow.com/questions/41814182/extract-data-from-json-for-ng-bootstrap-typeahead
//https://ng-bootstrap.github.io/#/components/typeahead/examples
//https://codecraft.tv/courses/angular/http/http-with-observables/
  searchOwner = [];
  // (text$: Observable<string>) =>
  //   text$.pipe(
  //     debounceTime(200),
  //     distinctUntilChanged(),
  //     map(term => term.length < 2 ? []
  //       : [])
  //   );
}
