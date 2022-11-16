import { Component, OnInit } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { ChatUser } from 'src/ChatUser';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    private _router: Router
    ) { }

  rooms: string[] = [
    'Room-1',
    'Room-2',
    'Room-3'
  ]

  model = new ChatUser(1,'', this.rooms[0])

  joined = false;

  onJoin(){
    if(this.model.username !== '')
    this._router.navigate(['/chat'], {
      relativeTo: this._route,
      queryParams: {
        user: `${this.model.username}`,
        room: `${this.model.room}`
      },
  })
  }

  ngOnInit(): void {
  }

}
