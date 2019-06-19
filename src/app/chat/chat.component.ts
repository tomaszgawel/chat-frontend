import {Component, OnInit} from '@angular/core';
import {StoreService} from '../store.service';
import {MessageModel} from './message.model';
import {ChatService} from "../chat.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  users: string[] = [];
  messages: MessageModel[] = [];
  newMessage: string;

  constructor(private chatservice: ChatService) {
  }

  ngOnInit() {
    console.log(StoreService.getInstance().access);
    console.log(StoreService.getInstance().username);
  }

  sendMessage() {
    const {newMessage} = this;

    if (newMessage.trim() === '') {
      return;
    }
    const model = new MessageModel();
    model.messageText = newMessage;
    model.user = StoreService.getInstance().username;
    this.messages.push(model);
    this.chatservice.sendMessage(model);
    this.newMessage = '';
  }
}
