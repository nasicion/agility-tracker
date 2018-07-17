import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable }     from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class GuideService {

  constructor(private http:HttpClient) { }

  /**
  * Filters the guides by firstname and lastname
  */
  filterOwner(filter:String):Observable<any> {
    return this.http.get('/api/guide/filter/' + filter);
  }

  /**
  * Retrieves the guide by its ObjectId
  */
  get(id:string) {
    return this.http.get('/api/guide/' + id);
  }

  /**
  * Retrieves all the guides, allows pagination
  */
  getGuides(page?:number, pageSize?:number):Observable<any> {
    var params = new HttpParams();

    if(page)
      params = params.set('page', page.toString());
    if(pageSize)
      params = params.set('pageSize', pageSize.toString());

    return this.http.get('/api/guide', {params: params});
  }

  save(guide):Observable<any> {
    return this.http.post('/api/guide', guide, );
  }

  updatePicture(id, picture) {
    console.log(id);
    console.log(picture);
    return this.http.post('/api/guide/' + id + '/picture', picture);
  }

  update():Observable<any> {
    return null;
  }
}
