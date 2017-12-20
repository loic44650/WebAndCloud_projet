/**
 * Created by danielahmed on 16/04/2017.
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/Authentication/authentication.services';
import {UserService} from '../../services/User/user.services';

@Component({
    moduleId : module.id,
    templateUrl: 'login.component.html'
})


export class LoginComponent implements OnInit{
    model : any;
    public loading : boolean;
    error : string;
    message :string;

    constructor(
        private router : Router,
        private authService : AuthenticationService,

    ){
        this.model = {};
        this.loading = false;
        this.error = '';
    }

    ngOnInit(){
        this.authService.logout();
    }

    login(){
        this.loading = true;
        let expr = new RegExp("[A-Za-z0-9]*@[a-z]*.[a-z]");
        if (this.model.email) {
          if (expr.test(this.model.email))
          {
            if (this.model.pass){
                if (this.authService.loginLocal(this.model.email,this.model.pass))
                {
                  this.router.navigate(['/dashboard']);
                }
                else {
                  this.error = "*Username or password is incorrect";
                }

            }
            else{
              this.error = "Username or password is incorrect";
            }

          }else
          {
            this.error = "Email ne respect pas le format";
          }

        }else{
          this.error = "Username or password is incorrect";
        }
        /*this.authService.login(this.model.username ,this.model.password).subscribe(
            result => {
                //console.log(result);
                if (result === true) {

                }
            },
            error => {
                this.error = "Username or password is incorrect";
                this.loading = false;
            }
        );*/
    }
}
