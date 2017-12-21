import {Component, OnInit} from "@angular/core";
import {TwittsService} from "../../services/Twitts/twitts.service";
import {UserService} from "../../services/User/user.services";
import {Message} from "../../models/Message/message.model";
import {Mesure} from "../CalculFollowers/calculFollowers.compotent";

@Component({
  moduleId : module.id,
  templateUrl : "testMessage.html"
})


export class testComponent implements OnInit{
  user100 = 5325894738509824;
  user1000 = 4688427370938368;
  user2500 = 5236715648188416;

  tabMesure100 : Mesure[] =[];
  tabMesure1000: Mesure[] =[];
  tabMesure2500 : Mesure[] =[];

  title = "Test de recupere les tweets";

  constructor(
    private msgService : TwittsService,
    private userS : UserService,
  ){

  }

  ngOnInit(){

  }

  ecrireDesTweets(){
    this.userS.getListUsers().subscribe(
      complete =>{
        let users = complete.json().items;
        for( let i = 0; i < users.length;i=i+1){
          let id = users[i].id;
          let message = "tweet pour recup dernieres message "+i.toString()
          this.msgService.addTwitts(new Message(message,id)).subscribe(
            complete =>{
              console.log(complete.json())
            },
            err => console.log(err)
          );
        }
      }
    )
  }

  getTimelineUser100(val:any, nbMesure:any){
    this.tabMesure100 = [];
    for (let i = 0; i < nbMesure; i = i+1) {
      let dateDeb = new Date().getTime();
      this.msgService.getTwittsForMe(this.user100, val).subscribe(
        complete => {
          let dateFin = new Date().getTime();
          console.log(complete.json())
          this.tabMesure100.push(new Mesure(i+1,(dateFin-dateDeb)));
        },
        err => console.log(err)
      )
    }
  }

  getTimelineUser1000(val:any,nbMesure : any){
    this.tabMesure1000 = [];
    for (let i = 0; i < nbMesure; i = i+1) {
      let dateDeb = new Date().getTime();
      this.msgService.getTwittsForMe(this.user1000, val).subscribe(
        complete => {
          let dateFin = new Date().getTime();
          console.log(complete.json())
          this.tabMesure1000.push(new Mesure(i + 1, (dateFin - dateDeb)));
        },
        err => console.log(err)
      )
    }
  }

  getTimelineUser2500(val:any,nbMesure:any) {
    this.tabMesure2500 =[];
    for (let i = 0; i < nbMesure; i = i+1) {
      let dateDeb = new Date().getTime();
      this.msgService.getTwittsForMe(this.user2500, val).subscribe(
        complete => {
          let dateFin = new Date().getTime();
          console.log(complete.json())
          this.tabMesure2500.push(new Mesure(i + 1, (dateFin - dateDeb)));
        },
        err => console.log(err)
      )
    }
  }
}
