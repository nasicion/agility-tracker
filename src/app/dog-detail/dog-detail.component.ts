import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { BackButtonComponent } from "../back-button/back-button.component";
import { OwnerService } from "../owner.service";
import { DogService } from "../dog.service";


@Component({
  selector: 'app-dog-detail',
  templateUrl: './dog-detail.component.html',
  styleUrls: ['./dog-detail.component.css']
})
export class DogDetailComponent implements OnInit {
  dog: any;
  breeds: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private backButton: BackButtonComponent,
    private dogService: DogService,
    private ownerService: OwnerService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if(params['id'] != undefined) {
        this.dogService.getDogById(params['id']).subscribe(dog => this.dog = dog);
      } else {
        this.dog = {};
      }
    });
    this.http.get('/api/breed').subscribe(data => {
      this.breeds = data;
    });
  }

  update() {
    this.dog.owner = this.dog.owner.firstname + ' ' + this.dog.owner.lastname;
    this.dogService.update(this.dog).subscribe();
  }

  ownerFormatter = (value: any) => {console.log('value ' + value)};

  parseOwnerSearch = (value: any) => {
    if(value.firstname) {
        return value.firstname + ' ' + value.lastname
    } else if(value) {
      return value;
    } else {
      '';
    }
  };
  //https://stackoverflow.com/questions/41814182/extract-data-from-json-for-ng-bootstrap-typeahead
  //https://ng-bootstrap.github.io/#/components/typeahead/examples
  //https://codecraft.tv/courses/angular/http/http-with-observables/
  searchOwner = (text$: Observable<any>) =>
      text$
        .debounceTime(500)
        .distinctUntilChanged()
    .switchMap(term => term.length < 4 ? [] : this.ownerService.filterOwner(term));
}
