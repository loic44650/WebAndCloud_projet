import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {adressBackEnd} from '../../app.component';
import {Message} from "../../models/Message/message.model";

@Injectable()
export class TwittsService{
  localurl: any;
  constructor(
    private http: Http
  ){
    this.localurl = adressBackEnd + 'messages';
  }

  addTwitts(twitt: Message)
  {
    return this.http.post('https://1-dot-webcloud-122127.appspot.com/_ah/api/messages/v1/messages',twitt);
  }

  getTwittsForMe(userId: any,nb:any)
  {
    return this.http.get('https://1-dot-webcloud-122127.appspot.com/_ah/api/messages/v1/messagesTimeline/'
      +userId.toString()+'?nbDeMessages='+nb.toString()+'&fields=items(message%2CuserId)');
  }

  getMoreTweets(userId:any,min:any,max:any){
      return this.http.get('https://1-dot-webcloud-122127.appspot.com/_ah/api/messages/v1/messagesTimeline/'
        +userId.toString()+'/min/'+min.toString()+'/max/'+max.toString()+'?fields=items(message%2CuserId)')
  }

}
