import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable }     from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  constructor(private http:HttpClient) { }

  filterOwner(filter:String):Observable<any> {
    return this.http.get('/api/owner/filter/' + filter);
  }

  private extractData(res: Response) {
    console.log(res);
    let body = res.json();
    return body || { };
  }
}
