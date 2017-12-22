import {Component, OnInit} from "@angular/core";
import {TwittsService} from "../../services/Twitts/twitts.service";
import {Message} from "../../models/Message/message.model";
import {calculMath} from "../../interfaces/calculMath/calculMath";



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
  calc1 : calculMath;
  calc2 : calculMath;
  calc3 : calculMath;
  bool1 = false;
  bool2 = false;
  bool3 = false;
  constructor(
    private messageS : TwittsService,
  ){

  }

  ngOnInit(){
    this.bool1 = this.bool2 = this.bool3 = false;
    this.calc1 = this.calc2 = this.calc3 = null;

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
    this.bool1 = true;
    setTimeout(()=> {
      this.calc1 = new calculMath();
      this.calc1.moyenne = this.calc1.calculAvg(this.tabMesure100);
      this.calc1.variance = this.calc1.calculVar(this.tabMesure100);
    },30000);

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
    this.bool2 = true;
    setTimeout(()=> {
      this.calc2 = new calculMath();
      this.calc2.moyenne = this.calc2.calculAvg(this.tabMesure1000);
      this.calc2.variance = this.calc2.calculVar(this.tabMesure1000);
    },30000);
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
    this.bool3 =true;
    setTimeout(()=> {
      this.calc3 = new calculMath();
      this.calc3.moyenne = this.calc3.calculAvg(this.tabMesure2500);
      this.calc3.variance = this.calc3.calculVar(this.tabMesure2500);
    },30000);
  }


}
