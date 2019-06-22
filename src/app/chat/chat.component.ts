import {AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {StoreService} from '../store.service';
import {MessageModel} from './message.model';
import {ChatService} from '../chat.service';
import {interval, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {LogoutModel} from './logout.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked, OnDestroy {
  @ViewChild('scroll', {static: false}) private myScrollContainer: ElementRef;
  users: string[] = [];
  messages: MessageModel[] = [];
  newMessage: string;
  subscriptionOnline: Subscription;
  subscriptionMess: Subscription;

  // tslint:disable-next-line:variable-name
  constructor(private chatservice: ChatService, private router: Router) {

  }

  ngOnInit() {
    if (StoreService.getInstance().username === '') {
      console.log('no chyba mnie popierdolilo');
      this.router.navigate(['/']);
    } else {
      console.log(StoreService.getInstance().access);
      console.log(StoreService.getInstance().username);
      this.subscriptionOnline = interval(100).subscribe(() => this.checkWhoIsOnline());
      this.subscriptionMess = interval(100).subscribe(() => this.getNewMassages());
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }


  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {
    }
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
    });
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
          this.scrollToBottom();

          // document.getElementById('chat-session').style.setProperty(' scroll-snap-align', 'end');
        }
      }
    });
  }

  isServer(message) {
    return message === 'SERVER';
  }

  isMe(message) {
    return message === StoreService.getInstance().username;
  }

  ngOnDestroy(): void {
    this.subscriptionMess.unsubscribe();
    this.subscriptionOnline.unsubscribe();
  }

}
