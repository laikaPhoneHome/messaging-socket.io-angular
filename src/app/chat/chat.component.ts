import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as io from 'socket.io-client';


//import socket on messages component and style on message

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  username:string='';
  room:string='';
  message: string='';
  messageList: {message: string, username: string, my: boolean}[]=[];
  userList: string[]=[];
  socket: any;
  scrollHeight:number=0;

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
    this.socket = io.io(`localhost:3000?username=${this.username}&room=${this.room}`)
    this.socket.emit('set-user-name', this.username)
    this.socket.on('user-list', (userlist: string[]) => {
      this.userList = userlist;
    })
    this.socket.on('disconnect', (userlist: string[]) => {
      this.userList = userlist;
    })

    this.socket.on('message-broadcast', (data: {message: {message: string, username: string}}) => {
      if(data){
        this.messageList.push({message: data.message.message, username: data.message.username, my: false})
      }
    })
    
  }

  sendMessage():void{
    this.socket.emit('message', {message: this.message, username: this.username})
    this.messageList.push({message: this.message, username: this.username, my: true})
    this.message = ''
  }

}
