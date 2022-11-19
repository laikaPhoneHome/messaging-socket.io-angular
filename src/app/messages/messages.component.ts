import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  @Input() messageList:any; scrollHeight:any;

  constructor() { }

  ngOnInit(): void {
    console.log(document.getElementsByClassName('.message-box'))
  }

}
