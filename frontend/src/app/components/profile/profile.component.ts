/**
 * Created by demeph on 17/04/2017.
 */

import {Component,OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService } from '../../services/User/user.services';
import {Http,Headers,RequestOptions} from '@angular/http';
@Component({
    moduleId: module.id,
    templateUrl: 'profile.component.html',
    styleUrls: ['profile.component.css']
})

export class ProfileComponent implements OnInit{
    user :any;

    constructor(
        private router:Router,
        private http:Http,
    ){

    }

    ngOnInit()
    {

    }


}
