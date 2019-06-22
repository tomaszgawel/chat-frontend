import {Component, OnInit} from '@angular/core';
import {StoreService} from '../store.service';
import {MessageModel} from './message.model';
import {ChatService} from '../chat.service';
import {interval} from 'rxjs';
import {Router} from '@angular/router';
import {LogoutModel} from './logout.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  users: string[] = [];
  messages: MessageModel[] = [];
  newMessage: string;

  constructor(private chatservice: ChatService, private router: Router) {
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
      console.log(data);
    });
    this.newMessage = '';
  }
  logout() {
    const model = new LogoutModel();
    model.username = StoreService.getInstance().username;
    model.logout = true;
    this.chatservice.logout(model).subscribe(data => {
      console.log(data);
    })
    this.router.navigate(['/']);
  }


  checkWhoIsOnline() {
    this.chatservice.checkWhoIsOnline().subscribe(data => {
      this.users = data.body.online;
    });
  }

  getNewMassages() {
    this.chatservice.getNewMassages().subscribe(data => {
      if (data.body !== null) {
        console.log(data.body);
        for (const msg of data.body) {
          this.messages.push(msg);
        }
      }
    });
  }

}
