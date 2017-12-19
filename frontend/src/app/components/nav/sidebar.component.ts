import { Component,OnInit} from '@angular/core';

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    user : any;

    constructor(
    ){
        this.user = {};
    }

    ngOnInit(){
      if (localStorage.getItem('user'))
      {
        this.user = JSON.parse(localStorage.getItem('user'));
      }
    }

}
