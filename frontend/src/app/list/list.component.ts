import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  collection: any = [];
  constructor(private user: UserService) { }

  
  ngOnInit(): void {
    this.user.getList().subscribe((result) => {
      // console.warn(result);
      this.collection = result;
    })
  }

}
