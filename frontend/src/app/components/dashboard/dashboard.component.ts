/**
 * Created by demeph on 18/04/2017.
 */
import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {UserService} from "../../services/User/user.services";
import {getRandomString} from "selenium-webdriver/safari";
import {onerror} from "q";


@Component({
    moduleId:module.id,
    templateUrl: "dashboard.component.html",
    styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit{

    title = "Timeline";
    nb :any;


    constructor(
      private userS : UserService
    ){
      this.nb = 5;
    }

    ngOnInit(): void {
      //this.userS.getListUsers()

    }

    addFollow(){
        let users :any;
        this.userS.getListUsers().subscribe(
            complete => {
                for (let i = 0 ;i<complete.json().items.length;i=i+1) {
                  console.log(complete.json().items[i]);
                  if (6251926194749440 != complete.json().items[i].id) {
                    this.userS.addFollower(complete.json().items[i].id,6251926194749440).subscribe(
                      complete => {
                        console.log(complete.json());
                      },
                      err => console.log(err)
                    );
                  }
                }
            },
            err => console.log(err)
        )
    }



    createUser(){
      for (let i = 1;i<=this.nb;i=i+1) {
        let user = 'user'+i.toString();
        console.log(user);
        this.userS.createUser(user).subscribe(
          complete => {
             console.log(complete.json());
             let id = complete.json().id;
            this.userS.addFollower(id,6251926194749440).subscribe(
              complete => {
                console.log(complete.json());
              },
              err => console.log(err)
            );
             console.log(id);
          },
          err => console.log(err)
        );
      }
    }
    // events
    public chartClicked(e:any) :void {
        console.log(e);
    }

    public chartHovered(e:any) :void {
        console.log(e);
    }
}
