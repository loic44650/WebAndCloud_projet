
import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/User/user.services";
import {User} from "../../models/User/user.model";
import { Router } from '@angular/router';



@Component({
    moduleId : module.id,
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit{

    user : any;
    constructor(
        private router:Router,
    ){
        this.user = {};
        if (localStorage.getItem('user'))
        {
          this.user = JSON.parse(localStorage.getItem('user'));
        }
    }




    ngOnInit(): void {
    }
}
