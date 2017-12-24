import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';

@Injectable()
export class AuthenticationGuard implements CanActivate{

    constructor(private router : Router){}

    canActivate(){
        if(localStorage.getItem('user')){
            return true;
        }

        // not logged in so redirect to login page
        this.router.navigate(['/login']);
        return false;
    }
}
