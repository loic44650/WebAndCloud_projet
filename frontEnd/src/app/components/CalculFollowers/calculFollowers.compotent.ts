import {Component, OnInit} from "@angular/core";
import {TwittsService} from "../../services/Twitts/twitts.service";
import {Message} from "../../models/Message/message.model";



export class Mesure{
  index :any;
  tps :any;

  constructor(ind:any,tps:any){
    this.index = ind;
    this.tps = tps;
  }
}

@Component({
  moduleId : module.id,
  templateUrl:"calculfollowers.html"
})

export class CalculFollowersComponent implements OnInit{
  title = "Calcul en fonction des followers";
  tabMesure100 : Mesure[] =[];
  tabMesure1000: Mesure[] =[];
  tabMesure2500 : Mesure[] =[];
  constructor(
    private messageS : TwittsService,
  ){

  }

  ngOnInit(){

  }

  faitMoiDeMesure100(nbMesure:any){
    this.tabMesure100 = [];
    let user100 = 4649932115935232;
    console.log(nbMesure);
    let datedeb,datefin;
    for (let i = 1;i <= nbMesure; i=i+1){
      let text = "mesure pour user2500 message "+i.toString();
      let message = new Message(text,user100);
      console.log(message);
      datedeb = new Date().getTime();
      this.messageS.addTwitts(message).subscribe(
        complete => {
          datefin = new Date().getTime();
          this.tabMesure100.push(new Mesure(i, (datefin - datedeb)));

        },
        err =>console.log(err)
      )
    }

  }


  faitMoiDeMesure1000(nbMesure:any){
    this.tabMesure1000 = [];
    let user1000 = 4843829756690432;
    console.log(nbMesure);
    let datedeb,datefin;
    for (let i = 1;i <= nbMesure; i=i+1){
      let text = "mesure pour user2500 message "+i.toString();
      let message = new Message(text,user1000);
      console.log(message);
      datedeb = new Date().getTime();
      this.messageS.addTwitts(message).subscribe(
        complete => {
          datefin = new Date().getTime();
          this.tabMesure1000.push(new Mesure(i, (datefin - datedeb)));

        },
        err =>console.log(err)
      )
    }
  }


  faitMoiDeMesure2500(nbMesure:any){
    this.tabMesure2500 = [];
    let user2500 = 5580132374806528;
    console.log(nbMesure);
    let datedeb,datefin;
    for (let i = 1;i <= nbMesure; i=i+1){
      let text = "mesure pour user2500 message "+i.toString();
      let message = new Message(text,user2500);
      console.log(message);
      datedeb = new Date().getTime();
      this.messageS.addTwitts(message).subscribe(
        complete => {
          datefin = new Date().getTime();
          this.tabMesure2500.push(new Mesure(i, (datefin - datedeb)));

        },
        err =>console.log(err)
      )
    }
  }


}
