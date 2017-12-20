import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

export const adressBackEnd = 'https://1-dot-webcloud-122127.appspot.com/_ah/api/';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit{
  user:any;
  loading : any;
  constructor(
      private router : Router,
  ){
      this.router.events.subscribe(
          vat => {
              this.loading = localStorage.getItem('user');
          },
          err => console.log(err)
      );

  }

  ngOnInit(){
  }


}
