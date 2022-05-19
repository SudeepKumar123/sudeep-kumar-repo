import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { RouterModule, Router } from '@angular/router';
import { UserService } from '../user.service'
declare var alertify: any
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    name: new FormControl(''),
    password: new FormControl('')
  })

  constructor(private user: UserService, private router: Router) { }
  login() {
    this.user.loginUser(this.loginForm.value).subscribe((result) => {
      if (result) {
        localStorage.setItem("token", JSON.stringify(result))
        // localStorage.setItem("token1", JSON.stringify(result))
        let getUser = JSON.parse(localStorage.getItem("token")!)
        alertify.success("Login Successfully..!!" + getUser.name, 3)
        this.router.navigate(['/list'])
      }
      else {
        alertify.error("Login Failed..!!", 3)
      }
    })
  }

  ngOnInit(): void {
    
    
  }

}
