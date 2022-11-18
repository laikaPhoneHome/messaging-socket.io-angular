import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  @Input() messageList:any; scrollHeight:any;



  // this.socket.on('message-broadcast', (data: {message: {message: string, username: string}}) => {
  //   if(data){
  //     this.messageList.push({message: data.message.message, username: data.message.username, my: false})
  //   }
  // })

  constructor() { }

  ngOnInit(): void {
    console.log(this.scrollHeight)
  }

}
