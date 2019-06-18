import { Component, OnInit } from '@angular/core';
import {StoreService} from '../store.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log(StoreService.getInstance().access);
    console.log(StoreService.getInstance().username);
  }

}
