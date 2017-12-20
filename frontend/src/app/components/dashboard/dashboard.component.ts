/**
 * Created by demeph on 18/04/2017.
 */
import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {UserService} from "../../services/User/user.services";
import {getRandomString} from "selenium-webdriver/safari";
import {onerror} from "q";
import {Message} from "../../models/Message/message.model";
import {TwittsService} from "../../services/Twitts/twitts.service";
import {jsonpFactory} from "@angular/http/src/http_module";


@Component({
    moduleId:module.id,
    templateUrl: "dashboard.component.html",
    styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit{

    title = "Timeline";
    nb :any;
    lesMessages :Message[] = [];
    model :any;
    message : any;
    tweet :Message;
    id = 4843829756690432;
    desactiver = true;
    constructor(
      private userS : UserService,
      private twitS : TwittsService
    ){
      this.nb = 5;
      this.model = {};
      this.message = {};
      this.tweet = new Message();
      //this.lesMessages = Message[]
    }

    ngOnInit(): void {
      //this.userS.getListUsers()
      this.getTweets();

    }

    writeTwett(){
        this.desactiver = false;
        if (this.message.msg) {
          this.tweet.userId = 4843829756690432;
          this.tweet.message = this.message.msg;
          this.message.msg = null;
          console.log(this.tweet);
          this.twitS.addTwitts(this.tweet).subscribe(
            complete => {
              console.log(complete.json());
              let message = new Message();
              message.userId = complete.json().userId;
              message.message = complete.json().message;
              this.lesMessages.unshift(message);
            },
            err => console.log(err)
          );
        }
        this.desactiver = true;

    }

  getTweets() {
    this.twitS.getTwittsForMe(this.id, 15).subscribe(
      complete => {
        console.log(complete.json())
        let message = new Message();
        for (let i = 0; i < complete.json().items.length; i++) {
          message.userId = complete.json().items[i].userId;
          message.message = complete.json().items[i].message;
          this.lesMessages.push(message);
          message = new Message();
        }
      },
      err => console.log(err)
    )
  }

  addFollow(){
    let users :any;
    this.userS.getListUsers().subscribe(
      complete => {
        let id = 4858852746985472;
              for (let i = 0 ;i<complete.json().items.length;i=i+1) {
                  console.log(complete.json().items[i]);
                  if (id != complete.json().items[i].id) {
                    setTimeout(()=> {
                      this.userS.addFollower(complete.json().items[i].id, id).subscribe(
                        complete => {
                          console.log(complete.json());
                        },
                        err => console.log(err)
                      )
                    },10000);
                  }
                }
            },
            err => console.log(err)
        )
    }



    createUser(){
      console.log(this.model);
      let min = this.model.min;
      let max = this.model.max;
      for (let i = min; i<=max;i=i+1) {
        let user = 'user'+i.toString();
        console.log(user);
        this.userS.createUser(user).subscribe(
          complete => {
            console.log(complete.json());
            let id = complete.json().id;
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
