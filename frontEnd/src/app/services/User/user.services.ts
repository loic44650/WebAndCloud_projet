
import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {User} from "../../models/User/user.model";

export class follow{
  followToAdd :any;
}
@Injectable()
export class UserService{

  constructor(
    private http :Http
  ){

  }

  getListUsers(){
      return this.http.get('https://1-dot-webcloud-122127.appspot.com/_ah/api/users/v1/users');
  }

  createUser(name:any){
    let us = new User();
    us.name = name;
    return this.http.post('https://1-dot-webcloud-122127.appspot.com/_ah/api/users/v1/users',us);
  }

  addFollower(myUserId:any,otherUserId:any){
    let us = new follow();
    us.followToAdd = otherUserId;
    return this.http.post('https://1-dot-webcloud-122127.appspot.com/_ah/api/users/v1/users/'+myUserId.toString()
      +'/addFollower?aSuivre='+otherUserId.toString(),us);
  }

  //genereFollower
}

