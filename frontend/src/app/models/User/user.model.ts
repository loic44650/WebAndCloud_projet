
export class User{
     username : string;
     email : string;
     lastLogin : string;
     phoneNumber : number;
     img : any;

     constructor(){
          // this.adress = new Adress();
     }

     copier(user:any){
          this.username = user.username;
          this.email = user.email;
          this.lastLogin = user.lastlogin;
          this.phoneNumber =user.phoneNumber;
     }



}
