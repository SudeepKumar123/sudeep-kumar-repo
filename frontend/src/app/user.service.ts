import { Injectable } from '@angular/core';
import{HttpClient,HttpErrorResponse} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  rootUrl='http://localhost:5000/'
  url='http://localhost:5000/lists/'
  constructor(private http:HttpClient) { }
  registerUser(data:any){
    return this.http.post(this.rootUrl + "register",data)
  }
  
  loginUser(data:any){
    return this.http.post(this.rootUrl + "login",data)
  }

  getList(){
    return this.http.get(this.rootUrl + "list")
  }

  getCurrentUser(id:any){
    return this.http.get(this.url + id)
  }

  // getCurrentUser1(id:any){
  //   return this.http.get(this.url + id)
  // }

  updateUser(id:any,data:any){
    return this.http.put(this.rootUrl + "update/" + id,data)
  }

  userProfile(id:any,data:any){
    return this.http.put(this.rootUrl + "profile/" + id,data)
  }
}
