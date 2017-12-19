/**
 * Created by danielahmed on 15/04/2017.
 */
import {Injectable} from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';
import { UserService } from '../User/user.services'
import { HeaderComponent } from '../../components/header/header.component';
import 'rxjs/add/operator/map';
import {adressBackEnd} from "../../app.component";
import {Router} from "@angular/router";


@Injectable()
export class AuthenticationService {
    public token : string;
    public model :any;
    constructor(
        private router :Router,
        private http : Http,
        private userServ:UserService,

    ){
      this.model = {email : 'admin@tinytwitt.fr', pass : 'toto'};

    }

  /*  login(username : string, password : string): Observable <boolean> {
        let headers = new Headers({ "Access-Control-Allow-Origin": "*" });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(adressBackEnd+"/auth-tokens", { login:username, password:password },options).map(
            (response : Response) => {
                let token = response.json() && response.json().token;
                let id = response.json() && response.json().id;
                let refreshToken = response.json() && response.json().refreshToken;
                let expiresIn = response.json() && response.json().expiresIn;
                let createdAt = response.json() && response.json().createdAt;
                if(token){
                    this.token = token;
                    localStorage.setItem('currentUser', JSON.stringify({ username: username,token: token,refreshToken : refreshToken, id : id,expiresIn : expiresIn,createdAt:createdAt}));
                    this.userServ.getCurrentUser().subscribe(
                        complete => localStorage.setItem('user',JSON.stringify(complete.json()))
                    );
                    return true;
                } else {
                    return false;
                }
            }
        );
    }
*/
    loginLocal(username : string, password : string): Boolean
    {
      console.log(this.model);
      console.log(username);
      console.log(password);
      if (username = this.model.email){
          console.log('fuck');
          if (password = this.model.pass) {
            localStorage.setItem('user', JSON.stringify({username : username}));
            return true;
          }
          else
          {
            return false;
          }
      }else{
        return false;
      }
    }

    refresh(){

    }

    logout() {
       /* let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if(currentUser){
            let headers = new Headers({ 'X-Auth-Token': currentUser.token,'Access-Control-Allow-Origin': '*' });
            let options = new RequestOptions({ headers: headers });
            let id = currentUser.id;
            this.token = null;
            console.log(localStorage.length);
            localStorage.clear();
            console.log(localStorage.length);
            this.http.delete(adressBackEnd+"/auth-tokens/"+currentUser.id, options).subscribe(
                complete => {
                    console.log(id);
                },
                err => console.log(err),
            );
        }*/
       localStorage.clear();
       this.router.navigate(['/login']);
    }
}
