import { Component,OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(private api:ApiService){}
  mode = "login"
  change_mode(value:string){
    this.mode = value
  }
  is_auth(value:string){
    if(value == "passwordfail"){
      this.mode = "login"
    }else if(value == "success"){
      this.mode = "dashboard"
      sessionStorage.setItem("auth","true")
    }

  }
  ngOnInit() {
   if(sessionStorage.getItem("auth") == "true"){
    this.mode = "dashboard"
   }
   else if(sessionStorage.getItem("auth")== "false"){
    this.mode = "login"
   }
 }
}
