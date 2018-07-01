import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";
import { NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { AbstractBaseFormComponent, alertAnimation } from "../abstractbaseform.component";
import { BackButtonComponent } from "../back-button/back-button.component";
import { GuideService } from "../guide.service";
import { DogService } from "../dog.service";

@Component({
  selector: 'app-dog-detail',
  templateUrl: './dog-detail.component.html',
  styleUrls: ['./dog-detail.component.css'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}],
  animations: [
    alertAnimation
  ]
})
export class DogDetailComponent extends AbstractBaseFormComponent implements OnInit  {
  dog: any;
  breeds: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private backButton: BackButtonComponent,
    private dogService: DogService,
    private guideService: GuideService) {
      super();
  }

  ngOnInit() {
    this.dog = {};
    this.route.params.subscribe(params => {
      if(params['id'] != undefined) {
        this.dogService.getDogById(params['id']).subscribe(dog => {this.dog = dog; this.dog.birthdate = new Date(this.dog.birthdate)}); // Temporary Fix, probably fixable by defining the Dog class
      }
    });
    this.http.get('/api/breed').subscribe(data => {
      this.breeds = data;
    });
  }

  update() {
    this.dog.owner = this.ownerFormatter(this.dog.owner);
    this.dogService.update(this.dog).subscribe(response => {
      this.buttonDisabled = true;
      this.showAlert("Dog updated succesfuly", "success")
      //console.log('response ' + JSON.stringify(response));
    },
    error => {
      this.showAlert(error.error.message, "danger")
      console.log('error ' + JSON.stringify(error));
    });
  }

  save() {
    this.dog.owner = this.ownerFormatter(this.dog.owner);
    this.dogService.save(this.dog).subscribe();
  }

  ownerFormatter = (value: any) => {
    if(value.firstname) {
      return value.firstname + ' ' + value.lastname
    } else {
      return value;
    }
  };

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
    .switchMap(term => term.length < 4 ? [] : this.guideService.filterOwner(term));
}
