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

  rooms: {
    roomName: string;
    endDate: any;
  }[] = [
    {roomName: 'test', endDate: Date.now()},
    {roomName: 'Room-1', endDate: Date.now()},
    {roomName: 'Room-2', endDate: Date.now()},
    {roomName: 'Room-3', endDate: Date.now()}
  ]

  model = new ChatUser('', this.rooms[0])

  onJoin(){
    if(this.model.username !== '')
    this._router.navigate(['/chat'], {
      relativeTo: this._route,
      queryParams: {
        user: `${this.model.username}`,
        room: `${this.model.room.roomName}`,
        date: `${this.model.room.endDate}`
      },
  })
  }

  ngOnInit(): void {
  }

}
