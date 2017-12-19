import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {adressBackEnd} from '../../app.component';

@Injectable()
export class TwittsService{
  localurl: any;
  constructor(
    private http: Http
  ){
    this.localurl = adressBackEnd + 'messages/';
  }

  addTwitts(twitt: any)
  {
    return this.http.post(this.localurl, JSON.parse(twitt));
  }

  getTwittsForMe(userId: any )
  {
    let localurl = this.localurl + 'v1/messagesIndex/userID?userID=';
    localurl += userId;
    return this.http.get(localurl);
  }
}
