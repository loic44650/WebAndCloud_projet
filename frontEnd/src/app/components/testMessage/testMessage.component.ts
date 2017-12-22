import {Component, OnInit} from "@angular/core";
import {TwittsService} from "../../services/Twitts/twitts.service";
import {UserService} from "../../services/User/user.services";
import {Message} from "../../models/Message/message.model";
import {Mesure} from "../CalculFollowers/calculFollowers.compotent";
import {calculMath} from "../../interfaces/calculMath/calculMath";

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
  calc1 : calculMath;
  calc2 : calculMath;
  calc3 : calculMath;
  bool3 = false;
  bool2 = false;
  bool1 = false;
  constructor(
    private msgService : TwittsService,
    private userS : UserService,
  ){
  }

  ngOnInit(){
      this.bool1 = this.bool2 = this.bool3 = false;
      this.calc1 = this.calc2 = this.calc3 = null;
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
          this.tabMesure100.push(new Mesure(i+1,(dateFin-dateDeb)));
        },
        err => console.log(err)
      )
    }
    this.bool1 = true;
    setTimeout(()=> {
      this.calc1 = new calculMath();
      this.calc1.moyenne = this.calc1.calculAvg(this.tabMesure100);
      this.calc1.variance = this.calc1.calculVar(this.tabMesure100);
    },30000);
  }

  getTimelineUser1000(val:any,nbMesure : any){
    this.tabMesure1000 = [];
    for (let i = 0; i < nbMesure; i = i+1) {
      let dateDeb = new Date().getTime();
      this.msgService.getTwittsForMe(this.user1000, val).subscribe(
        complete => {
          let dateFin = new Date().getTime();
          this.tabMesure1000.push(new Mesure(i + 1, (dateFin - dateDeb)));
        },
        err => console.log(err)
      )
    }
    this.bool2 = true;
    setTimeout(()=> {
      this.calc2 = new calculMath();
      this.calc2.moyenne = this.calc2.calculAvg(this.tabMesure1000);
      this.calc2.variance = this.calc2.calculVar(this.tabMesure1000);
    },30000);
  }

  calculMoyenne(){

  }

  getTimelineUser2500(val:any,nbMesure:any) {
    this.tabMesure2500 =[];
    for (let i = 0; i < nbMesure; i = i+1) {
      let dateDeb = new Date().getTime();
      this.msgService.getTwittsForMe(this.user2500, val).subscribe(
        complete => {
          let dateFin = new Date().getTime();
          this.tabMesure2500.push(new Mesure(i + 1, (dateFin - dateDeb)));
        },
        err => console.log(err)
      )
    }
    this.bool3 = true;
    setTimeout(()=> {
      this.calc3 = new calculMath();
      this.calc3.moyenne = this.calc3.calculAvg(this.tabMesure2500);
      this.calc3.variance = this.calc3.calculVar(this.tabMesure2500);
    },30000);
  }
}
