import { Component,Output,EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Md5 } from 'ts-md5';
import { RegUser } from '../models/regUserModel';
import { UserList } from '../models/UserList';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
 
  @Output() clicker = new EventEmitter()
  
  constructor(private api:ApiService){}
  
  public reguser = {} as RegUser 
  toast = "None"
  message = ""
  public users = [] as UserList[]
  got_user(data:UserList[]){
    this.users = data
    console.log("user list")
    var flag = false
    for(const user of this.users){
      if(user.username == this.reguser.username){
        this.toast = "userlen"
        this.message = "username already exist"
        flag = true
        break
      }
    }
    if(!flag)
    this.api.register_user(this.reguser).subscribe(Response=>{
      this.toast = "success"
    })
  }

  Register(username:string,pass1:string,pass2:string){
    if(pass1 == pass2){
      
      if(pass1.length < 8){
        this.toast = "passlen"
      }
      else if(username.length < 5){
        this.toast = "userlen"
        this.message = "username length must be greater than 5"
      }
      else if(username.includes(" ")){
        this.toast = "userlen"
        this.message = "username must not contain space character"
      }
      else{

        this.api.get_user().subscribe(res=>{
          this.got_user(res)
        })
        var hash = Md5.hashStr(username+":"+pass1)
        this.reguser.md5 = hash
        this.reguser.username = username

      }

    }
    else{
        this.toast = "passmiss"
    }
  }
  change_mode_value(){
    this.clicker.emit("login")
  }
}
