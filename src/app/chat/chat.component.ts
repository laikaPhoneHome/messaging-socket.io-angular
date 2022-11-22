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
  displayMessages: {
    message: string, 
    username?: string, 
    my?: boolean, 
    liked?: boolean, 
    bot: boolean
    time?: any
  }[]=[];
  localMessages:any;

  usersView:boolean=false;
  smokeScreen:boolean=false;
  


  username:string='';
  roomName:string='';
  eventDate: any;

  message: string='';
  room: {
    roomName: string;
    endDate: any;
  }={
    roomName:'', 
    endDate:''
  }

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
        : key === 'room'
        ? this.roomName = params[key]
        : this.eventDate = params[key]
      }
    })
    this.room = {
      roomName: this.roomName,
      endDate: this.eventDate
    }

    this.localMessages = localStorage.getItem(`messages.${this.roomName}`)
    this.messageList = JSON.parse(this.localMessages)

    this.socket = io.io(`localhost:3000?username=${this.username}&room=${this.room.roomName}`)

    this.socket.emit('connection')

    this.socket.emit('join-room', {username:this.username, room:this.room})

    this.socket.on('message-update',(currentMessages: any) => {
      this.recieveMessages(currentMessages)
    })

    this.socket.on('user-list', (userlist: string[]) => {
      this.userList = userlist;
    })
    
  }


  recieveMessages(messages:any){
    if(!messages.length){
      localStorage.setItem(`messages.${this.roomName}`, '')
    }
    this.displayMessages = messages.map((message:any) => {
        
      if(message.username === this.username){
        message.my = true;
      }
        return message;
    })
    this.messageList = this.displayMessages.filter((msg:any) => {
      if(!this.messageList.includes(msg)){
        return msg;
      }
    })

    localStorage.setItem(`messages.${this.roomName}`, JSON.stringify(this.displayMessages))
  }

    
    
    // this.displayMessages.forEach((message:any) => {
    //   if(this.messageList.includes(message)){
    //   } else {
    //     this.messageList.push(message)
    //   }
    // })
  

  view(){
    this.usersView = !this.usersView;
    this.smokeScreen = !this.smokeScreen;
  }

  sendMessage():void{
    if(this.message !== '')
    this.socket.emit('user-message', {message: this.message, username: this.username})
    this.message = '';
  }

}
