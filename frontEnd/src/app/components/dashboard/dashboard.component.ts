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
import {Router} from "@angular/router";
import {DatePipe} from "@angular/common";

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
    getTimeline = null;
    nbMessage = 15;
    min = 0;
    constructor(
      private userS : UserService,
      private twitS : TwittsService,
      private route : Router,
      private dateP :DatePipe,
    ){
      this.nb = 5;
      this.model = {};
      this.message = {};
      this.tweet = null;
      //this.lesMessages = Message[]
    }

    ngOnInit(): void {
        this.nbMessage = 15;
        this.min = 0;
        this.getTweets();
        let datefin = new Date();
    }

    writeTwett(){
        this.desactiver = false;
        if (this.message.msg) {
          this.tweet = new Message(this.message.msg,4843829756690432);
          this.message.msg = null;
          console.log(this.tweet);
          let dateDeb = new Date().getTime();
          this.twitS.addTwitts(this.tweet).subscribe(
            complete => {
              let datefin = new Date().getTime();
              console.log(complete.json());
              let message = new Message(complete.json().message,complete.json().userId);
              message.time = (datefin-dateDeb);
              this.lesMessages.unshift(message);
            },
            err => console.log(err)
          );
        }
        this.desactiver = true;

    }

  getTweets() {
    let datedeb = new Date().getTime();
    this.twitS.getTwittsForMe(this.id, this.nbMessage).subscribe(
      complete => {
        let datefin =new Date().getTime();
        this.getTimeline = datefin-datedeb;
        this.lesMessages = complete.json().items;
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

    loadMoreTwett(){
      this.min = this.nbMessage;
      this.nbMessage += 15;
      this.twitS.getMoreTweets(this.id,this.min,this.nbMessage).subscribe(
        complete => {
          for (let i = 0; i < complete.json().items.length; ++i) {
            this.lesMessages.push(complete.json().items[i]);
          }
        },
        err => console.log(err)

      )
    }
}
