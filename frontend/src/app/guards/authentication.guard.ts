/**
 * Created by danielahmed on 16/04/2017.
 */
import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';

@Injectable()
export class AuthenticationGuard implements CanActivate{

    constructor(private router : Router){}

    canActivate(){
        if(localStorage.getItem('currentUser')){
            return true;
        }

        // not logged in so redirect to login page
        this.router.navigate(['/login']);
        return false;
    }
}
