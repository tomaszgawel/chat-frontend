import {Component, OnInit} from '@angular/core';
import {LoginService} from '../login.service';
import {LoginModel} from './login.model';
import {Router} from '@angular/router';
import {StoreService} from '../store.service';
import {MatSnackBar} from '@angular/material';
import {ChatService} from '../chat.service';
import {LogoutModel} from '../chat/logout.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public username: string;

  // tslint:disable-next-line:variable-name max-line-length
  constructor(public service: LoginService, private router: Router, private _snackBar: MatSnackBar, private _storeService: StoreService, private _chatServce: ChatService) {

    if (!(this._storeService.username === '')) {
      console.log('Definitywnie mnie popierodlilo');
      const model = new LogoutModel();
      model.username = this._storeService.username;
      model.logout = true;
      this._chatServce.logout(model);
      this._storeService.username = '';
      this._storeService.access = '';
    }
  }


  login() {
    if (this.username === null) {
      const snackBarRef = this._snackBar.open('Login cannot be empty');
      snackBarRef._dismissAfter(3000);
      return;
    }

    if (!this.username.match(/[|\\/~^:,;?!&%$@*+\s]/)) {
      const model = new LoginModel();
      model.username = this.username;
      this.service.login(model).subscribe(data => {
        if (data.body.access.trim() === 'granted'.trim()) {
          console.log('Jak to jest puste to sie wkurwie', model.username);
          StoreService.getInstance().username = model.username;
          StoreService.getInstance().access = model.access;
          this.router.navigate(['/chat']);
        }
      });
    } else {
      console.log('Error with login');
      this.username = '';
      const snackBarRef = this._snackBar.open('Login cannot contain special characters');
      snackBarRef._dismissAfter(3000);
    }

  }

  ngOnInit(): void {
  }

}
