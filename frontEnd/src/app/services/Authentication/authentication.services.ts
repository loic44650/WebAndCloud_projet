import {Injectable} from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';
import { UserService } from '../User/user.services'
import { HeaderComponent } from '../../components/header/header.component';
import 'rxjs/add/operator/map';
import {adressBackEnd} from "../../app.component";
import {Router} from "@angular/router";
import {GoogleAuthService} from "ng-gapi";


@Injectable()
export class AuthenticationService {
    public token : string;
    public model :any;
    constructor(
        private router :Router,
        private http : Http,
        private userServ:UserService,
        private googleAuth: GoogleAuthService
    ){
      this.model = {email : 'admin@tinytwitt.fr', pass : 'toto'};

    }


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


    loginWithGoogle(){
        this.googleAuth.getAuth().subscribe(
          auth => {
            auth.signIn().then(
              complete =>{
                console.log(complete.json())
              },
              err =>console.log(err)
            ),
              err => console.log(err)
          }
        )

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
