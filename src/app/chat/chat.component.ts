import {Component, OnInit} from '@angular/core';
import {StoreService} from '../store.service';
import {MessageModel} from './message.model';
import {ChatService} from '../chat.service';
import {interval} from 'rxjs';

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
    interval(1000).subscribe(() => this.checkWhoIsOnline());
    interval(1000).subscribe(() => this.getNewMassages());
  }

  sendMessage() {
    const {newMessage} = this;

    if (newMessage.trim() === '') {
      return;
    }
    const model = new MessageModel();
    model.messageText = newMessage;
    model.user = StoreService.getInstance().username;
    this.chatservice.sendMessage(model).subscribe(data => {
      if (data.body.code === 'ok') {
        this.messages.push(model);
      }
    });
    this.newMessage = '';
  }


  checkWhoIsOnline() {
    this.chatservice.checkWhoIsOnline().subscribe(data => {
      console.log(data.body.online);
      console.log(data);
      this.users = data.body.online;
      console.log(this.users);
    });
  }

  getNewMassages() {
    this.chatservice.getNewMassages().subscribe(data => {
      console.log(data);
      this.messages.concat(data.body);
    });
  }

}
