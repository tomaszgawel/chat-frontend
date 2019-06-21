import {Component, OnInit} from '@angular/core';
import {LoginService} from '../login.service';
import {LoginModel} from './login.model';
import {Router} from '@angular/router';
import {StoreService} from '../store.service';
import {stringify} from "querystring";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public username: string;

  constructor(public service: LoginService, private router: Router) {
  }

  ngOnInit() {
  }


  login() {
    const model = new LoginModel();
    model.username = this.username;

    this.service.login(model).subscribe(data => {
      if (data.body.access.trim() === 'granted'.trim()) {
        StoreService.getInstance().username = this.username;
        StoreService.getInstance().access = data.body.access;
        this.router.navigate(['/chat']);
      }
    });

  }

}
