import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {NgSpinningPreloader} from 'ng2-spinning-preloader';

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
      private ngSpinningPreloader: NgSpinningPreloader
  ){
      this.router.events.subscribe(
          vat => {
              this.loading = localStorage.getItem('user');
          },
          err => console.log(err)
      );

  }

  ngOnInit(){
      this.ngSpinningPreloader.stop();
  }


}
