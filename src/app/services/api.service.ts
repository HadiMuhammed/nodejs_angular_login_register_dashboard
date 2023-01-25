import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegUser } from '../components/models/regUserModel';
import { Observable } from 'rxjs';
import { UserList } from '../components/models/UserList';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { 
    
  }
  public reguser = {} as RegUser
  register_user(data:RegUser){
    console.log(data)
   return this.http.post<RegUser>("http://localhost:3000/users/",data);
  }
  get_user():Observable<UserList[]>{
    return this.http.get<UserList[]>("http://localhost:3000/users/")
  }
}
