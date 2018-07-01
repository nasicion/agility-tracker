import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable }     from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class GuideService {

  constructor(private http:HttpClient) { }

  filterOwner(filter:String):Observable<any> {
    return this.http.get('/api/guide/filter/' + filter);
  }

  get(id:string) {
    return this.http.get('/api/guide/' + id);
  }

  getGuides(page?:number, pageSize?:number):Observable<any> {
    var params = new HttpParams();

    if(page)
    params = params.set('page', page.toString());
    if(pageSize)
    params = params.set('pageSize', pageSize.toString());

    return this.http.get('/api/guide', {params: params});
  }
}
