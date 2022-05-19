import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { UserService } from '../user.service'
import { ActivatedRoute, Router } from '@angular/router';
declare var alertify: any

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})

export class UpdateComponent implements OnInit {
  myimage: string = 'assets/img/icon-3.png'
  selectedFile: any = null
  onFileSelected(event: any) {
    console.log(event)
    this.selectedFile = event.target.files[0]
  }

  onUpload() {
    const fd = new FormData()
    fd.append('image', this.selectedFile, this.selectedFile.name)
    this.user.userProfile(this.route.snapshot.params.id, fd).subscribe((result: any) => {
      if(result){
        localStorage.setItem("token", JSON.stringify(result))
      } 
      // console.log(result + 'bbbbbbbbbbbb')
      this.myimage = result.image


      // this.router.navigate(['/profile/'+this.route.snapshot.params.id])
      alertify.success('Profile updated successfully..!!')
    })
  }


  constructor(private user: UserService, private router: Router, private route: ActivatedRoute) { }
  submitted: boolean = false

  updateForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl('')
  })

  update() {
    this.submitted = true
    if (this.updateForm.invalid) {
      return
    }

    // let getUser = JSON.parse(localStorage.getItem("token")!)
    this.user.updateUser(this.route.snapshot.params.id, this.updateForm.value).subscribe((result) => {
      // console.log(result)
      if (result) {
        alertify.success(result)
        this.router.navigate(['/list'])
      }

      // else{
      //   alertify.success(result + this.updateForm.value.name, 3)
      //   this.router.navigate(['/list'])
      // }
    })
  }

  get name() {
    return this.updateForm.get('name')
  }
  get email() {
    return this.updateForm.get('email')
  }


  // let getUser = JSON.parse(localStorage.getItem("token")!)
  ngOnInit(): void {
    
    // console.warn(this.route.snapshot.params.id)
    this.user.getCurrentUser(this.route.snapshot.params.id).subscribe((result: any) => {
      // console.log(result.image + 'ffffffffffff')
      this.myimage = result.image
      
      // console.log(result.image)
      this.updateForm = new FormGroup({
        name: new FormControl(result['name'], [Validators.required, Validators.pattern('[a-zA-Z0-9_]+$')]),
        email: new FormControl(result['email'], [Validators.required, Validators.email])
      })
    })
  }
}
