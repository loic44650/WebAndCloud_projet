import {Component, OnInit} from "@angular/core";
import {User} from "../../models/User/user.model";
import {UserService} from "../../services/User/user.services";


@Component({
  moduleId : module.id,
  templateUrl : "userstofollow.html"
})


export class usersToFollowComponent implements OnInit{
  title = "Les Personnes que vous pouvez connaitre";
  id = 4843829756690432;
  lesUsers : User[] = [];
  idFollow :any;
  min = 0;
  max = 15;
  temps = null;
  constructor(
    private userS : UserService,
  ){

  }

  ngOnInit(){
    this.temps = null
    this.min = 0;
    this.max = 15;
    this.userS.getSuggestions(this.id,this.min,this.max).subscribe(
      complete => {
        this.lesUsers = complete.json().items;
      },
      err => console.log(err)
    );
  }

  addfollow(idFol:any){
    let dateDeb = new Date().getTime();
    console.log(idFol);
    this.userS.addFollower(this.id,idFol).subscribe(
      complete=>{
        let dateFin = new Date().getTime();
        this.temps = dateFin-dateDeb;
        console.log(complete.json());
      }
    )
  }

  getMorePeople()
  {
    this.min = this.max +1;
    this.max = this.max +(this.min-1);
    this.userS.getSuggestions(this.id,this.min,this.max).subscribe(
      complete =>{
        let users = complete.json().items;
        for (let i = 0; i < users.length;i= i+1){
          this.lesUsers.push(users[i]);
        }
      }
    )
  }
}
