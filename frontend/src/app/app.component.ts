import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
declare var alertify:any
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    myimage1: string = 'assets/img/icon-3.png'
  constructor(private router:Router){
  }

  loggedIn(){
    return localStorage.getItem('token')
  }
  
  userId(){
    let getUser = JSON.parse(localStorage.getItem("token")!)
    return getUser._id
  }
  userId1(){
    let getUser = JSON.parse(localStorage.getItem("token")!)
    return getUser._id
  }

  profile(){
    let getUser = JSON.parse(localStorage.getItem("token")!)
    // console.log(getUser+'rrrrrrrrrrrrrrrrrrr')
    return this.myimage1=getUser.image
  }

  onLogout(){
    localStorage.removeItem('token')
    // alert('Logout successfully..!!')
    alertify.set('notifier','position', 'bottom-right');
    // alertify.success('Current position : ' + alertify.get('notifier','position'));
    alertify.error('Logout successfully',1.50)
    this.router.navigate(['login']) 
  }

  ngOnInit(): void {
    let getUser = JSON.parse(localStorage.getItem("token")!)
    this.myimage1=getUser.image
}
}
