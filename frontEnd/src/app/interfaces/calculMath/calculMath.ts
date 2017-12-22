import {Mesure} from "../../components/CalculFollowers/calculFollowers.compotent";

export class calculMath{
  moyenne : any;
  variance:any;



   calculVar(tab:Mesure[]){
    let avg = 0;
    avg = this.calculAvg(tab);
    let temp = 0;
    for (let i = 0;i<tab.length;++i){
      let cal = (tab[i].tps-avg);
      temp += (Math.pow(cal,2))
    }
    return (temp/(tab.length-1));
  }

   calculAvg(tab : Mesure[]){
    let somme  = 0;
    for (let i = 0;i<tab.length;++i){
      somme += tab[i].tps;
    }
    return somme/tab.length;
  }
}
