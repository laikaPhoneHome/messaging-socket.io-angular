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

  date = new Date;
  timeStamp: any = [
    this.date.getHours(),
    ,':',
    this.date.getMinutes(),
    ,' ',
    this.date.getHours() > 12
    ? 'am'
    : 'pm'
  ].join('');

  messageList: {
    message: string, 
    username?: string, 
    my?: boolean, 
    liked?: boolean, 
    bot: boolean
    time?: any
  }[]=[];

  username:string='';
  room:string='';
  message: string='';

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

    this.socket.emit('connection', {username:this.username, room:this.room})

    this.socket.on('bot-message', (message: string) => {
      this.messageList.push({
        message: message,
        bot: true,
      })
    })
    this.socket.on('message-update',(currentMessages: any) => {
      this.messageList =  currentMessages.map((message:any) => {
        if(message.username === this.username)
        message.my = true;
      })
      this.messageList = currentMessages;
    })


    // this.socket.on('user-list', (userlist: string[]) => {
    //   this.userList = userlist;
    // })
    // this.socket.on('disconnect', (userlist: string[]) => {
    //   this.userList = userlist;
    // })

    // this.socket.on('message-broadcast', (data: {message: {message: string, username: string}}) => {
    //   if(data){
    //     this.messageList.push({message: data.message.message, username: data.message.username, my: false})
    //   }
    // })
    
  }

  sendMessage():void{
    if(this.message !== '')
    this.socket.emit('user-message', {message: this.message, username: this.username})
    this.message = ''
  }

}
