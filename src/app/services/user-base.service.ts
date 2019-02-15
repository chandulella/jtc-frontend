import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, RequestOptions } from '@angular/http';
import { map, catchError } from "rxjs/operators";
import {throwError} from 'rxjs';
import { ApiServiceService } from './api.service';

@Injectable()
export class UserBaseService extends ApiServiceService {
  cookie: string;
  storage: any;
  public eventEmitter = new EventEmitter();
  constructor(public http: Http) {
    super();
   
   }

  getEmitter(){
    return this.eventEmitter;
  }
  createPost(data :any): Observable<any>{
    return this.http.post('http://jtc-backend1.herokuapp.com/api/v1/createPost',data,this.post())
    .pipe(map(res => res.json()),catchError(err=>  throwError(err)))
  }
  getPosts(): Observable<any>{
    return this.http.get('http://jtc-backend1.herokuapp.com/api/v1/getPosts',this.get()).pipe(map(res => res.json()),catchError(err=>  throwError(err)))
  }
  updatePost(data :any,value): Observable<any>{
    return this.http.post('http://jtc-backend1.herokuapp.com/api/v1/updatePost',{post_id:data,like:value},this.post()).pipe(map(res => res.json()),catchError(err=>  throwError(err)))
  }
}
