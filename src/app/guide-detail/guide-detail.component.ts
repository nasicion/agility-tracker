import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';

import { AbstractBaseFormComponent, alertAnimation } from "../abstractbaseform.component";
import { BackButtonComponent } from "../back-button/back-button.component";
import { GuideService } from "../guide.service";

@Component({
  selector: 'app-guide-detail',
  templateUrl: './guide-detail.component.html',
  styleUrls: ['./guide-detail.component.css'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class GuideDetailComponent extends AbstractBaseFormComponent implements OnInit {
  guide:any;

  constructor(
    private route: ActivatedRoute,
    private backButton: BackButtonComponent,
    private guideService: GuideService) {
    super()
  }

  ngOnInit() {
    this.guide = {};
    this.route.params.subscribe(params => {
      if(params['id'] != undefined) {
        this.guideService.get(params['id']).subscribe(guide => {this.guide = guide; this.guide.birthdate = new Date(this.guide.birthdate)}); // Temporary Fix, probably fixable by defining the Guide class
      }
    });
  }

}
