import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  username:string='';
  room:string='';


  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      for(let key in params){
        key === 'user' 
        ? this.username = params[key] 
        : this.room = params[key];
      }
    })
  }

}
