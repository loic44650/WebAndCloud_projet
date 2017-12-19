/**
 * Created by demna on 18/05/17.
 */
import {Injectable} from '@angular/core'
import {Http,RequestOptions,Headers} from '@angular/http'
import {adressBackEnd} from "../../app.component";
import {Password} from "../../models/Password/password.model";

@Injectable()
export class PasswordService{
    constructor(
        private http:Http
    ){

    }

    postMail(model:any){
        return this.http.post(adressBackEnd+"/users/forgotPassword",model);
    }

    postChangePassord(key:any,model:any){
        return this.http.post(adressBackEnd+"/users/forgotPassword/"+key,model);
    }

    modifPassword(pwd:Password){
      let currentUser = JSON.parse(localStorage.getItem('currentUser'));
      let user = JSON.parse(localStorage.getItem('user'));
      let headers = new Headers({'X-Auth-Token': currentUser.token, "Access-Control-Allow-Origin": "*"});
      let options = new RequestOptions({headers: headers});
      return this.http.post(adressBackEnd+"/users/changePassword",pwd,options);
    }
}
