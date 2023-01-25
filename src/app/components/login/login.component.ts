import { Component,Output,EventEmitter } from '@angular/core';
import {Md5} from 'ts-md5';
import { ApiService } from 'src/app/services/api.service';
import { UserList } from '../models/UserList';
import { userObject } from '../models/userObject';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  @Output() clicker = new EventEmitter()
  @Output() auth = new EventEmitter()
  constructor(private api: ApiService){
    
  }
  is_authenticated = false
  user_auth = {} as userObject
  passfail = "none"
  got_users(users:UserList[],hash:string,username:string){
    for(const user of users){
      if(user.md5 == hash){
        this.is_authenticated = true
        this.user_auth.md5 = hash
        this.user_auth.username = username
        break
      }
    }
    if(this.is_authenticated){
      this.clicker.emit('dashbord') 
      this.auth.emit("success")
      this.passfail = "none"
    }
    else{
      this.auth.emit("passwordfail")
      this.passfail = "failed"
    }
  }
  
  Login(username:string,password:string){
    var hash = Md5.hashStr(username+":"+password)
    this.api.get_user().subscribe(users=>this.got_users(users,hash,username))
  }

  change_mode_value(){
    this.clicker.emit('register') 

  }
}
