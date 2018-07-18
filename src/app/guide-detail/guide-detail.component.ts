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
  guide: any;
  picture: File;
  file: any;

  constructor(
    private route: ActivatedRoute,
    private backButton: BackButtonComponent,
    private guideService: GuideService) {
    super()
  }

  ngOnInit() {
    this.guide = {};
    this.picture = new File(["0"], "none", {type: "text/plain"});
    this.route.params.subscribe(params => {
      if(params['id'] != undefined) {
        this.guideService.get(params['id']).subscribe(guide => {this.guide = guide; this.guide.birthdate = new Date(this.guide.birthdate)}); // Temporary Fix, probably fixable by defining the Guide class
      }
    });
  }

  save() {
    this.guideService.save(this.guide).subscribe(data => {
      this.guide._id = data._id;
      this.guideService.updatePicture(data._id, this.picture).subscribe();
    });
  }

  update() {
    this.guideService.update(this.guide).subscribe(data => {
      if(this.picture)
        this.guideService.updatePicture(data._id, this.picture).subscribe(response => {
          console.log('Update Picture Response');
          console.log(response);
        });
    });
  }

  pictureChanged(event) {
    this.picture = <File> event.originalTarget.files[0];
  }
}
