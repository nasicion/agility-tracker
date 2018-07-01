import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GuideService } from '../guide.service';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.css']
})
export class GuideComponent implements OnInit {
  guides: any;
  showPagination:boolean = true;
  total: number;
  page: number = 1;
  limit: number = 10;

  constructor(
    private guideService: GuideService,
    private router: Router) { }

  ngOnInit() {
    this.updateList();
  }

  filterGuides(event) {
    var filter = event.target.value;
    if(filter) {
      this.showPagination = false;
      this.guideService.filterOwner(filter).subscribe( data => this.guides = data );
    } else {
      this.updateList();
      this.showPagination = true;
    }
  }

  updateList() {
    this.guideService.getGuides(this.page, this.limit)
      .subscribe( list => {
          this.guides = list.guides;
          this.total = list.total;
      });
  }

  guideSelection(id) {
    this.router.navigate(['/guide/', id]);
  }
}
